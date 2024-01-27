export const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export enum UserRole {
  Patient = 'Patient',
  Dentist = 'Dentist'
}

export interface Jwt {
  sub: string
  jti: string
  iat: string
  UserId: string
  IdNumber: string
  Email: string
  [roleKey]: string
  exp: number
  iss: string
  aud: string
}

export interface Token {
  token: string
}
