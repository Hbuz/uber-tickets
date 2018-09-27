import * as React from 'react'
import { Link } from 'react-router-dom'
import eventPic from '../../lib/images/eventPic'
import Grid from '@material-ui/core/Grid'

export default function Events(props) {
  return (<div>
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <strong>{props.name}</strong>
      </Grid>
      

      <Grid item>
        <img width="300" height="150" src={eventPic} />
      </Grid>

      <Grid item>
        {props.description}
      </Grid>
    </Grid>
  </div>)
}

