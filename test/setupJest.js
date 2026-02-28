jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('reactotron-react-native', () => ({
  __esModule: true,
  default: {
    setAsyncStorageHandler: jest.fn(() => ({
      configure: jest.fn(() => ({
        use: jest.fn(() => ({
          useReactNative: jest.fn(() => ({
            connect: jest.fn(() => ({
              createEnhancer: jest.fn(() => (next) => next),
            })),
          })),
        })),
      })),
    })),
  },
}))

jest.mock('reactotron-redux', () => ({
  reactotronRedux: jest.fn(() => ({})),
}))
