import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tickets from './Tickets'
import TicketForm from './TicketForm'
import { loadTickets, createTicket } from '../../actions/tickets'

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexWrap: 'wrap'
  }
})

const TicketsContainer = withStyles(styles)(
  class extends Component {

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     readOnly: true
    //   }
    // }

    componentDidMount() {
      const { idEvent } = this.props.match.params
      this.props.loadTickets(idEvent)
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.props.createTicket(this.props.match.params.idEvent, this.state)
      this.setState({
        price: '',
        description: ''
      })
    }

    handleChange = name => event => {
      // console.log("NAME: "+name+"                 "+event.target.value)
      this.setState({
        [name]: event.target.value,
      })
    }


    render() {
      // console.log("PROPSSSS: "+JSON.stringify(this.props))
      if (!this.props.tickets) return 'Loading...'

      const { classes, tickets } = this.props
      const idEvent = this.props.match.params.idEvent
      const selectedEvent = this.props.events['events'] ? this.props.events['events'].filter(event => event.id == idEvent) : []  //BECASUE MISMATCH TYPE

      return (
        <div className={classes.root}>
          {/* <h1>Ticket from {this.props.match.params.idEvent}</h1> */}
          {/* <h1>Ticket from {selectedEvent.name}</h1> */}
          <h1>Ticket from {tickets && 
            tickets.tickets && 
            tickets['tickets'][0]&& 
            tickets['tickets'][0].event &&
            tickets['tickets'][0].event.name}</h1>
          <Grid container direction="column">
            <Grid item>
              ticket
            <Grid container spacing={24} justify="space-around" className={classes.container}>
                {tickets && tickets.tickets &&
                  tickets['tickets'].map(ticket => (
                    <Grid key={ticket.id} item xs={12} sm={6} md={4} lg={3}>

                      <Link to={`/events/${idEvent}/tickets/${ticket.id}/details`}>
                        <Tickets
                          {...ticket} handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                        />
                      </Link>

                    </Grid>
                  ))}
              </Grid>
            </Grid>

            {/* <Grid item>
              <Link to='/events'>
                <Button>EDIT</Button>
              </Link>
            </Grid> */}

            <Grid item>
              <TicketForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            </Grid>

            <Grid item>
              <Link to='/events'>
                <Button>BACK TO EVENTS</Button>
              </Link>
            </Grid>

          </Grid>
        </div>
      )
    }
  }
)

// const mapStateToProps = ({ events }) => ({ events })
const mapStateToProps = (state) => {  //change to tickets?
  return {
    events: state.events,
    tickets: state.tickets
  }
}

const mapDispatchToProps = { loadTickets, createTicket }

export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer)