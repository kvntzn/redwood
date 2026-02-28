import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Theme } from '../theme/theme'

const Separator = () => {
  return <View style={styles.separator} />
}

export default Separator

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Theme.colors.border,
  },
})
