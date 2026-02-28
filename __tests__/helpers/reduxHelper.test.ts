import { transformDoctorsResponse } from '../../src/helpers/reduxHelper'
import { DoctorAvailability } from '../../src/types/DoctorAvailability'

describe('transformDoctorsResponse', () => {
  it('returns empty array for empty input', () => {
    expect(transformDoctorsResponse([])).toEqual([])
  })

  it('creates a doctor from a single availability', () => {
    const input: DoctorAvailability[] = [
      {
        name: 'Dr Smith',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: '9:00am',
        available_until: '5:00pm',
      },
    ]

    const result = transformDoctorsResponse(input)

    expect(result).toEqual([
      {
        id: 'dr-smith',
        name: 'Dr Smith',
        timezone: 'Australia/Sydney',
        schedule: [
          {
            dayOfWeek: 'Monday',
            shifts: [{ availableAt: '9:00am', availableUntil: '5:00pm' }],
          },
        ],
      },
    ])
  })

  it('groups multiple shifts under the same day for the same doctor', () => {
    const input: DoctorAvailability[] = [
      {
        name: 'Dr Smith',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: '9:00am',
        available_until: '12:00pm',
      },
      {
        name: 'Dr Smith',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: '1:00pm',
        available_until: '5:00pm',
      },
    ]

    const result = transformDoctorsResponse(input)

    expect(result).toHaveLength(1)
    expect(result[0].schedule).toHaveLength(1)
    expect(result[0].schedule[0].shifts).toHaveLength(2)
  })

  it('groups different days under the same doctor', () => {
    const input: DoctorAvailability[] = [
      {
        name: 'Dr Smith',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: '9:00am',
        available_until: '5:00pm',
      },
      {
        name: 'Dr Smith',
        timezone: 'Australia/Sydney',
        day_of_week: 'Tuesday',
        available_at: '10:00am',
        available_until: '4:00pm',
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
        name: 'Dr Smith',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: '9:00am',
        available_until: '5:00pm',
      },
      {
        name: 'Dr Jones',
        timezone: 'America/New_York',
        day_of_week: 'Monday',
        available_at: '8:00am',
        available_until: '4:00pm',
      },
    ]

    const result = transformDoctorsResponse(input)

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Dr Smith')
    expect(result[1].name).toBe('Dr Jones')
  })
})
