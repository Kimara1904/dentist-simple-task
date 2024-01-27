import { AppointmentResponse, PatientsAppointmentResponse } from './AppointmentModels'

export interface AppointmentItemProperties {
  appoint: AppointmentResponse | PatientsAppointmentResponse
}

export interface IdentifyFormProperties {
  onIdentify: () => void
  onSuccess: () => void
}
