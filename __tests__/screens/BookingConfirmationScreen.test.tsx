import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingConfirmationScreen from '../../src/screens/BookingConfirmationScreen'
import { renderWithProviders } from '../../test/test-utils'
import { HomeStackParamList } from '../../src/types/Navigation'
import { BOOKING_CONFIRM_ADD } from '../../src/constants/testID'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const mockDoctor = {
  id: 'christy-schumm',
  name: 'Christy Schumm',
  timezone: 'Australia/Sydney',
  schedule: [
    {
      dayOfWeek: 'Monday' as const,
      shifts: [{ availableAt: '09:00', availableUntil: '17:30' }],
    },
  ],
}

const today = new Date().toISOString().split('T')[0]

const bookingParams = {
  id: mockDoctor.id,
  date: today,
  startTime: '10:00',
  endTime: '10:30',
}

const renderScreen = (preloadedState = {}) => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Booking Confirmation'
          component={BookingConfirmationScreen}
          initialParams={bookingParams}
        />
      </Stack.Navigator>
    </NavigationContainer>,
    {
      preloadedState: {
        doctors: { doctors: [mockDoctor] },
        ...preloadedState,
      },
    }
  )
}

describe('BookingConfirmationScreen', () => {
  it('displays doctor name', () => {
    const { getByText } = renderScreen()

    expect(getByText('Doctor: Christy Schumm')).toBeTruthy()
  })

  it('displays booking date', () => {
    const { getByText } = renderScreen()

    expect(getByText(/Date:/)).toBeTruthy()
  })

  it('displays booking time', () => {
    const { getByText } = renderScreen()

    expect(getByText(/Time: 10:00 AM/)).toBeTruthy()
  })

  it('displays confirmation prompt', () => {
    const { getByText } = renderScreen()

    expect(getByText(/Would you like to proceed/)).toBeTruthy()
  })

  it('dispatches addBooking on confirm press', async () => {
    const { getByTestId, store } = renderScreen()

    expect(store.getState().booking.bookings).toHaveLength(0)

    const confirmButton = getByTestId(BOOKING_CONFIRM_ADD)
    fireEvent.press(confirmButton)

    await new Promise((r) => setTimeout(r, 100))

    expect(store.getState().booking.bookings).toHaveLength(1)
    expect(store.getState().booking.bookings[0]).toMatchObject({
      id: `${mockDoctor.id}-${today}-10:00`,
      date: today,
      startTime: '10:00',
      endTime: '10:30',
      doctor: {
        id: mockDoctor.id,
        name: mockDoctor.name,
        timezone: mockDoctor.timezone,
      },
    })
  })

  it('rejects duplicate booking on confirm press', async () => {
    const existingBooking = {
      id: `${mockDoctor.id}-${today}-10:00`,
      date: today,
      startTime: '10:00',
      endTime: '10:30',
      doctor: {
        id: mockDoctor.id,
        name: mockDoctor.name,
        timezone: mockDoctor.timezone,
      },
    }

    const { getByTestId, store } = renderScreen({
      booking: { bookings: [existingBooking] },
    })

    expect(store.getState().booking.bookings).toHaveLength(1)

    const confirmButton = await getByTestId(BOOKING_CONFIRM_ADD)
    fireEvent.press(confirmButton)

    await new Promise((r) => setTimeout(r, 100))

    expect(store.getState().booking.bookings).toHaveLength(1)
  })
})
