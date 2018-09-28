import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'
import SignupForm from './SignupForm'
import { Redirect } from 'react-router-dom'
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


// const EventsContainer = withStyles(styles)(
//   class extends Component {


// class SignupFormContainer extends PureComponent {
//   handleSubmit = (data) => {
//     this.props.postSignup(data.email, data.password)
//   }

const SignupFormContainer = withStyles(styles)(
  class extends PureComponent {

    handleSubmit = (data) => {
      this.props.postSignup(data.email, data.password)
    }

    render() {
      if (this.props.signup.success) return (
        <Redirect to="/" />
      )

      const { classes, signup } = this.props

      return (
        <div>
          <Grid container className={classes.container} direction="column">
            <Grid item>
              <h1>SIGNUP</h1>
            </Grid>
            <Grid item>
              <SignupForm onSubmit={this.handleSubmit} />
            </Grid>
            <Grid item>
              <p style={{ color: 'red' }}>{this.props.signup.error}</p>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
)

const mapStateToProps = function (state) {
  return {
    signup: state.signup
  }
}

const mapDispatchToProps = { postSignup: signup }

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormContainer)
