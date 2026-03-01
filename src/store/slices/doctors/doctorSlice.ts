import { createSlice } from '@reduxjs/toolkit'
import { doctorsApi } from '../../apis/doctorsApi'
import { DoctorsState } from '../../../types/Slices'

const initialState: DoctorsState = {
  doctors: [],
}

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      doctorsApi.endpoints.getDoctors.matchFulfilled,
      (state, { payload }) => {
        state.doctors = payload
      }
    )
  },
})

const { reducer } = doctorSlice
export default reducer
