import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Doctor } from '../types/Doctor'
import { Theme } from '../theme/theme'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

interface DoctorCardProps {
  doctor: Doctor
  onPress?: () => void
}

const DoctorCard = ({ doctor, onPress }: DoctorCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.avatar}>
          <FontAwesome6
            name='user-doctor'
            size={24}
            color={Theme.colors.text}
          />
        </View>

        <View>
          <Text style={Theme.typography.subheader}>{doctor.name}</Text>
          <Text style={Theme.typography.body}>{doctor.timezone}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default DoctorCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.medium,
  },
  innerContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    backgroundColor: '#E5E7EB',
    borderRadius: 24,
    padding: Theme.spacing.small,
    marginRight: Theme.spacing.medium,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
