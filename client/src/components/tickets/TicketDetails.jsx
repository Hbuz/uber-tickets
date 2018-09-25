import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

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
    render(){
      return(
        <div>
          Ticket Detail
        </div>
      )
    }
  }
)

const mapStateToProps = (state) => {
  return {
  }
}
export default connect(mapStateToProps)(TicketsContainer)