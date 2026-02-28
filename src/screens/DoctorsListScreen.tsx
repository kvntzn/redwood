import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React from 'react'
import { useGetDoctorsQuery } from '../store/doctorsApi'
import DoctorCard from '../components/DoctorCard'
import { Theme } from '../theme/theme'
import { Doctor } from '../types/Doctor'

const DoctorsListScreen = () => {
  const { data, isLoading, isFetching, refetch } = useGetDoctorsQuery()

  const renderItem = ({ item }: { item: Doctor }) => (
    <DoctorCard doctor={item} />
  )

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={isLoading || isFetching}
          onRefresh={refetch}
        />
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentInsetAdjustmentBehavior='automatic'
    />
  )
}

export default DoctorsListScreen

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Theme.colors.border,
  },
})
