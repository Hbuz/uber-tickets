import React, { PureComponent } from 'react'

export default class SignupForm extends PureComponent {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input type="email" name="email" value={this.state.email || ''} onChange={this.handleChange} />
          </label>

          <label>
            Password
            <input type="password" name="password" value={this.state.password || ''} onChange={this.handleChange} />
          </label>

          <label>
            Confirm password
            <input type="password" name="confirmPassword" value={this.state.confirmPassword || ''} onChange={this.handleChange} />
          </label>

          {
            this.state.password &&
            this.state.confirmPassword &&
            this.state.password !== this.state.confirmPassword &&
            <p style={{ color: 'red' }}>The passwords do not match!</p>
          }

          <button type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}