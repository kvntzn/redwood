import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootTabParamList = {
  Home: undefined
  Bookings: undefined
}

export type HomeStackParamList = {
  'Doctors List': undefined
  'Doctors Detail': { id: string; name: string; timezone: string }
  'Booking Confirmation': {
    id: string
    date: string
    startTime: string
    endTime: string
  }
}

export type BookingsStackParamList = {
  'My Bookings': undefined
}

export type DoctorsListScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Doctors List'
>

export type DoctorDetailScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Doctors Detail'
>

export type BookingConfirmationScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Booking Confirmation'
>

export type MyBookingsScreenProps = NativeStackScreenProps<
  BookingsStackParamList,
  'My Bookings'
>
