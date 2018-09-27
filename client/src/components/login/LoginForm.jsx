import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

export default class LoginForm extends PureComponent {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state) //this is passed from the container?
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
            <input type="email" name="email" value={
                  this.state.email || ''
                } onChange={this.handleChange} />
              </label >
            </Grid>

            <Grid item>
              <label>
                Password
            <input type="password" name="password" value={
                  this.state.password || ''
                } onChange={this.handleChange} />
              </label>
            </Grid>

            <Grid>
              <Button type="submit">Login</Button>
            </Grid>

          </Grid>
        </form>
      </div>)
  }
}