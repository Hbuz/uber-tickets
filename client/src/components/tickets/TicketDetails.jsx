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
import { calculateRisk } from '../../lib/riskCalculator'

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
      this.props.loadComments(idEvent, idTicket)
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.props.createComment(this.props.match.params.idEvent, this.props.match.params.idTicket, this.state)
      this.setState({
        text: ''
      })
    }

    handleChange = text => event => {
      this.setState({
        [text]: event.target.value,
      })
    }


    render() {
      const { classes, tickets, comments } = this.props
      const selectedTicket = tickets['tickets'] ? tickets['tickets'].filter(t => t.id == this.props.match.params.idTicket)[0] : ''
      const idEvent = this.props.match.params.idEvent

      const splitted = selectedTicket && selectedTicket.picture.split('\\')
      const ticketPic = splitted && require(`../../lib/images/${splitted[splitted.length -1]}`)

      const risk = calculateRisk(selectedTicket, tickets['tickets']).toFixed(2)
      const riskColor = risk > 45 && 'red' || risk >= 15 && risk <= 45 && 'yellow' || risk < 15 && 'green'

      return (
        <div className={classes.root} style={{ backgroundColor: riskColor }}>

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
                Risk of this ticket being a fraud is {risk}%
              </Typography>
            </Grid>

            <Grid item>EUR {selectedTicket.price}</Grid>
            <Grid item>
              <Grid container spacing={32}>
                <Grid item><img src={ticketPic} /></Grid>
                <Grid item>
                  <Grid container direction="column" spacing={32}>
                    <Grid item>Real picture: {selectedTicket.picture}</Grid>
                    <Grid item>Description: {selectedTicket.description}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="title" gutterBottom>Comments</Typography>
                </Grid>
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
    comments: state.comments,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { createComment, loadTickets, loadComments }

export default connect(mapStateToProps, mapDispatchToProps)(TicketsDetails)