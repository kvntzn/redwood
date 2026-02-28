import { DefaultTheme } from '@react-navigation/native'
import { TextStyle } from 'react-native'

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F7F8FA',
    card: '#FFFFFF',
    primary: '#2F80ED',
    text: '#1F2937',
    border: '#E5E7EB',
    notification: '#EF4444',
  },
}

export const Theme = {
  ...NavigationTheme,
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  typography: {
    header: {
      fontSize: 22,
      fontWeight: '700',
      lineHeight: 28,
    } as TextStyle,
    subheader: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
    } as TextStyle,
    body: {
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
    } as TextStyle,
    caption: {
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 18,
    } as TextStyle,
  },
}
