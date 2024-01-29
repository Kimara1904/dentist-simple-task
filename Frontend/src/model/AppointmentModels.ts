import { PatientRequest, PatientResponse } from './PatientModels'

export interface AppointmentWithJmbgRequest {
  descriptionOfAppointment: string
  start: string
  duration: number
}

export interface AppointmentWithoutJmbgRequest {
  newPatient: PatientRequest
  newAppoint: AppointmentWithJmbgRequest
}

export interface AppointmentWithJmbgForDentistRequest {
  jmbg: string
  newAppoint: AppointmentWithJmbgRequest
}

export interface AppointmentResponse {
  id: number
  descriptionOfAppointment: string
  start: string
  end: string
  patient: PatientResponse
}

export interface PatientsAppointmentResponse {
  id: number
  descriptionOfAppointment: string
  start: string
  end: string
}

export interface TakenAppointmentResponse {
  id: number
  start: string
  end: string
}
