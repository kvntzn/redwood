import { Booking } from './Booking'
import { Doctor } from './Doctor'

export type BookingState = {
  bookings: Booking[]
}

export type DoctorsState = {
  doctors: Doctor[]
}
