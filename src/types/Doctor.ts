import { DoctorSchedule } from './DoctorSchedule'

export type Doctor = {
  id: string
  name: string
  timezone: string
  schedule: DoctorSchedule[]
}
