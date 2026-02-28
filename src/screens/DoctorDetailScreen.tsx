import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DoctorDetailScreenProps } from '../types/Navigation'

const DoctorDetailScreen = ({ route }: DoctorDetailScreenProps) => {
  const { id } = route.params

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>DoctorDetailScreen</Text>
    </View>
  )
}

export default DoctorDetailScreen

const styles = StyleSheet.create({})
