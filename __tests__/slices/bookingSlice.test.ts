import reducer, {
  addBooking,
  cancelBooking,
} from '../../src/store/slices/booking/bookingSlice'
import { Booking } from '../../src/types/Booking'
import { BookingState } from '../../src/types/Slices'
import { setupStore } from '../../src/store/store'

const mockBooking: Booking = {
  date: '2026-03-03',
  doctor: {
    id: 'christy-schumm',
    name: 'Christy Schumm',
    timezone: 'Australia/Sydney',
  },
  endTime: '11:30',
  id: 'christy-schumm-2026-03-03-11:00',
  startTime: '11:00',
}

describe('bookingSlice', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, { type: 'unknown' })

    expect(state).toEqual({ bookings: [] })
  })

  it('should handle a booking being remove to an existing list', () => {
    let state = reducer(
      undefined,
      addBooking.fulfilled(mockBooking, '', mockBooking)
    )
    expect(state.bookings).toHaveLength(1)

    state = reducer(state, cancelBooking(mockBooking.id))
    expect(state.bookings).toHaveLength(0)
  })

  it('should handle other bookings not to be remove when cancelling', () => {
    const previousState: BookingState = {
      bookings: [mockBooking],
    }

    const secondBooking: Booking = {
      date: '2026-03-04',
      doctor: {
        id: 'ramy-malik',
        name: 'Ramy Malik',
        timezone: 'Australia/Perth',
      },
      endTime: '11:00',
      id: 'ramy-malik-2026-03-04-10:30',
      startTime: '10:30',
    }

    let state = reducer(
      previousState,
      addBooking.fulfilled(secondBooking, '', secondBooking)
    )
    expect(state.bookings).toHaveLength(2)

    state = reducer(state, cancelBooking(mockBooking.id))
    expect(state.bookings).toHaveLength(1)
    expect(state.bookings[0].id).toBe('ramy-malik-2026-03-04-10:30')
  })

  it('should add a booking when it does not exist', async () => {
    const store = setupStore()
    const dispatch = store.dispatch
    const result = await dispatch(addBooking(mockBooking))

    expect(result.type).toBe('booking/addBooking/fulfilled')
    expect(store.getState().booking.bookings).toHaveLength(1)
    expect(store.getState().booking.bookings[0]).toEqual(mockBooking)
  })

  it('should reject when booking already exists', async () => {
    const store = setupStore()
    await store.dispatch(addBooking(mockBooking))

    const result = await store.dispatch(addBooking(mockBooking))

    expect(result.type).toBe('booking/addBooking/rejected')
    expect(
      addBooking.rejected.match(result) && result.meta.rejectedWithValue
    ).toBe(true)
    expect(addBooking.rejected.match(result) && result.payload).toBe(
      'Booking already exists'
    )
    expect(store.getState().booking.bookings).toHaveLength(1)
  })
})
