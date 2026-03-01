import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking } from '../../../types/Booking'
import { BookingState } from '../../../types/Slices'

const initialState: BookingState = {
  bookings: [],
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload)
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const bookingId = action.payload
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== bookingId
      )
    },
  },
})

const { actions, reducer } = bookingSlice
export const { addBooking, cancelBooking } = actions
export default reducer
