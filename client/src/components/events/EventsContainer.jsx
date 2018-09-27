import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Events from './Events'
import EventForm from './EventForm'
import { loadEvents, createEvent, limit } from '../../actions/events'
import { logout } from '../../actions/auth'
import { todayMillis, parsedEventDate } from '../../lib/utils'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  root: {
    flexGrow: 1,
    // ...theme.mixins.gutters(),
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    padding: 24,
    flexWrap: 'wrap'
  }
})

const EventsContainer = withStyles(styles)(
  class extends Component {

    constructor(props) {
      super(props);
      this.state = { eventPage: 1 };
    }

    componentDidMount() {
      this.props.loadEvents(1)
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.props.createEvent(this.state)
      this.setState({
        name: '',
        description: '',
        picture: '',
        startDate: '',
        endDate: ''
      })
    }

    handleChange = name => event => {
      // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH: "+name+ " "+JSON.stringify(event.target.value))
      this.setState({
        [name]: event.target.value
      })
    }

    onChange = name => date => {
      console.log("-----------------DATE: " + name + "     " + date)
      const parsedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
      console.log(parsedDate)
      this.setState({ [name]: parsedDate })
    }

    loadNextEvents = (currentPage) => {
      this.setState({
        eventPage: ++currentPage
      })
      this.props.loadEvents(currentPage)
    }

    loadPreviousEvents = (currentPage) => {
      this.setState({
        eventPage: --currentPage
      })
      this.props.loadEvents(currentPage)
    }


    render() {
      if (!this.props.events) return 'Loading...'

      // console.log("EVENTI: " + JSON.stringify(this.props))
      // console.log("EVENTI: " + JSON.stringify(this.state))

      console.log("TODAY MILLIS: " + todayMillis)

      const { classes, events } = this.props
      const eventPage = this.state.eventPage

      // console.log("EVENTddddddddddddddI: " + events['events'])

      return (

        <Paper className={classes.root} elevation={1}>

          {/* <div className={classes.root}> */}

          <Typography variant="headline" component="h3">Events</Typography>

          {this.props.events && this.props.events['events'] && this.props.events['events'].length > 0 ? (

            <Grid container direction="column" alignItems="center">
              <Grid item>

                <Grid container spacing={24} justify="space-around" className={classes.container}>
                  {events && events.events &&
                    events['events'].map(event => (

                      <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>
                        {/* UNCOMMENT FOR CHECK END DATE FEATURE */}
                        {/* {parsedEventDate(event.endDate) > todayMillis && */}
                        <Link to={`/events/${event.id}/tickets`}>
                          <Events
                            {...event}
                          />
                        </Link>
                        {/* } */}
                      </Grid>

                    ))}
                </Grid>

              </Grid>

              <Grid item>
                <h3>Page {eventPage}</h3>
              </Grid>

              {
                eventPage && eventPage > 1 &&
                <Grid item>
                  <Button type="submit" color="primary" onClick={() => this.loadPreviousEvents(eventPage)}>PREVIOUS EVENTS</Button>
                </Grid>
              }

              {events && events.events &&
                events['events'].length === limit &&
                <Grid item>
                  <Button type="submit" color="primary" onClick={() => this.loadNextEvents(eventPage)}>NEXT EVENTS</Button>
                </Grid>
              }

              <Grid item>
                {!this.props.currentUser && this.state.name === '' &&
                  <span style={{ color: 'red' }}>You have to login to add event!</span>}
                <EventForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} onChange={this.onChange} />
              </Grid>
            </Grid>
          ) :
            <h1>No events found!</h1>
          }
          {/* </div> */}

        </Paper>
      )
    }
  }
)

// const mapStateToProps = ({ events }) => ({ events })
const mapStateToProps = (state) => {
  return {
    events: state.events,
    // eventPage: state.eventPage,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { loadEvents, createEvent, logout }

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)