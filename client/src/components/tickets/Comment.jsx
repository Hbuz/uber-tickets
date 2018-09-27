import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

export default function Comment(props) {
  // console.log(JSON.stringify(props))
  return (<div>

    <Grid container spacing={16}>
      <Grid item>
        <Typography variant="body2" gutterBottom>{props.user.firstName}: </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" gutterBottom>{props.text}</Typography>
      </Grid>
    </Grid>

  </div>)
}