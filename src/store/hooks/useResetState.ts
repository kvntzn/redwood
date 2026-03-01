import { doctorsApi } from '../apis/doctorsApi'
import { useAppDispatch } from '../hooks'
import { persistor } from '../store'

export const useResetState = () => {
  const dispatch = useAppDispatch()

  const clear = async () => {
    await persistor.purge()
    dispatch(doctorsApi.util.resetApiState())
  }

  return {
    clear,
  }
}
