// import React, { PureComponent } from 'react'
import React, { Component } from 'react'  //For working Link
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { login } from '../../actions/auth'
import Button from '@material-ui/core/Button'

class LoginFormContainer extends Component {
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
      <Redirect to="/events" />
    )
    return (
      <div>
        <div>
          LOGIN!
        {/* <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} values={this.state} /> */}
          <LoginForm handleSubmit={this.handleSubmit} />
          {this.props.error &&
            <span style={{ color: 'red' }}>{this.props.error}</span>}
        </div>
        <div>
          <Link to='/signup'>SIGNUP!</Link> 
        </div>
        <div>
          <Link to="/events">
            <Button>VIEW EVENTS</Button>
          </Link>
        </div>
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

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)