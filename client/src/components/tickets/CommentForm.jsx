import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

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
          <TextField
            id="standard-text"
            label="Text"
            className={this.props.classes.textField}
            value={this.state.text}
            onChange={this.props.handleChange('text')}
            margin="normal"
          />
         
          <button type="submit">ADD COMMENT</button>
        </form>
      )
    }
  })

export default CommentForm