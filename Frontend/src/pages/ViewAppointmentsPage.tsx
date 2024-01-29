import React, { useCallback, useEffect, useState } from 'react'

import {
  Alert,
  AlertColor,
  AlertTitle,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { isDentist, isPatient } from '../helper/TokenHelper'
import DailyAppointments from '../components/AppointmentList/DailyAppointments'
import {
  GetDailyAppointments,
  GetPatientsAppointments,
  GetWeeklyAppointments
} from '../services/AppointmentService'
import { AppointmentResponse, PatientsAppointmentResponse } from '../model/AppointmentModels'
import { ErrorData } from '../model/ErrorModels'
import PatientsAppointmentList from '../components/PatientsAppointments/PatientsAppointmentList'

const ViewAppointmentsPage = () => {
  const [dailyAppointments, setDailyAppointments] = useState<AppointmentResponse[]>([])
  const [weeklyAppointments, setWeeklyAppointments] = useState<
    Record<string, AppointmentResponse[]>
  >({})
  const [patientsAppointments, setPatientsAppointments] = useState<PatientsAppointmentResponse[]>(
    []
  )
  const [mode, setMode] = useState('daily')
  const [alertShow, setAlertShow] = useState({
    isShown: false,
    title: '',
    severity: '',
    message: ''
  })

  const IsDentist = isDentist()

  const getAppointments = useCallback(() => {
    if (IsDentist && mode === 'daily') {
      GetDailyAppointments()
        .then((response) => {
          setDailyAppointments(response.data)
        })
        .catch((error: AxiosError<ErrorData>) => {
          if (isAxiosError(error)) {
            setAlertShow(() => ({
              isShown: true,
              title: 'Error',
              severity: 'error',
              message: error.response?.data.Exception as string
            }))
          }
        })
    } else if (IsDentist && mode === 'weekly') {
      GetWeeklyAppointments()
        .then((response) => {
          setWeeklyAppointments(response.data)
        })
        .catch((error: AxiosError<ErrorData>) => {
          if (isAxiosError(error)) {
            setAlertShow(() => ({
              isShown: true,
              title: 'Error',
              severity: 'error',
              message: error.response?.data.Exception as string
            }))
          }
        })
    } else {
      GetPatientsAppointments()
        .then((response) => {
          setPatientsAppointments(response.data)
        })
        .catch((error: AxiosError<ErrorData>) => {
          if (isAxiosError(error)) {
            setAlertShow(() => ({
              isShown: true,
              title: 'Error',
              severity: 'error',
              message: error.response?.data.Exception as string
            }))
          }
        })
    }
  }, [IsDentist, mode])

  useEffect(() => {
    getAppointments()
  }, [getAppointments])

  const handleClickChangeMode = () => {
    if (mode === 'daily') {
      setMode('weekly')
    } else {
      setMode('daily')
    }
  }

  const handleCancelAppointment = (message: string) => {
    setAlertShow(() => ({
      isShown: true,
      title: 'Success',
      severity: 'success',
      message: message
    }))
    getAppointments()
  }

  const handleErrorCancel = (message: string) => {
    setAlertShow(() => ({
      isShown: true,
      title: 'Error',
      severity: 'error',
      message: message
    }))
  }

  return (
    <div>
      {alertShow.isShown && (
        <Alert
          className='alert'
          severity={alertShow.severity as AlertColor}
          onClose={() =>
            setAlertShow((pervState) => ({
              ...pervState,
              isShown: false
            }))
          }
        >
          <AlertTitle>{alertShow.title}</AlertTitle>
          {alertShow.message}
        </Alert>
      )}
      {isDentist() && (
        <div>
          <Button
            type='button'
            variant='contained'
            color='primary'
            style={{ marginTop: '16px', marginBottom: '16px', width: '100px' }}
            onClick={handleClickChangeMode}
          >
            {mode === 'daily' ? 'Weekly' : 'Daily'}
          </Button>

          {mode === 'daily' && (
            <TableContainer component={Paper}>
              <DailyAppointments
                appoints={dailyAppointments}
                onCancel={handleCancelAppointment}
                onError={handleErrorCancel}
              />
            </TableContainer>
          )}

          {mode === 'weekly' && (
            <TableContainer component={Paper}>
              {Object.entries(weeklyAppointments).map(([key, value]) => (
                <React.Fragment key={key}>
                  <Table size='small' aria-label='a dense table'>
                    <TableHead>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          backgroundColor: 'lightgreen'
                        }}
                      >
                        <TableCell align='left'>
                          {new Date(key).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                          })}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                  <DailyAppointments
                    appoints={value}
                    onCancel={handleCancelAppointment}
                    onError={handleErrorCancel}
                  />
                </React.Fragment>
              ))}
            </TableContainer>
          )}
        </div>
      )}

      {isPatient() && (
        <PatientsAppointmentList
          appoints={patientsAppointments}
          onCancel={handleCancelAppointment}
          onError={handleErrorCancel}
        />
      )}
    </div>
  )
}

export default ViewAppointmentsPage
