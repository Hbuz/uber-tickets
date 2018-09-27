import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
  container: {
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
})


const CommentForm = withStyles(styles)(
  class extends PureComponent {

    state = {}

    render() {
      return (

        <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
          <Grid container direction="column">
            <Grid item>
              <TextField
                id="standard-text"
                label="Text"
                className={this.props.classes.textField}
                value={this.state.text}
                onChange={this.props.handleChange('text')}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button type="submit">ADD COMMENT</Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  })

export default CommentForm