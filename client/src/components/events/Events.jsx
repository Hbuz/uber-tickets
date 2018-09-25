import * as React from 'react'
import { Link } from 'react-router-dom'
import eventPic from '../../images/eventPic'

export default function Events(props) {
  return (<div>
    <div>
      <strong>{props.name}</strong>
      {props.description}
    </div>
    {/* <Link to="/tickets"> <img width="300" height="150" src={eventPic} /> </Link> */}
    <img width="300" height="150" src={eventPic} />
  </div>)
}

