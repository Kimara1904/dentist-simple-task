import { UserRole } from '../model/TokenMoldels'

export const isIdentified = () => {
  return sessionStorage.getItem('token') !== null
}

export const isDentist = () => {
  return sessionStorage.getItem('role') === UserRole.Dentist
}

export const isPatient = () => {
  return sessionStorage.getItem('role') === UserRole.Patient
}
