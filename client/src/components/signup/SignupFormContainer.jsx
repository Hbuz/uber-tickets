import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'
import SignupForm from './SignupForm'
import { Redirect } from 'react-router-dom'

class SignupFormContainer extends PureComponent {
  handleSubmit = (data) => {
    this.props.postSignup(data.email, data.password)  //TRY WITH signup INSTEAD OF postSignup
  }

  render() {
    if (this.props.signup.success) return (
      <Redirect to="/" />
    )

    return (
      <div>
        <h1>SIGNUP!!!</h1>
        <SignupForm onSubmit={this.handleSubmit} />
        <p style={{ color: 'red' }}>{this.props.signup.error}</p>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    signup: state.signup
  }
}

const mapDispatchToProps = { postSignup: signup } //TRY CHANHGE ME

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormContainer)
