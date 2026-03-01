import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen'
import DoctorDetailScreen from '../screens/DoctorDetailScreen'
import DoctorsListScreen from '../screens/DoctorsListScreen'
import { HomeStackParamList } from '../types/Navigation'
import { Platform, Text, View } from 'react-native'
import { Theme } from '../theme/theme'

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
          headerTitle: ({}) => (
            <View
              style={{
                alignItems: Platform.select({
                  ios: 'center',
                  android: 'flex-start',
                }),
              }}
            >
              <Text style={Theme.typography.subheader}>
                {route.params.name}
              </Text>
              <Text style={Theme.typography.body}>{route.params.timezone}</Text>
            </View>
          ),
          headerTransparent: true,
          headerBackButtonDisplayMode: 'minimal',
        })}
      />
      <Stack.Screen
        name='Booking Confirmation'
        component={BookingConfirmationScreen}
        options={{
          presentation: 'modal',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}
