import * as React from 'react'

export default function Tickets(props) {

  return (<div>
    TICKET
    <div>
      <strong>{props.price}</strong>
      {props.description}
    </div>
    {/* <form className={props.classes.container} noValidate autoComplete="off" onSubmit={props.handleSubmit} >
      <TextField
        id="standard-price"
        label="Price"
        // className={this.props.classes.textField}
        value={this.state.price}
        onChange={props.handleChange('price')}
        margin="normal"
        placeholder={props.price}
        readOnly={props.inputState}
      />
      <TextField
        id="standard-description"
        label="Description"
        // className={props.classes.textField}
        value={this.state.description}
        onChange={props.handleChange('description')}
        margin="normal"
        placeholder={props.description}
        readOnly={props.inputState}
      />
    </form> */}
  </div>)
}