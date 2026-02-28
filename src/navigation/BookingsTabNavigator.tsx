import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyBookingsScreen from '../screens/MyBookingsScreen'
import { BookingsStackParamList } from '../types/Navigation'

const Stack = createNativeStackNavigator<BookingsStackParamList>()

export const BookingsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='My Bookings'
        component={MyBookingsScreen}
        options={{ headerLargeTitleEnabled: true, headerTitle: 'My Bookings' }}
      />
    </Stack.Navigator>
  )
}
