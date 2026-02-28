import { DayOfWeek } from './DoctorSchedule'

export type DoctorAvailability = {
  name: string
  timezone: string
  day_of_week: DayOfWeek
  available_at: string
  available_until: string
}
