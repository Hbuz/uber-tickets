import request from 'superagent'
import {isExpired} from '../jwt'
import { logout } from './auth'

export const TICKETS_FETCHED = 'TICKETS_FETCHED'
export const ADD_TICKET = 'ADD_TICKET'
export const TICKET_EDIT = 'TICKET_EDIT'


const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const ticketsFetched = tickets => ({
  type: TICKETS_FETCHED,
  payload: tickets
})

const addTicket = ticket => ({
  type: ADD_TICKET,
  payload: ticket
})

const ticketEdit= ticket => ({
  type: TICKET_EDIT,
  payload: ticket
})


export const loadTickets = (eventId) => (dispatch) => {
  request(`${baseUrl}/events/${eventId}/tickets`)
    .then(response => dispatch(ticketsFetched(response.body)))
    .catch(console.error)
}


export const createTicket = (eventId, user, ticket) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .query({ userId: user.id })
    .send(ticket)
    .then(result => dispatch(addTicket(result.body)))
    .catch(err => console.error(err))
}


export const editTicket = (eventId, ticketId, currentTicket, ticketEdited) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  if (state.currentUser.user.id !== currentTicket.user.id ) return null

  request
    .put(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticketEdited)
    .then(result => dispatch(ticketEdit(result.body)))
    .catch(err => console.error(err))
}