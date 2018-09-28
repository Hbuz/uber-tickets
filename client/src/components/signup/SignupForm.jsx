import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'

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
          <Grid container direction="column" spacing={8}>

            <Grid item>
              <label>
                Email
            <input type="email" name="email" value={this.state.email || ''} onChange={this.handleChange} />
              </label>
            </Grid>

            <Grid item>
              <label>
                Password
            <input type="password" name="password" value={this.state.password || ''} onChange={this.handleChange} />
              </label>
            </Grid>
            <Grid item>
              <label>
                Confirm password
            <input type="password" name="confirmPassword" value={this.state.confirmPassword || ''} onChange={this.handleChange} />
              </label>
            </Grid>

            {
              this.state.password &&
              this.state.confirmPassword &&
              this.state.password !== this.state.confirmPassword &&
              <Grid item>
                <p style={{ color: 'red' }}>The passwords do not match!</p>
              </Grid>
            }
            <Grid item>
              <button type="submit">Sign up</button>
            </Grid>
          </Grid>

        </form>
      </div>
    )
  }
}