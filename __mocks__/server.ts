import { setupServer } from 'msw/node'
import { setupDoctorsHandler } from './handlers/doctorsHandler'

export const server = setupServer(...setupDoctorsHandler())
