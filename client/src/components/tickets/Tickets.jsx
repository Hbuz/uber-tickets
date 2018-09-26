import * as React from 'react'
import TextField from '@material-ui/core/TextField'

export default function Tickets(props) {
  return (<div>
    TICKET
    {/* <div>
      <strong>{props.price}</strong>
      {props.description}
    </div> */}
    <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
      <TextField
        id="standard-price"
        label="Price"
        className={this.props.classes.textField}
        value={this.state.price}
        onChange={this.props.handleChange('price')}
        margin="normal"
        placeholder={props.price}
        readOnly={props.inputState}
      />
      <TextField
        id="standard-description"
        label="Description"
        className={this.props.classes.textField}
        value={this.state.description}
        onChange={this.props.handleChange('description')}
        margin="normal"
        placeholder={props.description}
        readOnly={props.inputState}
      />
    </form>
  </div>)
}