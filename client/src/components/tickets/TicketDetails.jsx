import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexWrap: 'wrap'
  }
})

const TicketsDetails = withStyles(styles)(
  class extends Component {
    render() {
      const { classes, tickets } = this.props
      const selectedTicket = tickets['tickets'].filter(t => t.id == this.props.match.params.idTicket)[0]
      const idEvent = this.props.match.params.idEvent
      console.log("SELECTED TICKET: " + JSON.stringify(selectedTicket))
      console.log("PARMA idEvent: "+idEvent)
      return (
        <div>
          <div>
            Ticket Detail
        </div>
        <div>
            Ticket from {selectedTicket.user.firstName} {selectedTicket.user.lastName} (eager relation)
        </div>
        <div>
           Risk
        </div>
          <div>Price: {selectedTicket.price}</div>
          <div>Description: {selectedTicket.description}</div>
          <div>
            {/* CommentsContainer */}
            Comments
        </div>
          <Link to={`/events/${idEvent}/tickets`}>
            <Button>BACK TO TICKETS</Button>
          </Link>
          <Link to='/events'>
            <Button>BACK TO EVENTS</Button>
          </Link>
        </div>
      )
    }
  }
)

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets
  }
}
export default connect(mapStateToProps)(TicketsDetails)