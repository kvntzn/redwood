import { transformDoctorsResponse } from '../../src/helpers/reduxHelper'
import { DoctorAvailability } from '../../src/types/DoctorAvailability'

describe('transformDoctorsResponse', () => {
  it('returns empty array for empty input', () => {
    expect(transformDoctorsResponse([])).toEqual([])
  })

  it('creates a doctor from a single availability', () => {
    const input: DoctorAvailability[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 5:30PM',
      },
    ]

    const result = transformDoctorsResponse(input)

    expect(result).toEqual([
      {
        id: 'christy-schumm',
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        schedule: [
          {
            dayOfWeek: 'Monday',
            shifts: [{ availableAt: ' 9:00AM', availableUntil: ' 5:30PM' }],
          },
        ],
      },
    ])
  })

  it('groups multiple shifts under the same day for the same doctor', () => {
    const input: DoctorAvailability[] = [
      {
        name: 'Dr. Geovany Keebler',
        timezone: 'Australia/Perth',
        day_of_week: 'Thursday',
        available_at: ' 7:00AM',
        available_until: ' 2:00PM',
      },
      {
        name: 'Dr. Geovany Keebler',
        timezone: 'Australia/Perth',
        day_of_week: 'Thursday',
        available_at: ' 3:00PM',
        available_until: ' 5:00PM',
      },
    ]

    const result = transformDoctorsResponse(input)

    expect(result).toHaveLength(1)
    expect(result[0].schedule).toHaveLength(1)
    expect(result[0].schedule[0].shifts).toHaveLength(2)
    expect(result[0].schedule[0].shifts[0].availableAt).toBe(' 7:00AM')
    expect(result[0].schedule[0].shifts[1].availableAt).toBe(' 3:00PM')
  })

  it('groups different days under the same doctor', () => {
    const input: DoctorAvailability[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 5:30PM',
      },
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Tuesday',
        available_at: ' 8:00AM',
        available_until: ' 4:00PM',
      },
    ]

    const result = transformDoctorsResponse(input)

    expect(result).toHaveLength(1)
    expect(result[0].schedule).toHaveLength(2)
    expect(result[0].schedule[0].dayOfWeek).toBe('Monday')
    expect(result[0].schedule[1].dayOfWeek).toBe('Tuesday')
  })

  it('separates different doctors', () => {
    const input: DoctorAvailability[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 5:30PM',
      },
      {
        name: 'Ramy Malik',
        timezone: 'Australia/Perth',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 3:00PM',
      },
    ]

    const result = transformDoctorsResponse(input)

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Christy Schumm')
    expect(result[1].name).toBe('Ramy Malik')
  })
})
