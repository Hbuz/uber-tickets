import * as React from 'react'

export default function Tickets(props) {
  return (<div>
    TICKET
    <div>
      <strong>{props.price}</strong>
      {props.description}
    </div>
  </div>)
}