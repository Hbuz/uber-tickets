import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { createComment, loadTickets } from '../../actions/tickets'

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

    componentDidMount() {
      const { idEvent } = this.props.match.params
      this.props.loadTickets(idEvent)
    }

    handleSubmit = (event) => {
      console.log("LO STATE: " + JSON.stringify(this.props.match.params))
      console.log("LO STATE: " + this.props.match.params.idTicket)
      this.props.createComment(this.props.match.params.idEvent, this.props.match.params.idTicket, this.state)  //Primo param?
      this.setState({
        text: '',
      })
      // event.preventDefault()
    }

    handleChange = text => event => {
      // console.log("NAME: "+text+"                 "+event.target.value)
      this.setState({
        [text]: event.target.value,
      })
    }


    calculateRisk(selectedTicket, tickets) {
      let risk = 0
      //RISK 1
      risk = tickets ? tickets.filter(ticket => ticket.user.id == selectedTicket.id).length === 1 ? 10 : 0 : 0
      // console.log("RISK 1: " + risk)
      //RISK 2
      const averagePrice = this.getAveragePrice(tickets)
      // console.log("AVERAGE PRICE: " + averagePrice)
      const percentageDiff = Math.abs(100 - (selectedTicket.price * 100) / averagePrice)
      // console.log("PERCENTAGE " + percentageDiff)
      risk += selectedTicket.price < averagePrice ? percentageDiff : percentageDiff > 10 ? -10 : -percentageDiff
      // console.log("RISK 2: " + risk)
      //RISK 3
      console.log("TIMESTAMP CREATED AT: " + selectedTicket.createdAt + "    type: " + typeof selectedTicket.createdAt)
      const hours = selectedTicket.createdAt? new Date(selectedTicket.createdAt.slice(0, -1)).getHours() : 0  //Removed final Z with slice
      console.log("HOURS: "+hours)
      console.log("PRIMA DI HOURS: "+risk)
      risk += hours>=9 && hours <=17 ? -10 : 10
      console.log("DOPO DI HOURS: "+risk)
      //RISK 4
      risk += selectedTicket.comments ? selectedTicket.comments.length > 3 ? 5 : 0 : 0
      // console.log("RISK 4: " + risk)
      if (risk < 5) {
        return 5
      } else if (risk > 95) {
        return 95
      } else {
        return risk
      }
    }

    getAveragePrice(tickets) {
      return tickets ? tickets.reduce((total, ticket) => total + ticket.price, 0) / tickets.length : 0
    }


    render() {
      const { classes, tickets } = this.props
      const selectedTicket = tickets['tickets'] ? tickets['tickets'].filter(t => t.id == this.props.match.params.idTicket)[0] : ''
      const idEvent = this.props.match.params.idEvent
      // console.log("SELECTED TICKET: " + JSON.stringify(selectedTicket))
      // console.log("PARMA idEvent: " + idEvent)
      return (
        <div>
          <div>
            Ticket Detail
        </div>
          <div>
            Ticket from {selectedTicket.user &&
              selectedTicket.user.firstName} {selectedTicket.user &&
                selectedTicket.user.lastName} (eager relation)
        </div>
          <div>
            We calculated that the risk of this ticket being a fraud is {this.calculateRisk(selectedTicket, tickets['tickets'])}%
        </div>
          <div>Price: {selectedTicket.price}</div>
          <div>Description: {selectedTicket.description}</div>
          <div>
            {selectedTicket && selectedTicket.comments &&
              selectedTicket.comments.map(comment =>
                <div key={comment.id}><Comment {...comment} /></div>
              )
            }
          </div>
          <div>
            <CommentForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
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
    tickets: state.tickets,
  }
}

const mapDispatchToProps = { createComment, loadTickets }

export default connect(mapStateToProps, mapDispatchToProps)(TicketsDetails)