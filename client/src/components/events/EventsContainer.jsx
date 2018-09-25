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

    componentDidMount() {
      this.props.loadEvents()
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

    // onClickImg = event => {
    //   <Link to="/tickets" />
    // }

    render() {
      if (!this.props.events) return 'Loading...'

      console.log("EVENTI: " + JSON.stringify(this.props.events))

      const { classes, events } = this.props

      console.log("EVENTddddddddddddddI: " + events['events'])

      return (
        <div className={classes.root}>
          <h1>Events</h1>
          <Grid container direction="column">
            <Grid item>
              <Grid container spacing={24} justify="space-around" className={classes.container}>
                {events && events.events &&
                  events['events'].map(event => (
                    <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>

                    <Link to="/tickets"> 
                      <Events
                        {...event}
                      />
                      </Link>

                    </Grid>
                  ))}
              </Grid>
            </Grid>

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
    events: state.events
  }
}

const mapDispatchToProps = { loadEvents, createEvent }

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)