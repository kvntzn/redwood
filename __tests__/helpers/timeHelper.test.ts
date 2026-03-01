import {
  getUnavailableDays,
  getUnavailableHours,
  timeToDecimal,
} from '../../src/helpers/timeHelper'
import {
  DayOfWeek,
  DoctorSchedule,
  DoctorShift,
} from '../../src/types/DoctorSchedule'

describe('timeToDecimal', () => {
  it('returns correct decimal for time', () => {
    expect(timeToDecimal('08:00AM')).toEqual(8)
  })
})

describe('getUnavailableHours', () => {
  it('returns correct unavailable hours for a single shift', () => {
    const input: DoctorShift[] = [
      {
        availableAt: '8:00AM',
        availableUntil: '4:00PM',
      },
    ]

    const result = getUnavailableHours(input)

    expect(result).toEqual([
      {
        start: 0,
        end: 8,
      },
      {
        start: 16,
        end: 24,
      },
    ])
  })

  it('returns correct unavailable hours for a multi shift', () => {
    const input: DoctorShift[] = [
      {
        availableAt: '7:00AM',
        availableUntil: '2:00PM',
      },
      {
        availableAt: '3:00PM',
        availableUntil: '5:00PM',
      },
    ]

    const result = getUnavailableHours(input)

    expect(result).toEqual([
      {
        start: 0,
        end: 7,
      },
      {
        start: 14,
        end: 15,
      },
      {
        start: 17,
        end: 24,
      },
    ])
  })
})

describe('getUnavailableDays', () => {
  const dayMap: Record<DayOfWeek, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  }

  it('returns correct unavailable days single schedule', () => {
    const input: DoctorSchedule[] = [
      {
        dayOfWeek: 'Monday',
        shifts: [],
      },
    ]

    const result = getUnavailableDays(input)

    expect(result).toEqual([
      dayMap.Sunday,
      dayMap.Tuesday,
      dayMap.Wednesday,
      dayMap.Thursday,
      dayMap.Friday,
      dayMap.Saturday,
    ])
  })

  it('returns correct unavailable days multi schedule', () => {
    const input: DoctorSchedule[] = [
      {
        dayOfWeek: 'Monday',
        shifts: [],
      },
      {
        dayOfWeek: 'Tuesday',
        shifts: [],
      },
      {
        dayOfWeek: 'Thursday',
        shifts: [],
      },
      {
        dayOfWeek: 'Friday',
        shifts: [],
      },
    ]

    const result = getUnavailableDays(input)

    expect(result).toEqual([dayMap.Sunday, dayMap.Wednesday, dayMap.Saturday])
  })
})
