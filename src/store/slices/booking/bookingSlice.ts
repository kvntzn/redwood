import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking } from '../../../types/Booking'
import { BookingState } from '../../../types/Slices'
import { RootState } from '../../store'

const initialState: BookingState = {
  bookings: [],
}

export const addBooking = createAsyncThunk<
  Booking,
  Booking,
  { state: RootState; rejectValue: string }
>('booking/addBooking', async (booking, { getState, rejectWithValue }) => {
  const { bookings } = getState().booking
  if (bookings.some((b) => b.id === booking.id)) {
    return rejectWithValue('Booking already exists')
  }
  return booking
})

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    cancelBooking: (state, action: PayloadAction<string>) => {
      const bookingId = action.payload
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== bookingId
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.bookings.push(action.payload)
    })
  },
})

const { actions, reducer } = bookingSlice
export const { cancelBooking } = actions
export default reducer
