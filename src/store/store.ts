import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { doctorsApi } from './doctorsApi'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [doctorsApi.reducerPath]: doctorsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorsApi.middleware),
  enhancers: (getDefaultEnhancers) => {
    if (__DEV__) {
      const reactotron = require('../../ReactotronConfig').default
      return getDefaultEnhancers().concat(reactotron.createEnhancer())
    } else {
      return getDefaultEnhancers()
    }
  },
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
