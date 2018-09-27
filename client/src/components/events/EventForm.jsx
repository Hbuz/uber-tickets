import React, { PureComponent } from 'react'
import DatePicker from 'react-date-picker'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const styles = (theme) => ({
  container: {
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
})


const EventForm = withStyles(styles)(
  class extends PureComponent {

    state = {}

    render() {
      return (
        <div>
          <form noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="column">
                  <TextField
                    id="standard-name"
                    label="Name"
                    className={this.props.classes.textField}
                    value={this.state.name}
                    onChange={this.props.handleChange('name')}
                    margin="normal"
                  />
                  <TextField
                    id="standard-description"
                    label="Description"
                    className={this.props.classes.textField}
                    value={this.state.description}
                    onChange={this.props.handleChange('description')}
                    margin="normal"
                  />
                  <input type="file"
                    id="standard-picture"
                    accept="image/png, image/jpeg, image/jpg"
                    value={this.state.picture}
                    onChange={this.props.handleChange('picture')}
                  />
                  <DatePicker
                    onChange={this.props.onChange('startDate')}
                    value={this.state.startDate}
                    selected={this.state.startDate}
                  />
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.props.onChange('endDate')}
                    value={this.state.endDate}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <button type="submit">CREATE EVENT</button>
              </Grid>
            </Grid>
          </form>
        </div>
      )
    }
  })

export default EventForm