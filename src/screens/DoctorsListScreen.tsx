import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetDoctorsQuery } from '../store/doctorsApi'

const DoctorsListScreen = () => {
  const { data, isLoading } = useGetDoctorsQuery()

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        data?.map((doctor) => (
          <View key={doctor.id}>
            <Text>{doctor.name}</Text>
          </View>
        ))
      )}
    </View>
  )
}

export default DoctorsListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
