import { parse, getHours, getMinutes } from 'date-fns'
import { DayOfWeek, DoctorSchedule, DoctorShift } from '../types/DoctorSchedule'

export const timeToDecimal = (time: string) => {
  const date = parse(time.trim(), 'h:mma', new Date())

  return getHours(date) + getMinutes(date) / 60
}

export const getUnavailableHours = (shifts: DoctorShift[]) => {
  let unavailableHours: { start: number; end: number }[] = []

  for (let index = 0; index < shifts.length; index++) {
    const element = shifts[index]
    const { availableAt, availableUntil } = element

    if (!availableAt || !availableUntil) {
      continue
    }

    const start = timeToDecimal(availableAt)
    const end = timeToDecimal(availableUntil)

    if (start > 0) {
      unavailableHours.push({
        start:
          index === 0 ? 0 : timeToDecimal(shifts[index - 1].availableUntil),
        end: start,
      })
    }

    if (end < 24) {
      unavailableHours.push({
        start: end,
        end:
          index === shifts.length - 1
            ? 24
            : timeToDecimal(shifts[index + 1].availableAt),
      })
    }
  }

  return unavailableHours
}

export const getUnavailableDays = (schedule: DoctorSchedule[]) => {
  const dayMap: Record<DayOfWeek, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  }
  const availableDays = new Set(schedule.map((s) => dayMap[s.dayOfWeek]))

  return [0, 1, 2, 3, 4, 5, 6].filter((day) => !availableDays.has(day))
}
