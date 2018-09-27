import request from 'superagent'
import { isExpired } from '../jwt'
import { logout } from './auth'

export const ADD_COMMENT = 'ADD_COMMENT'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
})


export const createComment = (eventId, ticketId, comment) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  // console.log("asasasasasasasasas: "+eventId+"    "+JSON.stringify(ticket))
  request
    .post(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(comment)
    .then(result => {
      console.log("INSIDE CREATE COMMENT ACTION: " + JSON.stringify(result))
      return dispatch(addComment(result.body))
    })
    .catch(err => console.error(err))
}