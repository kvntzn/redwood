import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
