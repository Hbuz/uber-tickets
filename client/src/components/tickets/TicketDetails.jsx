import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { createComment } from '../../actions/tickets'

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

    // componentDidMount() {
    //   const {idEvent} = this.props.match.params
    //   this.props.load(idEvent)
    // }

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

    calculateRisk(){
      
    }

    render() {
      const { classes, tickets } = this.props
      const selectedTicket = tickets['tickets'] ? tickets['tickets'].filter(t => t.id == this.props.match.params.idTicket)[0] : ''
      const idEvent = this.props.match.params.idEvent
      console.log("SELECTED TICKET: " + JSON.stringify(selectedTicket))
      console.log("PARMA idEvent: " + idEvent)
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
            We calculated that the risk of this ticket being a fraud is XX%
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
    events: state.events
  }
}

const mapDispatchToProps = { createComment }

export default connect(mapStateToProps, mapDispatchToProps)(TicketsDetails)