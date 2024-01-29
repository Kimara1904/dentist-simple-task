import { ReactNode } from 'react'

import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

import { DailyAppointmentsProperties } from '../../model/Properties'
import AppointmentItem from './AppointmentItem'

const DailyAppointments = (props: DailyAppointmentsProperties) => {
  let content: ReactNode = null
  if (props.appoints.length === 0) {
    content = (
      <TableBody>
        <TableRow sx={{ backgroundColor: 'var(--cream_color)' }}>
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
        {props.appoints.map((appoint) => (
          <AppointmentItem
            key={appoint.id}
            appoint={appoint}
            onCancel={props.onCancel}
            onError={props.onError}
          />
        ))}
      </TableBody>
    )
  }

  return (
    <Table size='small' aria-label='a dense table'>
      <TableHead>
        <TableRow
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            backgroundColor: 'darkgreen'
          }}
        >
          <TableCell>ID</TableCell>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>JMBG</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Start</TableCell>
          <TableCell>End</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      {content}
    </Table>
  )
}

export default DailyAppointments
