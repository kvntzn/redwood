import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen'
import DoctorDetailScreen from '../screens/DoctorDetailScreen'
import DoctorsListScreen from '../screens/DoctorsListScreen'
import { HomeStackParamList } from '../types/Navigation'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Doctors List'
        component={DoctorsListScreen}
        options={{
          headerLargeTitleEnabled: true,
          headerTitle: 'Doctors',
          headerLargeTitleStyle: {
            color: '#000',
          },
          headerLargeStyle: {
            // backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name='Doctors Detail'
        component={DoctorDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name='Booking Confirmation'
        component={BookingConfirmationScreen}
      />
    </Stack.Navigator>
  )
}
