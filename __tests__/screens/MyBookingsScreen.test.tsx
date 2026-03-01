import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyBookingsScreen from '../../src/screens/MyBookingsScreen'
import { renderWithProviders } from '../../test/test-utils'
import { Booking } from '../../src/types/Booking'
import { BookingsStackParamList } from '../../src/types/Navigation'
import { PreloadedState } from '../../src/store/store'

const Stack = createNativeStackNavigator<BookingsStackParamList>()

const mockBookings: Booking[] = [
  {
    date: '2026-03-03',
    doctor: {
      id: 'christy-schumm',
      name: 'Christy Schumm',
      timezone: 'Australia/Sydney',
    },
    endTime: '11:30',
    id: 'christy-schumm-2026-03-03-11:00',
    startTime: '11:00',
  },
  {
    date: '2026-03-06',
    doctor: {
      id: 'christy-schumm',
      name: 'Christy Schumm',
      timezone: 'Australia/Sydney',
    },
    endTime: '07:30',
    id: 'christy-schumm-2026-03-06-07:00',
    startTime: '07:00',
  },
  {
    date: '2026-03-04',
    doctor: {
      id: "elyssa-o'kon",
      name: "Elyssa O'Kon",
      timezone: 'Australia/Perth',
    },
    endTime: '06:30',
    id: "elyssa-o'kon-2026-03-04-06:00",
    startTime: '06:00',
  },
  {
    date: '2026-03-04',
    doctor: {
      id: 'ramy-malik',
      name: 'Ramy Malik',
      timezone: 'Australia/Perth',
    },
    endTime: '11:00',
    id: 'ramy-malik-2026-03-04-10:30',
    startTime: '10:30',
  },
]

const renderScreen = (bookings: Booking[] = []) => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='My Bookings' component={MyBookingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>,
    {
      preloadedState: {
        booking: { bookings },
      } as PreloadedState,
    }
  )
}

describe('MyBookingsScreen', () => {
  it('renders empty list when there are no bookings', () => {
    const { queryByText } = renderScreen()

    expect(queryByText('Christy Schumm')).toBeNull()
  })

  it('displays bookings with doctor names', async () => {
    const { getAllByText, getByText } = renderScreen(mockBookings)

    expect(getAllByText('Christy Schumm').length).toBe(2)
    expect(getByText("Elyssa O'Kon")).toBeOnTheScreen()
    expect(getByText('Ramy Malik')).toBeTruthy()
  })

  it('groups bookings by date with section headers', async () => {
    const { getByText } = renderScreen(mockBookings)

    expect(getByText('Mar 3rd, 2026')).toBeTruthy()
    expect(getByText('Mar 4th, 2026')).toBeTruthy()
    expect(getByText('Mar 6th, 2026')).toBeTruthy()
  })

  it('displays a single booking correctly', async () => {
    const { getByText, queryByText } = renderScreen([mockBookings[0]])

    expect(getByText('Christy Schumm')).toBeTruthy()
    expect(queryByText('Natalia Stanton Jr.')).toBeNull()
  })
})
