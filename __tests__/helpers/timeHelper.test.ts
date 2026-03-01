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
  it('returns correct decimal for morning time', () => {
    expect(timeToDecimal('8:00AM')).toEqual(8)
  })

  it('returns correct decimal for afternoon time', () => {
    expect(timeToDecimal('2:00PM')).toEqual(14)
  })

  it('returns correct decimal for time with minutes', () => {
    expect(timeToDecimal('9:30AM')).toEqual(9.5)
  })

  it('returns correct decimal for 12:00PM (noon)', () => {
    expect(timeToDecimal('12:00PM')).toEqual(12)
  })

  it('returns correct decimal for 12:00AM (midnight)', () => {
    expect(timeToDecimal('12:00AM')).toEqual(0)
  })

  it('handles leading whitespace in time strings', () => {
    expect(timeToDecimal(' 9:00AM')).toEqual(9)
  })

  it('returns correct decimal for 5:30PM', () => {
    expect(timeToDecimal('5:30PM')).toEqual(17.5)
  })
})

describe('getUnavailableHours', () => {
  it('returns full day as unavailable for empty shifts', () => {
    const result = getUnavailableHours([])

    expect(result).toEqual([{ start: 0, end: 24 }])
  })

  it('returns correct unavailable hours for a single shift', () => {
    const input: DoctorShift[] = [
      {
        availableAt: '8:00AM',
        availableUntil: '4:00PM',
      },
    ]

    const result = getUnavailableHours(input)

    expect(result).toEqual([
      { start: 0, end: 8 },
      { start: 16, end: 24 },
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
      { start: 0, end: 7 },
      { start: 14, end: 15 },
      { start: 17, end: 24 },
    ])
  })

  it('returns correct half-hour shift', () => {
    const input: DoctorShift[] = [
      {
        availableAt: '9:30AM',
        availableUntil: '5:30PM',
      },
    ]

    const result = getUnavailableHours(input)

    expect(result).toEqual([
      { start: 0, end: 9.5 },
      { start: 17.5, end: 24 },
    ])
  })

  it('marks past hours as unavailable when currentHour is provided', () => {
    const input: DoctorShift[] = [
      {
        availableAt: '8:00AM',
        availableUntil: '4:00PM',
      },
    ]

    const result = getUnavailableHours(input, 10)

    expect(result).toEqual([
      { start: 0, end: 10 },
      { start: 16, end: 24 },
    ])
  })

  it('skips shifts entirely in the past', () => {
    const input: DoctorShift[] = [
      {
        availableAt: '7:00AM',
        availableUntil: '10:00AM',
      },
      {
        availableAt: '1:00PM',
        availableUntil: '5:00PM',
      },
    ]

    const result = getUnavailableHours(input, 12)

    expect(result).toEqual([
      { start: 0, end: 12 },
      { start: 12, end: 13 },
      { start: 17, end: 24 },
    ])
  })

  it('does not affect results when currentHour is undefined', () => {
    const input: DoctorShift[] = [
      {
        availableAt: '8:00AM',
        availableUntil: '4:00PM',
      },
    ]

    const result = getUnavailableHours(input, undefined)

    expect(result).toEqual([
      { start: 0, end: 8 },
      { start: 16, end: 24 },
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

  it('returns all days as unavailable for empty schedule', () => {
    const result = getUnavailableDays([])

    expect(result).toEqual([
      dayMap.Sunday,
      dayMap.Monday,
      dayMap.Tuesday,
      dayMap.Wednesday,
      dayMap.Thursday,
      dayMap.Friday,
      dayMap.Saturday,
    ])
  })

  it('returns correct unavailable days for single schedule', () => {
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

  it('returns correct unavailable days for multi schedule', () => {
    const input: DoctorSchedule[] = [
      { dayOfWeek: 'Monday', shifts: [] },
      { dayOfWeek: 'Tuesday', shifts: [] },
      { dayOfWeek: 'Thursday', shifts: [] },
      { dayOfWeek: 'Friday', shifts: [] },
    ]

    const result = getUnavailableDays(input)

    expect(result).toEqual([dayMap.Sunday, dayMap.Wednesday, dayMap.Saturday])
  })

  it('returns empty array when all days are available', () => {
    const input: DoctorSchedule[] = [
      { dayOfWeek: 'Sunday', shifts: [] },
      { dayOfWeek: 'Monday', shifts: [] },
      { dayOfWeek: 'Tuesday', shifts: [] },
      { dayOfWeek: 'Wednesday', shifts: [] },
      { dayOfWeek: 'Thursday', shifts: [] },
      { dayOfWeek: 'Friday', shifts: [] },
      { dayOfWeek: 'Saturday', shifts: [] },
    ]

    const result = getUnavailableDays(input)

    expect(result).toEqual([])
  })
})
