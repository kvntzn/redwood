import reducer, {
  addBooking,
  cancelBooking,
} from '../../src/store/slices/booking/bookingSlice'
import { Booking } from '../../src/types/Booking'
import { BookingState } from '../../src/types/Slices'

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

  it('should handle a booking being added to an empty list', () => {
    const previousState: BookingState = {
      bookings: [],
    }

    const state = reducer(previousState, addBooking(mockBooking))

    expect(state.bookings).toHaveLength(1)
    expect(state.bookings[0]).toEqual(mockBooking)
  })

  it('should handle a booking being added to an existing list', () => {
    const previousState: BookingState = {
      bookings: [mockBooking],
    }

    const secondBooking: Booking = {
      date: '2026-03-04',
      doctor: {
        id: "elyssa-o'kon",
        name: "Elyssa O'Kon",
        timezone: 'Australia/Perth',
      },
      endTime: '06:30',
      id: "elyssa-o'kon-2026-03-04-06:00",
      startTime: '06:00',
    }

    const state = reducer(previousState, addBooking(secondBooking))

    expect(state.bookings).toHaveLength(2)
    expect(state.bookings[0].doctor.name).toBe('Christy Schumm')
    expect(state.bookings[1].doctor.name).toBe("Elyssa O'Kon")
  })

  it('should handle a booking being remove to an existing list', () => {
    let state = reducer(undefined, addBooking(mockBooking))
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

    let state = reducer(previousState, addBooking(secondBooking))
    expect(state.bookings).toHaveLength(2)

    state = reducer(state, cancelBooking(mockBooking.id))
    expect(state.bookings).toHaveLength(1)
    expect(state.bookings[0].id).toBe('ramy-malik-2026-03-04-10:30')
  })
})
