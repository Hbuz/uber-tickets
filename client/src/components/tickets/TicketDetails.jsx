import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Comment from './Comment'
import CommentForm from './CommentForm'
import { loadTickets } from '../../actions/tickets'
import { createComment, loadComments } from '../../actions/comments'
import ticketPic from '../../lib/images/football_ticket'

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
      const { idEvent, idTicket } = this.props.match.params
      this.props.loadTickets(idEvent)
      console.log("LOADED TICETS: " + JSON.stringify(this.props.match.params))
      this.props.loadComments(idEvent, idTicket)
      console.log("LOADED COMMENTS")
    }

    handleSubmit = (event) => {
      event.preventDefault()
      // console.log("LO STATE: " + JSON.stringify(this.props.match.params))
      // console.log("LO STATE: " + this.props.match.params.idTicket)
      this.props.createComment(this.props.match.params.idEvent, this.props.match.params.idTicket, this.state)  //Primo param?
      this.setState({
        text: ''
      })
    }

    handleChange = text => event => {
      console.log("NAME oooooooooooooooooooooooooooooooooooooooooooooooooo: " + text + "                 " + event.target.value)
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
      // console.log("TIMESTAMP CREATED AT: " + selectedTicket.createdAt + "    type: " + typeof selectedTicket.createdAt)
      const hours = selectedTicket.createdAt ? new Date(selectedTicket.createdAt.slice(0, -1)).getHours() : 0  //Removed final Z with slice
      // console.log("HOURS: "+hours)
      // console.log("PRIMA DI HOURS: "+risk)
      risk += hours >= 9 && hours <= 17 ? -10 : 10
      // console.log("DOPO DI HOURS: "+risk)
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
      const { classes, tickets, comments } = this.props
      const selectedTicket = tickets['tickets'] ? tickets['tickets'].filter(t => t.id == this.props.match.params.idTicket)[0] : ''
      const idEvent = this.props.match.params.idEvent
      // console.log("SELECTED TICKET: " + JSON.stringify(selectedTicket))
      // console.log("PARMA idEvent: " + idEvent)
      return (
        <div className={classes.root}>
          <Grid container direction="column" alignItems="center" spacing={32}>
            <Grid item>
              <Typography variant="display3" gutterBottom>
                Ticket from {selectedTicket.user &&
                  selectedTicket.user.firstName} {selectedTicket.user &&
                    selectedTicket.user.lastName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="display1" gutterBottom>
                Risk of this ticket being a fraud is {this.calculateRisk(selectedTicket, tickets['tickets'])}%
              </Typography>
            </Grid>

            <Grid item>EUR {selectedTicket.price}</Grid>
            <Grid item>
              <Grid container spacing={32}>
                <Grid item><img src={ticketPic}/></Grid>
                <Grid item>Real picture: {selectedTicket.picture}</Grid>
                <Grid item>Description: {selectedTicket.description}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="title" gutterBottom>Comments</Typography>
                </Grid>
                {/* {selectedTicket && selectedTicket.comments &&
                  selectedTicket.comments.map(comment =>
                    <Grid item key={comment.id}>
                      <Comment {...comment} />
                    </Grid>
                  )
                } */}
                {comments && comments['comments'] &&
                  comments['comments'].map(comment =>
                    <Grid item key={comment.id}>
                      <Comment {...comment} />
                    </Grid>
                  )
                }
              </Grid>
            </Grid>
            <Grid item>
            {!this.props.currentUser && this.state && this.state.text === '' &&
                  <span style={{ color: 'red' }}>You have to login to add comments!</span>}
              <CommentForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Link to={`/events/${idEvent}/tickets/${selectedTicket.id}/edit`}>
                    <Button>EDIT TICKET</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={`/events/${idEvent}/tickets`}>
                    <Button>BACK TO TICKETS</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/events'>
                    <Button>BACK TO EVENTS</Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </div >
      )
    }
  }
)

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
    comments: state.comments
  }
}

const mapDispatchToProps = { createComment, loadTickets, loadComments }

export default connect(mapStateToProps, mapDispatchToProps)(TicketsDetails)