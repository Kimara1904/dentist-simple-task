import { createRef, useState } from 'react'

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import { AxiosError, isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import styles from './AppointmentForm.module.css'
import { isDentist, isIdentified, isPatient } from '../../helper/TokenHelper'
import {
  MakeAnAppointmentByDentistJmbg,
  MakeAnAppointmentByNewPatient,
  MakeAnAppointmentByOldPatient
} from '../../services/AppointmentService'
import {
  AppointmentWithJmbgForDentistRequest,
  AppointmentWithJmbgRequest,
  AppointmentWithoutJmbgRequest
} from '../../model/AppointmentModels'
import { AppointmentFormProperties } from '../../model/Properties'
import { ErrorData, ValidationErrorData } from '../../model/ErrorModels'
import { PatientRequest } from '../../model/PatientModels'
import { Identify } from '../../services/IdentificationService'
import { Jwt, roleKey } from '../../model/TokenMoldels'

const AppointmentForm = (props: AppointmentFormProperties) => {
  dayjs.extend(updateLocale)
  dayjs.updateLocale('en', {
    weekStart: 1
  })
  const [isDescriptionError, setIsDescriptionError] = useState(false)
  const [duration, setDuration] = useState('30')
  const [appointDate, setAppointDate] = useState(dayjs())
  const [isDateError, setIsDateError] = useState(false)
  const [patient, setPatient] = useState('new')
  const [patientError, setPatientError] = useState({
    isFirstNameError: false,
    isLastNameError: false,
    isEmailError: false
  })
  const [isJmbgError, setIsJmbgError] = useState(false)
  const [jmbgErrorMessage, setJmbgErrorMessage] = useState('')
  const [isCreateError, setIsCreateError] = useState(false)
  const [createErrorMessage, setCreateErrorMessage] = useState('')

  const descriptionRef = createRef<HTMLInputElement>()
  const firstNameRef = createRef<HTMLInputElement>()
  const lastNameRef = createRef<HTMLInputElement>()
  const emailRef = createRef<HTMLInputElement>()
  const jmbgRef = createRef<HTMLInputElement>()

  const navigate = useNavigate()

  const handleBlurDescription = () => {
    if (descriptionRef.current?.value.trim().length === 0) {
      setIsDescriptionError(true)
    }
  }

  const handleBlurFirstName = () => {
    if (firstNameRef.current?.value.trim().length === 0) {
      setPatientError((prevErrors) => ({
        ...prevErrors,
        isFirstNameError: true
      }))
    }
  }

  const handleBlurLastName = () => {
    if (lastNameRef.current?.value.trim().length === 0) {
      setPatientError((prevErrors) => ({
        ...prevErrors,
        isLastNameError: true
      }))
    }
  }

  const handleBlurEmail = () => {
    if (emailRef.current?.value.trim().length === 0) {
      setPatientError((prevErrors) => ({
        ...prevErrors,
        isEmailError: true
      }))
    }
  }

  const handleBlurJmbg = () => {
    const enteredJmbg = jmbgRef.current?.value.trim() as string

    if (enteredJmbg.length === 0) {
      setIsJmbgError(true)
      setJmbgErrorMessage('Jmbg is required')
    } else if (!/^\d+$/.test(enteredJmbg)) {
      setIsJmbgError(true)
      setJmbgErrorMessage('Jmbg must contain only numbers')
    }
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setDuration(event.target.value)
  }

  const handleClickChangePatient = () => {
    if (patient === 'new') {
      setPatient('old')
    } else {
      setPatient('new')
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (descriptionRef.current?.value.trim().length === 0) {
      setIsDescriptionError(true)
      return
    }

    if (appointDate === null) {
      setIsDateError(true)
      return
    }

    if (!isIdentified() || isDentist()) {
      if (patient === 'new') {
        if (firstNameRef.current?.value.trim().length === 0) {
          setPatientError((prevErrors) => ({
            ...prevErrors,
            isFirstNameError: true
          }))
          return
        }

        if (lastNameRef.current?.value.trim().length === 0) {
          setPatientError((prevErrors) => ({
            ...prevErrors,
            isLastNameError: true
          }))
          return
        }

        if (emailRef.current?.value.trim().length === 0) {
          setPatientError((prevErrors) => ({
            ...prevErrors,
            isEmailError: true
          }))
          return
        }
      }

      const enteredJmbg = jmbgRef.current?.value.trim() as string

      if (enteredJmbg.length === 0) {
        setIsJmbgError(true)
        setJmbgErrorMessage('Jmbg is required')
        return
      } else if (!/^\d+$/.test(enteredJmbg)) {
        setIsJmbgError(true)
        setJmbgErrorMessage('Jmbg must contain only numbers')
        return
      }
    }

    const staticRequest: AppointmentWithJmbgRequest = {
      descriptionOfAppointment: descriptionRef.current?.value as string,
      start: appointDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      duration: parseInt(duration)
    }

    if (isPatient()) {
      MakeAnAppointmentByOldPatient(staticRequest)
        .then((response) => {
          props.onMakeAppointment(response.data)
          navigate('/appoint-view')
        })
        .catch((error: AxiosError<ErrorData | ValidationErrorData>) => {
          if (isAxiosError(error)) {
            const errorData = error.response?.data
            if (errorData && 'Exception' in errorData) {
              setIsCreateError(true)
              setCreateErrorMessage(errorData.Exception)
            } else if (errorData && 'errors' in errorData) {
              setIsCreateError(true)
              setCreateErrorMessage(
                JSON.stringify((error.response?.data as ValidationErrorData).errors, null, 2)
                  .replace(/[\\[\]{}"]/g, '')
                  .replace(/,/g, '')
              )
            }
          }
        })
    } else if (!isIdentified()) {
      if (patient === 'new') {
        const newPatientInfo: PatientRequest = {
          firstName: firstNameRef.current?.value as string,
          lastName: lastNameRef.current?.value as string,
          email: emailRef.current?.value as string,
          JMBG: jmbgRef.current?.value as string
        }

        const reqest: AppointmentWithoutJmbgRequest = {
          newAppoint: staticRequest,
          newPatient: newPatientInfo
        }

        MakeAnAppointmentByNewPatient(reqest)
          .then((response) => {
            props.onMakeAppointment(
              response.data + '. You can identify yourself by JMBG to see your appointments.'
            )
            navigate('/appoint-view')
          })
          .catch((error: AxiosError<ErrorData | ValidationErrorData>) => {
            if (isAxiosError(error)) {
              const errorData = error.response?.data
              if (errorData && 'Exception' in errorData) {
                setIsCreateError(true)
                setCreateErrorMessage(errorData.Exception)
              } else if (errorData && 'errors' in errorData) {
                setIsCreateError(true)
                setCreateErrorMessage(
                  JSON.stringify((error.response?.data as ValidationErrorData).errors, null, 2)
                    .replace(/[\\[\]{}"]/g, '')
                    .replace(/,/g, '')
                )
              }
            }
          })
      } else {
        Identify(jmbgRef.current?.value as string)
          .then((response) => {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('role', jwtDecode<Jwt>(response.data.token)[roleKey])

            MakeAnAppointmentByOldPatient(staticRequest)
              .then((response) => {
                props.onMakeAppointment(response.data)
                navigate('/appoint-view')
              })
              .catch((error: AxiosError<ErrorData | ValidationErrorData>) => {
                if (isAxiosError(error)) {
                  const errorData = error.response?.data
                  if (errorData && 'Exception' in errorData) {
                    setIsCreateError(true)
                    setCreateErrorMessage(errorData.Exception)
                  } else if (errorData && 'errors' in errorData) {
                    setIsCreateError(true)
                    setCreateErrorMessage(
                      JSON.stringify((error.response?.data as ValidationErrorData).errors, null, 2)
                        .replace(/[\\[\]{}"]/g, '')
                        .replace(/,/g, '')
                    )
                  }
                }
              })
          })
          .catch((error: AxiosError<ErrorData>) => {
            if (isAxiosError(error)) {
              setIsCreateError(true)
              setCreateErrorMessage(error.response?.data.Exception as string)
            }
          })
      }
    } else if (isDentist()) {
      if (patient === 'new') {
        const newPatientInfo: PatientRequest = {
          firstName: firstNameRef.current?.value as string,
          lastName: lastNameRef.current?.value as string,
          email: emailRef.current?.value as string,
          JMBG: jmbgRef.current?.value as string
        }

        const reqest: AppointmentWithoutJmbgRequest = {
          newAppoint: staticRequest,
          newPatient: newPatientInfo
        }

        MakeAnAppointmentByNewPatient(reqest)
          .then((response) => {
            props.onMakeAppointment(response.data)
            navigate('/appoint-view')
          })
          .catch((error: AxiosError<ErrorData | ValidationErrorData>) => {
            if (isAxiosError(error)) {
              const errorData = error.response?.data
              if (errorData && 'Exception' in errorData) {
                setIsCreateError(true)
                setCreateErrorMessage(errorData.Exception)
              } else if (errorData && 'errors' in errorData) {
                setIsCreateError(true)
                setCreateErrorMessage(
                  JSON.stringify((error.response?.data as ValidationErrorData).errors, null, 2)
                    .replace(/[\\[\]{}"]/g, '')
                    .replace(/,/g, '')
                )
              }
            }
          })
      } else {
        const reqest: AppointmentWithJmbgForDentistRequest = {
          jmbg: jmbgRef.current?.value as string,
          newAppoint: staticRequest
        }

        MakeAnAppointmentByDentistJmbg(reqest)
          .then((response) => {
            props.onMakeAppointment(response.data)
            navigate('/appoint-view')
          })
          .catch((error: AxiosError<ErrorData | ValidationErrorData>) => {
            if (isAxiosError(error)) {
              const errorData = error.response?.data
              if (errorData && 'Exception' in errorData) {
                setIsCreateError(true)
                setCreateErrorMessage(errorData.Exception)
              } else if (errorData && 'errors' in errorData) {
                setIsCreateError(true)
                setCreateErrorMessage(
                  JSON.stringify((error.response?.data as ValidationErrorData).errors, null, 2)
                    .replace(/[\\[\]{}"]/g, '')
                    .replace(/,/g, '')
                )
              }
            }
          })
      }
    }
  }

  return (
    <div className={styles.make_appointment_form}>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id='ArticleDescription'
            multiline
            rows={4}
            type='text'
            label='Description'
            variant='outlined'
            error={isDescriptionError}
            helperText={isDescriptionError && 'Descriptor is required'}
            inputRef={descriptionRef}
            onBlur={handleBlurDescription}
            onFocus={() => setIsDescriptionError(false)}
            style={{ marginBottom: '16px' }}
          />
          <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='duration-label'>Duration</InputLabel>
            <Select
              labelId='duration-label'
              id='duration'
              value={duration}
              onChange={handleChangeSelect}
            >
              <MenuItem value={30}>Half hour</MenuItem>
              <MenuItem value={60}>One hour</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography variant='h6' color='primary' style={{ marginBottom: '16px' }}>
            Start
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              value={appointDate}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setAppointDate(newValue)
                  setIsDateError(false)
                }
              }}
              className={styles.calendar}
              orientation='landscape'
              slotProps={{ actionBar: { actions: ['clear'] } }}
            />
          </LocalizationProvider>

          {isDateError && (
            <Typography variant='body2' color='error' style={{ marginBottom: '16px' }}>
              Date is required
            </Typography>
          )}
        </div>
        {(!isIdentified() || isDentist()) && (
          <div>
            <Button
              type='button'
              variant='contained'
              color='primary'
              style={{ marginTop: '16px', marginBottom: '16px', width: '100px' }}
              onClick={handleClickChangePatient}
            >
              {patient === 'new' ? 'Old Patient' : 'New Patient'}
            </Button>
            {patient === 'new' && (
              <div>
                <div>
                  <TextField
                    id='RegisterFirstName'
                    type='text'
                    label='First name'
                    variant='outlined'
                    error={patientError.isFirstNameError}
                    helperText={patientError.isFirstNameError && 'First name is required'}
                    inputRef={firstNameRef}
                    onBlur={handleBlurFirstName}
                    onFocus={() =>
                      setPatientError((prevErrors) => ({
                        ...prevErrors,
                        isFirstNameError: false
                      }))
                    }
                    className={styles.text_field}
                    style={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id='RegisterLastName'
                    type='text'
                    label='Last name'
                    variant='outlined'
                    error={patientError.isLastNameError}
                    helperText={patientError.isLastNameError && 'Last name is required'}
                    inputRef={lastNameRef}
                    onBlur={handleBlurLastName}
                    onFocus={() =>
                      setPatientError((prevErrors) => ({
                        ...prevErrors,
                        isLastNameError: false
                      }))
                    }
                    className={styles.text_field}
                    style={{ marginBottom: '16px' }}
                  />
                </div>
                <div>
                  <TextField
                    id='RegisterEmail'
                    type='email'
                    label='Email'
                    variant='outlined'
                    error={patientError.isEmailError}
                    helperText={patientError.isEmailError && 'Email is required'}
                    inputRef={emailRef}
                    onBlur={handleBlurEmail}
                    onFocus={() =>
                      setPatientError((prevErrors) => ({
                        ...prevErrors,
                        isEmailError: false
                      }))
                    }
                    className={styles.text_field}
                    style={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id='Jmbg'
                    type='text'
                    label='JMBG'
                    variant='outlined'
                    error={isJmbgError}
                    helperText={isJmbgError && jmbgErrorMessage}
                    inputRef={jmbgRef}
                    onBlur={handleBlurJmbg}
                    onFocus={() => {
                      setIsJmbgError(false)
                      setJmbgErrorMessage('')
                    }}
                    style={{ marginBottom: '16px' }}
                    inputProps={{ maxLength: 13, minLength: 13 }}
                  />
                </div>
              </div>
            )}
            {patient === 'old' && (
              <div>
                <TextField
                  id='Jmbg'
                  type='text'
                  label='JMBG'
                  variant='outlined'
                  error={isJmbgError}
                  helperText={isJmbgError && jmbgErrorMessage}
                  inputRef={jmbgRef}
                  onBlur={handleBlurJmbg}
                  onFocus={() => {
                    setIsJmbgError(false)
                    setJmbgErrorMessage('')
                  }}
                  style={{ marginBottom: '16px' }}
                  inputProps={{ maxLength: 13, minLength: 13 }}
                />
              </div>
            )}
          </div>
        )}

        {isCreateError && (
          <div style={{ marginBottom: '16px' }}>
            <pre style={{ textAlign: 'left', color: 'red' }}>{createErrorMessage}</pre>
          </div>
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          style={{ marginTop: '16px', marginBottom: '16px', width: '200px' }}
        >
          Make new appointment
        </Button>
      </form>
    </div>
  )
}

export default AppointmentForm
