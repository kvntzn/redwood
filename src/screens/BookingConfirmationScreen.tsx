import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { BookingConfirmationScreenProps } from '../types/Navigation'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Theme } from '../theme/theme'
// import { useAppDispatch } from '../store/hooks'
import { CommonActions } from '@react-navigation/native'

const BookingConfirmationScreen = ({
  route,
  navigation,
}: BookingConfirmationScreenProps) => {
  const { id, date, startTime, endTime } = route.params

  // const dispatch = useAppDispatch()
  const onConfirmPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Bookings' }],
      })
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name='close' size={24} color={Theme.colors.text} />
        </Pressable>
      ),

      headerRight: () => (
        <Pressable onPress={onConfirmPress}>
          <Ionicons name='checkmark' size={24} color={Theme.colors.text} />
        </Pressable>
      ),
    })
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Doctor: {id}</Text>
      <Text>
        Date: {date} {startTime}-{endTime}
      </Text>

      <Button title='Confirm Booking' onPress={onConfirmPress} />
    </View>
  )
}

export default BookingConfirmationScreen

const styles = StyleSheet.create({})
