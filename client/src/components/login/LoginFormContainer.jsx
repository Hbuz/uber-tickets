import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { login } from '../../actions/auth'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: 24,
    flexWrap: 'wrap'
  }
})



// class LoginFormContainer extends Component {
const LoginFormContainer = withStyles(styles)(
  class extends Component {

    state = { email: '', password: '' }

    handleSubmit = (event) => {
      this.props.login(event.email, event.password)
    }


    render() {
      if (this.props.currentUser) return (
        <Redirect to="/events" />
      )

      const { classes, login } = this.props

      return (
        <div>
          <Grid container className={classes.container} direction="column" spacing={32}>
            <Grid item>
              <Grid container direction="column" spacing={24}>
                <Grid item>
                  LOGIN!
          </Grid>
                <Grid item>
                  <LoginForm handleSubmit={this.handleSubmit} />
                  {this.props.error &&
                    <span style={{ color: 'red' }}>{this.props.error}</span>}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Link to="/events">
                <Button>VIEW EVENTS</Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
)


const mapStateToProps = function (state) {
  return {
    currentUser: state.currentUser,
    error: state.login.error
  }
}

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)