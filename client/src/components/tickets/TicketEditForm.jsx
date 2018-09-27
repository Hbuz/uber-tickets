import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

export default class TicketEditForm extends PureComponent {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state) //this is passed from the container
  }

  // handleChange = (event) => {
  //   const { name, value } = event.target
  //   this.setState({
  //     [name]: value
  //   })
  // }


  //CHANGE TEXFILED STYLE!!!
  render() {
    return (
      <div>
        <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
          <TextField
            id="standard-price"
            label="Price"
            className={this.props.classes.textField}
            value={this.state.price}
            // parse={value => !value ? null : Number(value)}  //???
            type="number"
            placeholder={`${this.props.selectedTicket.price}`}
            onChange={this.props.handleChange('price')}
            margin="normal"
          />
          <TextField
            id="standard-description"
            label="Description"
            className={this.props.classes.textField}
            value={this.state.description}
            placeholder={this.props.selectedTicket.description}
            onChange={this.props.handleChange('description')}
            margin="normal"
          />
          {/* pircture */}

          <button type="submit">SAVE TICKET</button>
        </form>

        <Link to={`/events/${this.props.selectedTicket.event.id}/tickets`}>
          <Button>CANCEL</Button>
        </Link>
      </div>)
  }
}