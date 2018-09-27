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

  // handleSubmit = (event) => {
  //   this.props.editTicket()
  // }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log("STATE PRIMA DI ACTION: " + JSON.stringify(this.state))
    this.props.editTicket(this.props.match.params.idEvent,
      this.props.match.params.idTicket,
      this.selectTicket(this.props.tickets['tickets']),
      this.state)
    this.setState({
      price: 0,
      description: ''
    })
    // <Link to='/events/${this.props.selectedTicket.event.id}/tickets'>
    this.props.history.push(`/events/${this.props.match.params.idEvent}/tickets`)
  }

  handleChange = name => event => {
    console.log("NAME: " + name + "                 " + event.target.value)
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
    console.log("TICKETS??? " + JSON.stringify(tickets) + "   params: " + JSON.stringify(this.props.match.params))
    const ticketFound = tickets.filter((ticket) => ticket.id == this.props.match.params.idTicket)[0]
    console.log("FOUND " + JSON.stringify(ticketFound))
    return ticketFound
  }


  render() {
    const { classes, tickets } = this.props
    const selectedTicket = this.selectTicket(tickets['tickets'])

    return (
      <div>
        <div><h3>Editing ticket N.{selectedTicket.id} of {selectedTicket.event.name}</h3></div>
        <div>
          <TicketEditForm handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            classes={classes}
            selectedTicket={selectedTicket}
          />
        </div>
      </div>
    )
  }
})

const mapStateToProps = function (state) {
  return {
    tickets: state.tickets
  }
}

const mapDispatchToProps = { editTicket }

export default connect(mapStateToProps, mapDispatchToProps)(TicketEditFormContainer)