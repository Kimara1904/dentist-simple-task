import { useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TableCell,
  TableRow
} from '@mui/material'

import { PatientsAppointmentItemProperties } from '../../model/Properties'
import { CancelAppointment } from '../../services/AppointmentService'
import { ErrorData } from '../../model/ErrorModels'

const PatientsAppointmentItem = (props: PatientsAppointmentItemProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleCancelAppointment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    CancelAppointment(props.appoint.id)
      .then((response) => {
        props.onCancel(response.data)
        handleCloseDialog()
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          props.onError(error.response?.data.Exception as string)
        }
      })
  }

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        backgroundColor: 'white'
      }}
    >
      <TableCell>{props.appoint.id}</TableCell>
      <TableCell>{props.appoint.descriptionOfAppointment}</TableCell>
      <TableCell align='left'>
        {new Date(props.appoint.start).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })}
      </TableCell>
      <TableCell>
        {new Date(props.appoint.start).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
      </TableCell>
      <TableCell>
        {new Date(props.appoint.end).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
      </TableCell>
      <TableCell>
        <Button variant='contained' color='error' onClick={handleOpenDialog}>
          Cancel
        </Button>
      </TableCell>

      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {'Are you sure you want to cancel appointment?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelAppointment}>Yes</Button>
            <Button onClick={handleCloseDialog}>No</Button>
          </DialogActions>
        </Dialog>
      )}
    </TableRow>
  )
}

export default PatientsAppointmentItem
