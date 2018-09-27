import request from 'superagent'
import {isExpired} from '../jwt'
import { logout } from './auth'

export const TICKETS_FETCHED = 'TICKETS_FETCHED'
export const ADD_TICKET = 'ADD_TICKET'
export const TICKET_EDIT = 'TICKET_EDIT'


const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const ticketsFetched = tickets => ({
  type: TICKETS_FETCHED,
  payload: tickets //Array
})

const addTicket = ticket => ({
  type: ADD_TICKET,
  payload: ticket
})

const ticketEdit= ticket => ({
  type: TICKET_EDIT,
  payload: ticket
})


export const loadTickets = (eventId) => (dispatch, getState) => {
  console.log("ssssssssssssssssssssssssssssss   " + JSON.stringify(getState()))
  // if (getState().events.lenght > 0) return  //Add conditions for tickets

  request(`${baseUrl}/events/${eventId}/tickets`)
    .then(response =>{
      console.log("RESPONSE TICKETS: "+JSON.stringify(response))
     return dispatch(ticketsFetched(response.body))
    })
    .catch(console.error)
}


export const createTicket = (eventId, ticket) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  // console.log("asasasasasasasasas: "+eventId+"    "+JSON.stringify(ticket))
  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(result => {
      // console.log("INSIDE CREATE TICKET ACTION: "+JSON.stringify(result))
      return dispatch(addTicket(result.body))
    })
    .catch(err => console.error(err))
}


export const editTicket = (eventId, ticketId, currentTicket, ticketEdited) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null //If not logged
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  //If current user is the author of the ticket, otherwise return
  if (state.currentUser.user.id !== currentTicket.user.id ) return null

  console.log("asasasasasasasasas: "+eventId+"    "+JSON.stringify(ticketEdited))
  request
    .put(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticketEdited)
    .then(result => {
      console.log("INSIDE EDIT TICKET ACTION: "+JSON.stringify(result))
      return dispatch(ticketEdit(result.body))
    })
    .catch(err => console.error(err))
}