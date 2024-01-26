export interface PatientRequest {
  firstName: string
  lastName: string
  email: string
  JMBG: string
}

export interface PatientResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  JMBG: string
}
