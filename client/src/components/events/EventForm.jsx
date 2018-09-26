import React, { PureComponent } from 'react'
import DatePicker from 'react-date-picker'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'

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
          {/* <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} > */}
          <form noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
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
            {/* pircture */}
            {/* <DatePicker
              selected={this.state.startDate}
              // onSelect={this.handleSelect} //when day is clicked  //???
              onChange={this.handleChange} //only when value has changed
            /> */}
            <div>
              <DatePicker
                onChange={this.props.onChange('startDate')}
                value={this.state.startDate}
                selected={this.state.startDate}
                placeholder="Return flight date"
              />
            </div>
            {/* <DatePicker
              selected={this.state.endDate}
              // onSelect={this.handleSelect} //when day is clicked //???
              onChange={this.handleChange} //only when value has changed
            /> */}
            <DatePicker
              selected={this.state.endDate}
              onChange={this.props.onChange('endDate')}
              value={this.state.endDate}
              placeholder="00/00/00"
            />

            <button type="submit">CREATE EVENT</button>
          </form>
        </div>
      )
    }
  })

export default EventForm