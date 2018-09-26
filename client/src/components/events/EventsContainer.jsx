import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Events from './Events'
import EventForm from './EventForm'
import { loadEvents, createEvent } from '../../actions/events'

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  container: {
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
      this.props.createEvent(this.state)
      this.setState({
        name: '',
        description: ''
      })
      // event.preventDefault()
    }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      })
    }

    loadNextEvents = (currentPage) => {
      this.setState({
        eventPage: ++currentPage
      })
      console.log("CURRENT PAGE: " + currentPage)
      this.props.loadEvents(currentPage)
    }

    loadPreviousEvents = (currentPage) => {
      this.setState({
        eventPage: --currentPage
      })
      console.log("CURRENT PAGE: " + currentPage)
      this.props.loadEvents(currentPage)
    }

    // onClickImg = event => {
    //   <Link to="/tickets" />
    // }

    render() {
      if (!this.props.events) return 'Loading...'

      console.log("EVENTI: " + JSON.stringify(this.props))
      console.log("EVENTI: " + JSON.stringify(this.state))

      const { classes, events } = this.props
      const eventPage = this.state.eventPage

      // console.log("EVENTddddddddddddddI: " + events['events'])

      return (
        <div className={classes.root}>
          <h1>Events</h1>
          <Grid container direction="column">
            <Grid item>
              <Grid container spacing={24} justify="space-around" className={classes.container}>
                {events && events.events &&
                  events['events'].map(event => (
                    <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>

                      <Link to={`/events/${event.id}/tickets`}>
                        <Events
                          {...event}
                        />
                      </Link>

                    </Grid>
                  ))}
              </Grid>
            </Grid>

            {
              eventPage && eventPage > 1 &&
              <Grid item>
                <button type="submit" onClick={() => this.loadPreviousEvents(eventPage)}>PREVIOUS EVENTS</button>
              </Grid>
            }

            {events && events.events &&
              events['events'].length === 3 &&  //CHANGE ME!!!
              <Grid item>
                <button type="submit" onClick={() => this.loadNextEvents(eventPage)}>NEXT EVENTS</button>
              </Grid>
            }

            <Grid item>
              <EventForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            </Grid>
          </Grid>
        </div>
      )
    }
  }
)

// const mapStateToProps = ({ events }) => ({ events })
const mapStateToProps = (state) => {
  return {
    events: state.events,
    eventPage: state.eventPage
  }
}

const mapDispatchToProps = { loadEvents, createEvent }

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)