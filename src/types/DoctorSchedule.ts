export type DayOfWeek =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export type DoctorSchedule = {
  dayOfWeek: DayOfWeek
  shifts: DoctorShift[]
}

export type DoctorShift = {
  availableAt: string
  availableUntil: string
}
