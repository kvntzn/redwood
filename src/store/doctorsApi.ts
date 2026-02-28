import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DoctorAvailability } from '../types/DoctorAvailability'
import { Doctor } from '../types/Doctor'
import { transformDoctorsResponse } from '../helpers/reduxHelper'

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json',
  }),
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => '',
      transformResponse: (response: DoctorAvailability[]) =>
        transformDoctorsResponse(response),
    }),
  }),
})

export const { useGetDoctorsQuery } = doctorsApi
