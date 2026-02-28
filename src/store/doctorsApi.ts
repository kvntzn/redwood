import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DoctorAvailability } from '../types/DoctorAvailability'
import { Doctor } from '../types/Doctor'

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json',
  }),
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => '',
      transformResponse: (response: DoctorAvailability[]) => {
        let doctors: Doctor[] = []

        for (const availability of response) {
          const doctor = doctors.find((d) => d.name === availability.name)

          if (!doctor) {
            doctors.push({
              id: availability.name.toLowerCase().replace(/\s/g, '-'),
              name: availability.name,
              timezone: availability.timezone,
            })
          }
        }

        return doctors
      },
    }),
  }),
})

export const { useGetDoctorsQuery } = doctorsApi
