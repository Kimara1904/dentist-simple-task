import {
  AppointmentResponse,
  PatientsAppointmentResponse,
  TakenAppointmentResponse
} from './AppointmentModels'

export interface AppointmentItemProperties {
  appoint: AppointmentResponse | PatientsAppointmentResponse
}

export interface AppRouterProperties {
  onMakeAppointment: (message: string) => void
}

export interface MakeAppointmentProperties {
  onMakeAppointment: (message: string) => void
}

export interface AppointmentFormProperties {
  onMakeAppointment: (message: string) => void
}

export interface IdentifyFormProperties {
  onIdentify: () => void
  onSuccess: () => void
}

export interface TakenListProperites {
  takenDates: TakenAppointmentResponse[]
}
