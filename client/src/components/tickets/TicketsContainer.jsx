import React, { Component, Link } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Tickets from './Tickets'

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

    render() {
      if (!this.props.ticket) return 'Loading...'

      const { classes, ticket } = this.props

      return (
        <div className={classes.root}>
          <h1>TICCC</h1>
          <Tickets {...ticket} />
        </div>
      )
    }
  }
)

// const mapStateToProps = ({ events }) => ({ events })
const mapStateToProps = (state) => {
  return {
    tickets: state.tickets
  }
}

export default connect(mapStateToProps)(TicketsContainer)