import { Alert, StyleSheet, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { DoctorDetailScreenProps } from '../types/Navigation'
import { useGetDoctorsQuery } from '../store/doctorsApi'
import { Theme } from '../theme/theme'
import {
  TimelineList,
  CalendarProvider,
  ExpandableCalendar,
  TimelineEventProps,
} from 'react-native-calendars'
import { set, addMinutes, format } from 'date-fns'
import { getUnavailableDays, getUnavailableHours } from '../helpers/timeHelper'

const today = new Date().toISOString().split('T')[0]

const DoctorDetailScreen = ({ route }: DoctorDetailScreenProps) => {
  const { id } = route.params

  const { data } = useGetDoctorsQuery()
  const doctor = data?.find((doc) => doc.id === id)!

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

  const onBackgroundLongPress = (
    _timeString: string,
    time: { hour: number; minutes: number }
  ) => {
    const startDate = set(new Date(), {
      hours: time.hour,
      minutes: time.minutes,
    })
    const endDate = addMinutes(startDate, 30)

    const start = format(startDate, 'HH:mm')
    const end = format(endDate, 'HH:mm')
    setSelectedTime({ date: selectedDate, start, end })

    const formattedStart = format(startDate, 'hh:mm a')
    Alert.alert(
      'Book Appointment',
      `Schedule with Dr. ${doctor?.name} on ${selectedDate} at ${formattedStart}?`,
      [
        { text: 'Cancel', onPress: () => setSelectedTime(null) },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              'Confirmed',
              `Your appointment with Dr. ${doctor?.name} is confirmed for ${selectedDate} at ${formattedStart}.`
            )
          },
        },
      ]
    )
  }

  const unavailableDays = useMemo(() => {
    return getUnavailableDays(doctor.schedule)
  }, [doctor.schedule])

  const timelineProps = useMemo(() => {
    const day = format(selectedDate, 'EEEE')
    const schedule = doctor?.schedule.find((s) => s.dayOfWeek === day)

    const unavailableHours = schedule?.shifts
      ? getUnavailableHours(schedule.shifts)
      : [{ start: 0, end: 24 }]

    return {
      format24h: false,
      onBackgroundLongPress,
      onBackgroundLongPressOut: () => {},
      unavailableHours,
      unavailableHoursColor: Theme.colors.border,
    }
  }, [doctor, selectedDate])

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

    return base
  }, [selectedTime, doctor?.name])

  return (
    <View style={styles.container}>
      <CalendarProvider
        date={today}
        onDateChanged={onDateChanged}
        showTodayButton
        disabledOpacity={0.6}
        // numberOfDays={3}
      >
        <ExpandableCalendar
          firstDay={1}
          disabledByWeekDays={unavailableDays}
          minDate={today}
          // leftArrowImageSource={require('../img/previous.png')}
          // rightArrowImageSource={require('../img/next.png')}
          // markedDates={this.marked}
        />
        <TimelineList
          events={events}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToNow
          scrollToFirst
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
