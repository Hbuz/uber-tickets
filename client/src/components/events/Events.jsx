import * as React from 'react'
import Grid from '@material-ui/core/Grid'

export default function Events(props) {
  const splitted = props.picture.split('\\')
  const eventPic = require(`../../lib/images/${splitted[splitted.length -1]}`)
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

