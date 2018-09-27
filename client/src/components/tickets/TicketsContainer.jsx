import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tickets from './Tickets'
import TicketEditForm from './TicketEditForm'
import { loadTickets, createTicket } from '../../actions/tickets'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 28,
  },
  container: {
    flexWrap: 'wrap'
  },
  table: {
    minWidth: 700,
  }
})

const TicketsContainer = withStyles(styles)(
  class extends Component {

    componentDidMount() {
      const { idEvent } = this.props.match.params
      this.props.loadTickets(idEvent)
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.props.createTicket(this.props.match.params.idEvent, this.state)
      this.setState({
        price: '',
        description: '',
        picture: ''
      })
    }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      })
    }


    render() {
      if (!this.props.tickets) return 'Loading...'

      const { classes, tickets } = this.props
      const idEvent = this.props.match.params.idEvent

      return (
        <div className={classes.root}>
          <Grid container direction="column" spacing={24} alignItems="flex-start" >
            <Grid item>
              <h1>Event: {tickets &&
                tickets.tickets &&
                tickets['tickets'][0] &&
                tickets['tickets'][0].event &&
                tickets['tickets'][0].event.name}</h1>
            </Grid>
            <Grid item>

              {this.props.tickets && this.props.tickets['tickets'] && this.props.tickets['tickets'].length > 0 ? (

              <Grid container direction="column">
                <Grid item>

                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Picture</TableCell>
                          <TableCell numeric>Price</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tickets && tickets.tickets &&
                          tickets['tickets'].map(ticket => {
                            return (
                              //FIX ME!!! Warnings in console
                              // <TableRow key={ticket.id}>
                              <div>
                                <Link to={`/events/${idEvent}/tickets/${ticket.id}/details`}>
                                  <Tickets
                                    {...ticket} handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                                  />
                                </Link>
                              </div>
                              // </TableRow>
                            )
                          })}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
              </Grid>
              ) :
                <h1>No tickets added yet!</h1>
              }
            </Grid>
            <Grid item>
              {!this.props.currentUser && this.state && this.state.description === '' &&
                <span style={{ color: 'red' }}>You have to login to add tickets!</span>}
              <TicketEditForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} classes={classes} />
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

const mapStateToProps = (state) => {
  return {
    events: state.events,
    tickets: state.tickets,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { loadTickets, createTicket }

export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer)