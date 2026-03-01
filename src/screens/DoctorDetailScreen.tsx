import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DoctorDetailScreenProps } from '../types/Navigation'
import { Theme } from '../theme/theme'
import {
  TimelineList,
  CalendarProvider,
  ExpandableCalendar,
  TimelineEventProps,
} from 'react-native-calendars'
import { set, addMinutes, format } from 'date-fns'
import { getUnavailableDays, getUnavailableHours } from '../helpers/timeHelper'
import { useAppSelector } from '../store/hooks'
import { useDoctorByIdSelector } from '../store/slices/doctors/doctorSelector'
import { useBookingsSelector } from '../store/slices/booking/bookingSelector'
import { calendarTheme } from '../theme/calendarTheme'

const today = new Date().toISOString().split('T')[0]

const DoctorDetailScreen = ({ route, navigation }: DoctorDetailScreenProps) => {
  const { id } = route.params
  const doctor = useAppSelector((state) => useDoctorByIdSelector(state, id))
  const bookings = useAppSelector(useBookingsSelector)

  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedTime, setSelectedTime] = useState<{
    date: string
    start: string
    end: string
  } | null>(null)

  const onDateChanged = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const selectedDateRef = useRef(selectedDate)
  selectedDateRef.current = selectedDate

  const onBackgroundLongPress = useCallback(
    (_timeString: string, time: { hour: number; minutes: number }) => {
      const startDate = set(new Date(), {
        hours: time.hour,
        minutes: time.minutes,
      })
      const endDate = addMinutes(startDate, 30)

      const start = format(startDate, 'HH:mm')
      const end = format(endDate, 'HH:mm')
      const currentDate = selectedDateRef.current

      setSelectedTime({ date: currentDate, start, end })

      navigation.navigate('Booking Confirmation', {
        id: doctor?.id ?? '',
        date: currentDate,
        startTime: start,
        endTime: end,
      })
    },
    [doctor?.id, navigation]
  )

  useEffect(() => {
    if (!selectedTime) return
    const timer = setTimeout(() => setSelectedTime(null), 1000)
    return () => clearTimeout(timer)
  }, [selectedTime])

  const unavailableDays = useMemo(() => {
    return getUnavailableDays(doctor?.schedule ?? [])
  }, [doctor?.schedule])

  const onBackgroundLongPressOut = useCallback(() => {}, [])

  const unavailableHours = useMemo(() => {
    const day = format(new Date(selectedDate), 'EEEE')
    const schedule = doctor?.schedule.find((s) => s.dayOfWeek === day)
    return schedule?.shifts
      ? getUnavailableHours(schedule.shifts)
      : [{ start: 0, end: 24 }]
  }, [doctor?.schedule, selectedDate])

  const timelineProps = useMemo(
    () => ({
      format24h: false,
      onBackgroundLongPress,
      onBackgroundLongPressOut,
      unavailableHours,
      unavailableHoursColor: Theme.colors.border,
    }),
    [onBackgroundLongPress, onBackgroundLongPressOut, unavailableHours]
  )

  const events = useMemo(() => {
    const base: Record<string, TimelineEventProps[]> = {}

    if (selectedTime) {
      base[selectedTime.date] = [
        ...(base[selectedTime.date] ?? []),
        {
          title: `Appointment with Dr. ${doctor?.name ?? ''}`,
          start: `${selectedTime.date} ${selectedTime.start}`,
          end: `${selectedTime.date} ${selectedTime.end}`,
          color: Theme.colors.primary,
        },
      ]
    }

    bookings.forEach((booking) => {
      if (booking.doctor.id === doctor?.id) {
        base[booking.date] = [
          ...(base[booking.date] ?? []),
          {
            title: `Booked with Dr. ${booking.doctor.name}`,
            start: `${booking.date} ${booking.startTime}`,
            end: `${booking.date} ${booking.endTime}`,
            color: Theme.colors.notification,
          },
        ]
      }
    })

    return base
  }, [selectedTime, doctor?.name, bookings])

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: 120,
        },
      ]}
    >
      <CalendarProvider
        date={today}
        onDateChanged={onDateChanged}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          firstDay={1}
          disabledByWeekDays={unavailableDays}
          minDate={today}
          theme={calendarTheme}
        />
        <TimelineList
          events={events}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToNow
          scrollToFirst
          initialTime={{
            hour: 8,
            minutes: 0,
          }}
        />
      </CalendarProvider>
    </View>
  )
}

export default DoctorDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
