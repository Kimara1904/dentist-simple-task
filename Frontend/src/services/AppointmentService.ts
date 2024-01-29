import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './ServiceConfig'
import {
  AppointmentResponse,
  AppointmentWithJmbgForDentistRequest,
  AppointmentWithJmbgRequest,
  AppointmentWithoutJmbgRequest,
  PatientsAppointmentResponse,
  TakenAppointmentResponse
} from '../model/AppointmentModels'

const url = `${baseUrl}/api/dentist`

export const GetWeeklyAppointments = async (): Promise<
  AxiosResponse<Record<string, AppointmentResponse[]>>
> => {
  return axios.get<Record<string, AppointmentResponse[]>>(`${url}/week`)
}

export const GetDailyAppointments = async (): Promise<AxiosResponse<AppointmentResponse[]>> => {
  return axios.get<AppointmentResponse[]>(`${url}/day`)
}

export const GetPatientsAppointments = async (): Promise<
  AxiosResponse<PatientsAppointmentResponse[]>
> => {
  return axios.get<PatientsAppointmentResponse[]>(`${url}/patients-appoint`)
}

export const GetTakenAppointments = async (): Promise<
  AxiosResponse<TakenAppointmentResponse[]>
> => {
  return axios.get<AppointmentResponse[]>(`${url}/taken`)
}

export const MakeAnAppointmentByOldPatient = async (
  request: AppointmentWithJmbgRequest
): Promise<AxiosResponse<string>> => {
  return axios.post<string>(`${url}/appoint-with-jmbg`, request)
}

export const MakeAnAppointmentByNewPatient = async (
  request: AppointmentWithoutJmbgRequest
): Promise<AxiosResponse<string>> => {
  return axios.post<string>(`${url}/appoint-without-jmbg`, request)
}

export const MakeAnAppointmentByDentistJmbg = async (
  request: AppointmentWithJmbgForDentistRequest
): Promise<AxiosResponse<string>> => {
  return axios.post<string>(`${url}/appoint-with-jmbg-dentist`, request)
}

export const CancelAppointment = async (id: number): Promise<AxiosResponse<string>> => {
  return axios.put<string>(`${url}/cancel/${id}`)
}
