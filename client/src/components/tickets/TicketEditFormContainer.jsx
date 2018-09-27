import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TicketEditForm from './TicketEditForm'
import { editTicket } from '../../actions/tickets'
import { connect } from 'react-redux'

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



const TicketEditFormContainer = withStyles(styles)(class extends PureComponent {

  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.editTicket(this.props.match.params.idEvent,
      this.props.match.params.idTicket,
      this.selectTicket(this.props.tickets['tickets']),
      this.state)
    this.setState({
      price: 0,
      description: ''
    })
    this.props.currentUser &&
      this.props.history.push(`/events/${this.props.match.params.idEvent}/tickets`)
  }

  handleChange = name => event => {
    name === 'price' ?
      this.setState({
        [name]: Number(event.target.value)
      })
      :
      this.setState({
        [name]: event.target.value
      })
  }

  selectTicket = (tickets) => {
    const ticketFound = tickets && tickets.filter((ticket) => ticket.id == this.props.match.params.idTicket)[0]
    return ticketFound
  }


  render() {
    const { classes, tickets } = this.props
    const selectedTicket = this.selectTicket(tickets['tickets'])

    return (
      <div>
        {selectedTicket &&
          <div>
            <div><h3>Editing ticket N.{selectedTicket.id} of {selectedTicket.event.name}</h3></div>
            <div>
              {!this.props.currentUser && this.state.description === '' &&
                <span style={{ color: 'red' }}>You have to login to edit a ticket!</span>}
              {this.props.currentUser && this.props.currentUser.id === selectedTicket.user.id &&
                <span style={{ color: 'red' }}>You have to be the author of the ticket!</span>}
              <TicketEditForm handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                classes={classes}
                selectedTicket={selectedTicket}
              />
            </div>
          </div>
        }
      </div>
    )
  }
})

const mapStateToProps = function (state) {
  return {
    tickets: state.tickets,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { editTicket }

export default connect(mapStateToProps, mapDispatchToProps)(TicketEditFormContainer)