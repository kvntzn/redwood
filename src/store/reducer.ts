import { combineReducers } from '@reduxjs/toolkit'
import { doctorsApi } from './apis/doctorsApi'
import bookingReducer from './slices/booking/bookingSlice'
import doctorsReducer from './slices/doctors/doctorSlice'

const rootReducer = combineReducers({
  // Add the generated reducer as a specific top-level slice
  [doctorsApi.reducerPath]: doctorsApi.reducer,
  booking: bookingReducer,
  doctors: doctorsReducer,
})

export default rootReducer
