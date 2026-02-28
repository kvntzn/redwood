import { Doctor } from '../types/Doctor'
import { DoctorAvailability } from '../types/DoctorAvailability'

export const transformDoctorsResponse = (response: DoctorAvailability[]) => {
  let doctors: Doctor[] = []

  for (const availability of response) {
    const doctor = doctors.find((d) => d.name === availability.name)

    if (!doctor) {
      doctors.push({
        id: availability.name.toLowerCase().replace(/\s/g, '-'),
        name: availability.name,
        timezone: availability.timezone,
        schedule: [
          {
            dayOfWeek: availability.day_of_week,
            shifts: [
              {
                availableAt: availability.available_at,
                availableUntil: availability.available_until,
              },
            ],
          },
        ],
      })
    } else {
      const schedule = doctor.schedule.find(
        (s) => s.dayOfWeek === availability.day_of_week
      )

      if (!schedule) {
        doctor.schedule.push({
          dayOfWeek: availability.day_of_week,
          shifts: [
            {
              availableAt: availability.available_at,
              availableUntil: availability.available_until,
            },
          ],
        })
      } else {
        schedule.shifts.push({
          availableAt: availability.available_at,
          availableUntil: availability.available_until,
        })
      }
    }
  }

  return doctors
}
