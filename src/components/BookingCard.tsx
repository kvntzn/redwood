import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Theme } from '../theme/theme'
import { Booking } from '../types/Booking'
import DoctorCard from './DoctorCard'
import { tzName } from '@date-fns/tz'
import { format } from 'date-fns'
import { useAppDispatch } from '../store/hooks'
import { cancelBooking } from '../store/slices/booking/bookingSlice'

interface BookingCardProps {
  booking: Booking
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const dispatch = useAppDispatch()

  const date = new Date(`${booking.date}T${booking.startTime}`)
  const formattedTime = format(date, 'hh:mm a')
  const formattedTZ = tzName(booking.doctor?.timezone, date, 'shortGeneric')

  const onPress = () => {
    const message = ` (Dr. ${booking.doctor.name} on ${format(
      date,
      'MMM do, yyyy'
    )} at ${format(date, 'hh:mm a')})`

    Alert.alert(
      'Booking Options',
      `What would you like to do with this booking? ${message}`,
      [
        {
          text: 'Cancel',
          onPress: () =>
            Alert.alert(
              'Cancel Booking',
              `Are you sure you want to cancel this booking? ${message}`,
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  style: 'destructive',
                  onPress: () => dispatch(cancelBooking(booking.id)),
                },
              ],
              {
                cancelable: true,
              }
            ),
          style: 'destructive',
        },
        {
          text: 'Close',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingRight: Theme.spacing.medium,
      }}
    >
      <View style={styles.container}>
        <DoctorCard
          doctor={booking.doctor}
          showTimezone={false}
          onPress={onPress}
        />

        <View style={styles.timeContainer}>
          <Text style={Theme.typography.subheader}>{formattedTime}</Text>
          <Text style={{ textAlign: 'right' }}>{formattedTZ}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default BookingCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timeContainer: { alignItems: 'flex-end', flexShrink: 1 },
})
