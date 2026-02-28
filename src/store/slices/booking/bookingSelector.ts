import { RootState } from '../../store'

export const useBookingsSelector = (state: RootState) => state.booking.bookings
