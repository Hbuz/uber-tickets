import request from 'superagent'
import {isExpired} from '../jwt'
import { logout } from './auth'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const ADD_EVENT = 'ADD_EVENT'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'
export const limit = process.env.LIMIT_EVENTS || 9

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  payload: events
})

const addEvent = event => ({
  type: ADD_EVENT,
  payload: event
})


export const loadEvents = (eventPage) => (dispatch, getState) => {
  if (getState().events.lenght > 0) return

  const pageNumber = eventPage
  const pageSize = limit

  request
    .get(`${baseUrl}/events`)
    .query({ pageNumber: pageNumber })
    .query({ pageSize: pageSize })
    .then(response => dispatch(eventsFetched(response.body)))
    .catch(console.error)
}


export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(result => dispatch(addEvent(result.body)))
    .catch(err => console.error(err))
}