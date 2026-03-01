import { NavigationContainer } from '@react-navigation/native'
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationTheme } from '../theme/theme'
import { BookingsTab } from './BookingsTabNavigator'
import { HomeStack } from './HomeStackNavigator'
import { RootTabParamList } from '../types/Navigation'
import { StatusBar } from 'react-native'

const Tab = createNativeBottomTabNavigator<RootTabParamList>()

const RootTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          headerShown: false,
          title: 'Doctors',
          tabBarIcon: {
            type: 'image',
            source: require('../../assets/doctor.png'),
          },
        }}
      />
      <Tab.Screen
        name='Bookings'
        component={BookingsTab}
        options={{
          headerShown: false,
          title: 'My Bookings',
          tabBarIcon: {
            type: 'image',
            source: require('../../assets/booking.png'),
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <NavigationContainer theme={NavigationTheme}>
        <RootTab />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
