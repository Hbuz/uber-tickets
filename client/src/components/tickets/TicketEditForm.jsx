import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

export default class TicketEditForm extends PureComponent {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <div>
        <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="column">
                <TextField
                  id="standard-price"
                  label="Price"
                  className={this.props.classes.textField}
                  value={this.state.price}
                  type="number"
                  placeholder={this.props.selectedTicket && `${this.props.selectedTicket.price}`}
                  onChange={this.props.handleChange('price')}
                  margin="normal"
                />
                <TextField
                  id="standard-description"
                  label="Description"
                  className={this.props.classes.textField}
                  value={this.state.description}
                  placeholder={this.props.selectedTicket && this.props.selectedTicket.description}
                  onChange={this.props.handleChange('description')}
                  margin="normal"
                />
                <input type="file"
                  id="standard-picture"
                  accept="image/png, image/jpeg, image/jpg"
                  value={this.state.picture}
                  placeholder={this.props.selectedTicket && this.props.selectedTicket.picture}
                  onChange={this.props.handleChange('picture')}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button type="submit">SAVE TICKET</Button>
            </Grid>
          </Grid>
        </form>

        {this.props.selectedTicket &&
          <Link to={`/events/${this.props.selectedTicket.event.id}/tickets/${this.props.selectedTicket.id}/details`}>
            <Button>CANCEL</Button>
          </Link>
        }
      </div>)
  }
}