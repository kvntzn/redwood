import { FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { useGetDoctorsQuery } from '../store/apis/doctorsApi'
import DoctorCard from '../components/DoctorCard'
import { Doctor } from '../types/Doctor'
import { DoctorsListScreenProps } from '../types/Navigation'
import Separator from '../components/Separator'
import EmptyListView from '../components/EmptyListView'

const DoctorsListScreen = ({ navigation }: DoctorsListScreenProps) => {
  const { data, isLoading, isFetching, refetch, error } = useGetDoctorsQuery()

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

  const renderEmpty = () => {
    if (error) {
      return (
        <EmptyListView
          title='Something went wrong'
          description='Please try again later.'
        />
      )
    }

    return (
      <EmptyListView
        title='No Available Doctors'
        description='Please try again another time.'
      />
    )
  }

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
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={renderSeparator}
      contentInsetAdjustmentBehavior='automatic'
    />
  )
}

export default DoctorsListScreen
