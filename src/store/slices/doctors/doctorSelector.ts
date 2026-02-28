import { RootState } from '../../store'

export const useDoctorSelector = (state: RootState) => state.doctors.doctors
export const useDoctorByIdSelector = (state: RootState, id: string) =>
  state.doctors.doctors.find((doctor) => doctor.id === id)
