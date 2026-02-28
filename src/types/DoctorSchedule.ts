export type DoctorSchedule = {
  dayOfWeek: string
  shifts: DoctorShift[]
}

export type DoctorShift = {
  availableAt: string
  availableUntil: string
}
