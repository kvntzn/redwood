import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React from 'react'
import { useGetDoctorsQuery } from '../store/apis/doctorsApi'
import DoctorCard from '../components/DoctorCard'
import { Doctor } from '../types/Doctor'
import { DoctorsListScreenProps } from '../types/Navigation'
import Separator from '../components/Separator'

const DoctorsListScreen = ({ navigation }: DoctorsListScreenProps) => {
  const { data, isLoading, isFetching, refetch } = useGetDoctorsQuery()

  const renderItem = ({ item }: { item: Doctor }) => (
    <DoctorCard
      doctor={item}
      onPress={() =>
        navigation.navigate('Doctors Detail', {
          id: item.id,
          name: item.name,
          timezone: item.timezone,
        })
      }
    />
  )

  const renderSeparator = () => <Separator />

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
      ItemSeparatorComponent={renderSeparator}
      contentInsetAdjustmentBehavior='automatic'
    />
  )
}

export default DoctorsListScreen
