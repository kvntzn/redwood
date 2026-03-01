import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import { persistor, store } from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <Toast />
      </PersistGate>
    </Provider>
  )
}
