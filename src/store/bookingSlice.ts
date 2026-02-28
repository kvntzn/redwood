import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking } from '../types/Booking'

type BookingState = {
  bookings: Booking[]
}
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
  },
})

const { actions, reducer } = bookingSlice
export const { addBooking } = actions
export default reducer
