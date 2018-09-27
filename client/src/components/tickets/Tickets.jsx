import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

export default function Tickets(props) {
  const splitted = props.picture.split('\\')
  const ticketPic = require(`../../lib/images/${splitted[splitted.length -1]}`)
  return (
    <TableRow key={props.id}>
      <TableCell component="th" scope="row"><img src={ticketPic} alt="No image for this ticket" /></TableCell>
      <TableCell numeric>{props.price}</TableCell>
      <TableCell component="th" scope="row">{props.description}</TableCell>
    </TableRow>
  )
}