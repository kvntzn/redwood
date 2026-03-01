import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { doctorsApi } from './apis/doctorsApi'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  PERSIST,
  PAUSE,
  FLUSH,
  REGISTER,
  persistStore,
  REHYDRATE,
  persistReducer,
  PURGE,
} from 'redux-persist'
import rootReducer from './reducer'
import { rtkQueryErrorLogger } from './logger'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['bookings', 'doctors'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = (preloadedState?: PreloadedState) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          warnAfter: 128,
        },
        immutableCheck: { warnAfter: 128 },
      })
        .concat(doctorsApi.middleware)
        .concat(rtkQueryErrorLogger),
    enhancers: (getDefaultEnhancers) => {
      if (__DEV__) {
        const reactotron = require('../../ReactotronConfig').default
        return getDefaultEnhancers().concat(reactotron.createEnhancer())
      } else {
        return getDefaultEnhancers()
      }
    },
  })
export const store = setupStore()
export const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type PreloadedState = Parameters<typeof persistedReducer>[0]
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore>
