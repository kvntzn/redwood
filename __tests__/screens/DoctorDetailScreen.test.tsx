import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DoctorDetailScreen from '../../src/screens/DoctorDetailScreen'
import DoctorsListScreen from '../../src/screens/DoctorsListScreen'
import BookingConfirmationScreen from '../../src/screens/BookingConfirmationScreen'
import { renderWithProviders } from '../../test/test-utils'
import { server } from '../../__mocks__/server'
import { HomeStackParamList } from '../../src/types/Navigation'

const Stack = createNativeStackNavigator<HomeStackParamList>()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderFromList = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Doctors List' component={DoctorsListScreen} />
        <Stack.Screen name='Doctors Detail' component={DoctorDetailScreen} />
        <Stack.Screen
          name='Booking Confirmation'
          component={BookingConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

describe('DoctorDetailScreen', () => {
  it('should render the calendar upon navigating', async () => {
    const { getByText, getByTestId } = renderFromList()

    const doctor = await getByText('Christy Schumm')
    fireEvent.press(doctor)

    const todayStr = new Date().toISOString().split('T')[0]
    const month = todayStr.slice(0, 7)
    expect(
      await getByTestId(`undefined.calendarList.item_${month}.day_${todayStr}`)
    ).toBeTruthy()
  })
})
