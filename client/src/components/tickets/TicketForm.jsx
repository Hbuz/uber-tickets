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


const TicketForm = withStyles(styles)(
  class extends PureComponent {

    state = {}

    render() {
      return (
        <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
          <TextField
            id="standard-price"
            label="Price"
            className={this.props.classes.textField}
            value={this.state.price}
            onChange={this.props.handleChange('price')}
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
         
          <button type="submit">CREATE TICKET</button>
        </form>
      )
    }
  })

export default TicketForm