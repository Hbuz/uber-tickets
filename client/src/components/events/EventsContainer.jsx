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
      this.setState({
        [name]: event.target.value
      })
    }

    onChange = name => date => {
      const parsedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
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

      const { classes, events } = this.props
      const eventPage = this.state.eventPage

      return (

        <Paper className={classes.root} elevation={1}>

          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="display3" component="h3">Events</Typography>
            </Grid>

            <Grid item>
              {this.props.events && this.props.events['events'] && this.props.events['events'].length > 0 ? (

                <Grid container direction="column" alignItems="center">
                  <Grid item>

                    <Grid container spacing={24} justify="space-around" className={classes.container}>
                      {events && events.events &&
                        events['events'].map(event => (

                          <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>
                            {/* CHANGE ME: UNCOMMENT FOR CHECK END DATE FEATURE */}
                            {/* {parsedEventDate(event.endDate) > todayMillis && */}
                              <Link to={`/events/${event.id}/tickets`}>
                                <Events {...event} />
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
                    <Grid container>
                      <Grid item>
                        {!this.props.currentUser && this.state.name === '' &&
                          <span style={{ color: 'red' }}>You have to login to add event!</span>}
                        <EventForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} onChange={this.onChange} />
                      </Grid>
                      <Grid item>
                        <Grid container></Grid>
                        {this.state.startDate &&
                          <Grid item>
                            Selected start date: {this.state.startDate}
                          </Grid>
                        }
                        {this.state.endDate &&
                          <Grid item>
                            Selected end date: {this.state.endDate}
                          </Grid>
                        }
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid>
              ) :
                <h1>No events found!</h1>
              }
            </Grid>
          </Grid>
        </Paper>
      )
    }
  }
)

const mapStateToProps = (state) => {
  return {
    events: state.events,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { loadEvents, createEvent, logout }

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)