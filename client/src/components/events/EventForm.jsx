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


const EventForm = withStyles(styles)(
  class extends PureComponent {

    state = {}

    render() {
      return (
        <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
          <TextField
            id="standard-name"
            label="Price"
            className={this.props.classes.textField}
            value={this.state.price}
            onChange={this.props.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="standard-description"
            label="Description"
            className={this.props.classes.textField}
            value={this.state.description}
            onChange={this.props.handleChange('description')}
            margin="normal"
          />
          {/* pircture */}
          {/* start date */}
          {/* end date */}
          <button type="submit">CREATE EVENT</button>
        </form>
      )
    }
  })

export default EventForm