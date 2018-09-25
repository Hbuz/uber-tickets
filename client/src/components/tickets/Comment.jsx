import * as React from 'react'

export default function Comment(props) {
  // console.log(JSON.stringify(props))
  return (<div>
    COmments
    <div>
      <strong>{props.text}</strong>
      {props.user.firstName}
    </div>
  </div>)
}