import React, { PureComponent } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import {login} from '../actions/auth'

class LoginFormContainer extends PureComponent {
  state = { email: '', password: '' }

  handleSubmit = (event) => {
    this.props.login(event.email, event.password)
  }

  // handleChange = (event) => {
  //   const { name, value } = event.target
  //   this.setState({
  //     [name]: value
  //   })
  // }

  render() {
    if (this.props.currentUser) return (
      <Redirect to="/" />
    )
    return (
      <div>
        LOGIN!
        {/* <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} values={this.state} /> */}
        <LoginForm handleSubmit={this.handleSubmit} />
        {this.props.error &&
          <span style={{ color: 'red' }}>{this.props.error}</span>}
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    currentUser: state.currentUser,
    error: state.login.error
  }
}

export default connect(mapStateToProps, { login })(LoginFormContainer)