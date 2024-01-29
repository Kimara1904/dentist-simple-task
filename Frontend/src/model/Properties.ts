import {
  AppointmentResponse,
  PatientsAppointmentResponse,
  TakenAppointmentResponse
} from './AppointmentModels'

export interface AppointmentItemProperties {
  appoint: AppointmentResponse
  onCancel: (message: string) => void
  onError: (message: string) => void
}

export interface DailyAppointmentsProperties {
  appoints: AppointmentResponse[]
  onCancel: (message: string) => void
  onError: (message: string) => void
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

export interface TakenAppointmentItemProperties {
  item: TakenAppointmentResponse
}

export interface PatientsAppointmentItemProperties {
  appoint: PatientsAppointmentResponse
  onCancel: (message: string) => void
  onError: (message: string) => void
}

export interface PatientsAppointmentListProperties {
  appoints: PatientsAppointmentResponse[]
  onCancel: (message: string) => void
  onError: (message: string) => void
}
