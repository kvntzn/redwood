import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen'
import DoctorDetailScreen from '../screens/DoctorDetailScreen'
import DoctorsListScreen from '../screens/DoctorsListScreen'
import MyBookingsScreen from '../screens/MyBookingsScreen'

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

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}
