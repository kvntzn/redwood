import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect } from 'react'
import { BookingConfirmationScreenProps } from '../types/Navigation'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Theme } from '../theme/theme'
import { useAppDispatch } from '../store/hooks'
import { CommonActions } from '@react-navigation/native'
import { useAppSelector } from '../store/hooks'
import { useDoctorByIdSelector } from '../store/slices/doctors/doctorSelector'
import { addBooking } from '../store/slices/booking/bookingSlice'
import { format } from 'date-fns'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TZDate } from '@date-fns/tz'

const BookingConfirmationScreen = ({
  route,
  navigation,
}: BookingConfirmationScreenProps) => {
  const { id, date, startTime, endTime } = route.params

  const insets = useSafeAreaInsets()
  const dispatch = useAppDispatch()
  const doctor = useAppSelector((state) => useDoctorByIdSelector(state, id))

  const onConfirmPress = useCallback(() => {
    if (!doctor) return

    dispatch(
      addBooking({
        id: `${doctor.id}-${date}-${startTime}`,
        date: date,
        startTime: startTime,
        endTime: endTime,
        doctor: {
          id: doctor.id,
          name: doctor.name,
          timezone: doctor.timezone,
        },
      })
    )

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Bookings' }],
      })
    )
  }, [dispatch, doctor, date, startTime, endTime])

  const formattedTime = format(
    new TZDate(`${date} ${startTime}`, doctor?.timezone),
    'hh:mm a z'
  )

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
  }, [onConfirmPress])

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + Theme.spacing.medium,
        },
      ]}
    >
      <Text
        style={[
          Theme.typography.body,
          {
            alignItems: 'center',
            textAlign: 'center',
          },
        ]}
      >
        Would you like to proceed and schedule with Dr. {doctor?.name} on{' '}
        {format(new Date(date), 'MMMM do, yyyy')} at {formattedTime}?
      </Text>

      <Text style={Theme.typography.subheader}>Doctor: {doctor?.name}</Text>
      <Text style={Theme.typography.body}>
        Date: {format(new Date(date), 'MMMM do, yyyy')}
      </Text>
      <Text style={Theme.typography.body}>Time: {formattedTime}</Text>
    </View>
  )
}

export default BookingConfirmationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: Theme.spacing.medium,
    padding: Theme.spacing.medium,
  },
})
