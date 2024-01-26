import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './ServiceConfig'
import {
  AppointmentResponse,
  AppointmentWithJmbgRequest,
  AppointmentWithoutJmbgRequest,
  PatientsAppointmentResponse,
  TakenAppointmentResponse,
  WeeklyAppointmentResponse
} from '../model/AppointmentModels'

const url = `${baseUrl}/api/dentist`

export const GetWeeklyAppointments = async (): Promise<
  AxiosResponse<WeeklyAppointmentResponse>
> => {
  return axios.get<WeeklyAppointmentResponse>(`${url}/week`)
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

export const CancelAppointment = async (id: number): Promise<AxiosResponse<string>> => {
  return axios.put<string>(`${url}/cancel/${id}`)
}