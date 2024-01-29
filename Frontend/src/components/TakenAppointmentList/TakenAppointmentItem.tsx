import { TableCell, TableRow } from '@mui/material'

import { TakenAppointmentItemProperties } from '../../model/Properties'

const TakenAppointmentItem = (props: TakenAppointmentItemProperties) => {
  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        backgroundColor: 'white'
      }}
    >
      <TableCell align='left'>
        {new Date(props.item.start).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })}
      </TableCell>
      <TableCell align='center'>
        {new Date(props.item.start).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
      </TableCell>
      <TableCell align='right'>
        {new Date(props.item.end).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
      </TableCell>
    </TableRow>
  )
}

export default TakenAppointmentItem
