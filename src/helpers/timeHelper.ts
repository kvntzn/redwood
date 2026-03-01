import { parse, getHours, getMinutes } from 'date-fns'
import { DayOfWeek, DoctorSchedule, DoctorShift } from '../types/DoctorSchedule'

export const timeToDecimal = (time: string) => {
  const date = parse(time.trim(), 'h:mma', new Date())

  return getHours(date) + getMinutes(date) / 60
}

export const getCurrentHour = () => {
  const now = new Date()
  return getHours(now) + getMinutes(now) / 60
}

export const getUnavailableHours = (
  shifts: DoctorShift[],
  currentHour?: number
) => {
  let unavailableHours: { start: number; end: number }[] = []
  let cursor = 0

  if (currentHour && currentHour > 0) {
    unavailableHours.push({ start: 0, end: currentHour })
    cursor = currentHour
  }

  for (let index = 0; index < shifts.length; index++) {
    const element = shifts[index]
    const { availableAt, availableUntil } = element
    const start = timeToDecimal(availableAt)
    const end = timeToDecimal(availableUntil)

    if (currentHour && end <= currentHour) {
      continue
    }

    const effectiveStart = Math.max(start, cursor)

    if (cursor < effectiveStart) {
      unavailableHours.push({
        start: cursor,
        end: effectiveStart,
      })
    }

    cursor = Math.max(end, cursor)
  }

  if (cursor < 24) {
    unavailableHours.push({
      start: cursor,
      end: 24,
    })
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
