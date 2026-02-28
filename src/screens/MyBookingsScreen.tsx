import { SectionList, StyleSheet, View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { Theme } from '../theme/theme'
import { Booking } from '../types/Booking'
import { useBookingsSelector } from '../store/slices/booking/bookingSelector'
import { useAppSelector } from '../store/hooks'
import BookingCard from '../components/BookingCard'
import { format } from 'date-fns'
import Separator from '../components/Separator'

const MyBookingsScreen = () => {
  const bookings = useAppSelector(useBookingsSelector)

  const renderItem = ({ item }: { item: Booking }) => {
    return <BookingCard booking={item} />
  }

  const renderHeader = ({
    section: { title },
  }: {
    section: { title: string }
  }) => (
    <Text
      style={[
        Theme.typography.subheader,
        {
          marginLeft: Theme.spacing.medium,
        },
      ]}
    >
      {title}
    </Text>
  )

  const renderSeparator = () => <Separator />

  const sectionedBookings = useMemo(() => {
    return bookings.reduce((sections, booking) => {
      const date = format(new Date(booking.date), 'MMM do, yyyy')

      const existingSection = sections.find((s) => s.title === date)
      if (existingSection) {
        existingSection.data.push(booking)
      } else {
        sections.push({ title: date, data: [booking] })
      }

      return sections
    }, [] as { title: string; data: typeof bookings }[])
  }, [bookings])

  return (
    <SectionList
      sections={sectionedBookings}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
      ItemSeparatorComponent={renderSeparator}
      contentInsetAdjustmentBehavior='automatic'
    />
  )
}

export default MyBookingsScreen
