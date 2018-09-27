import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ticketPic from '../../lib/images/football_ticket'

export default function Tickets(props) {

  return (
    <TableRow key={props.id}>
      <TableCell component="th" scope="row"><img src={ticketPic} alt="No image for this ticket" /></TableCell>
      <TableCell numeric>{props.price}</TableCell>
      <TableCell component="th" scope="row">{props.description}</TableCell>
    </TableRow>
  )
}