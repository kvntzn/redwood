module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: ['<rootDir>/e2e'],
  setupFiles: ['<rootDir>/test/setupJest.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@reduxjs/toolkit|immer|reselect|redux|redux-thunk|react-redux|redux-persist|date-fns|@date-fns/.*|msw)',
  ],
}
