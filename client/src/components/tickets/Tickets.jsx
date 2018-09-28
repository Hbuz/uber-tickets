import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

export default function Tickets(props) {
  const splitted = props.picture.split('\\')
  const ticketPic = require(`../../lib/images/${splitted[splitted.length - 1]}`)
  return (
    <TableRow>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <TableCell component="th" scope="row"><img width="230" height="150" src={ticketPic} alt="No image for this ticket" /></TableCell>
        </Grid>
        <Grid item xs={2}>
          <TableCell numeric>{props.price}</TableCell>
        </Grid>
        <Grid item xs={1}>
          <TableCell >{props.description}</TableCell>
        </Grid>
      </Grid >
    </TableRow>
  )
}