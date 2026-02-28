export type Booking = {
  id: string
  date: string
  startTime: string
  endTime: string
  doctor: {
    id: string
    name: string
    timezone: string
  }
}
