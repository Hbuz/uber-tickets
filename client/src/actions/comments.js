import request from 'superagent'
import { isExpired } from '../jwt'
import { logout } from './auth'

export const ADD_COMMENT = 'ADD_COMMENT'
export const COMMENTS_FETCHED = 'COMMENTS_FETCHED'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const commentsFetched = comments => ({
  type: COMMENTS_FETCHED,
  payload: comments
})

const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
})


export const loadComments = (eventId, ticketId) => (dispatch, getState) => {
  request(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .then(response => dispatch(commentsFetched(response.body)))
    .catch(console.error)
}


export const createComment = (eventId, ticketId, comment) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(comment)
    .then(result => dispatch(addComment(result.body)))
    .catch(err => console.error(err))
}