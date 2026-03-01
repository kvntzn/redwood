import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Theme } from '../theme/theme'

interface EmptyListViewProps {
  title: string
  description: string
}

const EmptyListView = ({ title, description }: EmptyListViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={Theme.typography.subheader}>{title}</Text>

      <View style={{ height: 24 }} />

      <Text style={Theme.typography.body}>{description}</Text>
    </View>
  )
}

export default EmptyListView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
