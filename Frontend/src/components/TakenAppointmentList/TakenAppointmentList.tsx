import { ReactNode, useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import {
  Alert,
  AlertTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { TakenAppointmentResponse } from '../../model/AppointmentModels'
import { GetTakenAppointments } from '../../services/AppointmentService'
import { ErrorData } from '../../model/ErrorModels'
import TakenAppointmentItem from './TakenAppointmentItem'

const TakenAppointmentList = () => {
  const [takenAppointments, setTakenAppointments] = useState<TakenAppointmentResponse[]>([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    GetTakenAppointments()
      .then((response) => setTakenAppointments(response.data))
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setIsError(true)
          setErrorMessage(error.response?.data.Exception as string)
        }
      })
  }, [])

  let content: ReactNode = null
  if (takenAppointments.length === 0) {
    content = (
      <TableBody>
        <TableRow sx={{ backgroundColor: 'white' }}>
          <TableCell align='center' colSpan={6}>
            <Typography variant='body2' align='center' style={{ marginBottom: '16px' }}>
              There is no orders
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    content = (
      <TableBody>
        {takenAppointments.map((appointment) => (
          <TakenAppointmentItem key={appointment.id} item={appointment} />
        ))}
      </TableBody>
    )
  }

  return (
    <div>
      {isError && (
        <Alert className='alert' severity='error' onClose={() => setIsError(false)}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <TableHead sx={{ backgroundColor: 'darkgreen' }}>
            <TableRow>
              <TableCell align='left' sx={{ color: 'white' }}>
                Date
              </TableCell>
              <TableCell align='right' sx={{ color: 'white' }}>
                Start
              </TableCell>
              <TableCell align='right' sx={{ color: 'white' }}>
                End
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {content}
      </TableContainer>
    </div>
  )
}

export default TakenAppointmentList
