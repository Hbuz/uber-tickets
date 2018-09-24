import React, { PureComponent } from 'react'

export default class LoginForm extends PureComponent {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state) //this is passed from the container
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
            <input type="email" name="email" value={
              this.state.email || ''
            } onChange={this.handleChange} />
          </label >

          <label>
            Password
            <input type="password" name="password" value={
              this.state.password || ''
            } onChange={this.handleChange} />
          </label>

          <button type="submit">Login</button>
        </form>
      </div>)
  }
}