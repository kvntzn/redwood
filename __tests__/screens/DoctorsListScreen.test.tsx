import React from 'react'
import { Text } from 'react-native'
import { fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DoctorsListScreen from '../../src/screens/DoctorsListScreen'
import { renderWithProviders } from '../../test/test-utils'
import { server } from '../../__mocks__/server'
import { setupDoctorsHandler } from '../../__mocks__/handlers/doctorsHandler'
import { HomeStackParamList } from '../../src/types/Navigation'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const MockDetailScreen = ({ route }: any) => (
  <Text>Detail: {route.params.name}</Text>
)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

const renderScreen = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Doctors List' component={DoctorsListScreen} />
        <Stack.Screen name='Doctors Detail' component={MockDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

describe('DoctorsListScreen', () => {
  it('fetches and displays doctors from the API', () => {
    const { getByText } = renderScreen()

    expect(getByText('Christy Schumm')).toBeTruthy()
    expect(getByText('Natalia Stanton Jr.')).toBeTruthy()
  })

  it('displays timezone for each doctor', async () => {
    const { getByText, findAllByText } = renderScreen()

    expect(getByText('Australia/Sydney')).toBeTruthy()
    expect(await findAllByText('Australia/Perth').length).toBeGreaterThan(0)
  })

  it('navigates to doctor detail when a doctor is pressed', () => {
    const { getByText } = renderScreen()

    const doctor = getByText('Christy Schumm')
    fireEvent.press(doctor)

    expect(getByText('Detail: Christy Schumm')).toBeTruthy()
  })

  it('renders empty list when API returns no doctors', () => {
    server.use(...setupDoctorsHandler([]))

    const { queryByText } = renderScreen()

    waitFor(() => {
      expect(queryByText('Christy Schumm')).toBeNull()
      expect(queryByText('Natalia Stanton Jr.')).toBeNull()
    })
  })

  it('renders a single doctor when API returns one', () => {
    server.use(
      ...setupDoctorsHandler([
        {
          name: 'Dr Wilson',
          timezone: 'Europe/London',
          day_of_week: 'Friday',
          available_at: '9:00AM',
          available_until: '5:00PM',
        },
      ])
    )

    const { getByText, queryByText } = renderScreen()

    expect(getByText('Dr Wilson')).toBeTruthy()
    expect(queryByText('Christy Schumm')).toBeNull()
  })
})
