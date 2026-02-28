import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyBookingsScreen from './src/screens/MyBookingsScreen'
import DoctorsListScreen from './src/screens/DoctorsListScreen'
import DoctorDetailScreen from './src/screens/DoctorDetailScreen'
import BookingConfirmationScreen from './src/screens/BookingConfirmationScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'

const Tab = createNativeBottomTabNavigator()

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Doctors List'
        component={DoctorsListScreen}
        options={{ headerLargeTitleEnabled: true, headerTitle: 'Doctors' }}
      />
      <Stack.Screen name='Doctors Detail' component={DoctorDetailScreen} />
      <Stack.Screen
        name='Booking Confirmation'
        component={BookingConfirmationScreen}
      />
    </Stack.Navigator>
  )
}

const BookingsTab = () => {
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

const RootStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{ headerShown: false, tabBarSystemItem: 'search' }}
      />
      <Tab.Screen
        name='Bookings'
        component={BookingsTab}
        options={{
          headerShown: false,
          title: 'My Bookings',
          tabBarSystemItem: 'history',
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}
