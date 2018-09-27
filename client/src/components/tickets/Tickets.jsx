import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ticketPic from '../../lib/images/football_ticket'

export default function Tickets(props) {

  return (
    // <div>
    //   <Grid container spacing={40}  direction="row"
    // justify="space-between"
    // >
    //     <Grid item >
    //       {props.picture}
    //     </Grid>
    //     <Grid item>
    //       <strong>{props.price}</strong>
    //     </Grid>
    //     <Grid item>
    //       {props.description}
    //     </Grid>
    //   </Grid>
    // </div>
    <TableRow key={props.id}>
      {/* <TableCell component="th" scope="row">{props.picture}</TableCell> */}
      <TableCell component="th" scope="row"><img src={ticketPic} alt="No image for this ticket"/></TableCell>
      <TableCell numeric>{props.price}</TableCell>
      <TableCell component="th" scope="row">{props.description}</TableCell>
    
      </TableRow>

  )
}