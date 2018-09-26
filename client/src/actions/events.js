import request from 'superagent'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const ADD_EVENT = 'ADD_EVENT'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  payload: events //Array
})

const addEvent = event => ({
  type: ADD_EVENT,
  payload: event
})


export const loadEvents = (eventPage) => (dispatch, getState) => {
  console.log("ssssssssssssssssssssssssssssss   " + JSON.stringify(getState()))
  console.log("EVENTPAGE:    " + eventPage)
  if (getState().events.lenght > 0) return

  const pageNumber = eventPage
  const pageSize = 3

  request(`${baseUrl}/events/${pageNumber}/${pageSize}`)
    .then(response =>{
      console.log("RESPONSE EVENT QUERY   " + JSON.stringify(response))
      return dispatch(eventsFetched(response.body))
    }
  )
    .catch(console.error)
}


export const createEvent = (name, description) => (dispatch, getState) => {
  const state = getState()
  // const jwt = state.currentUser.jwt
  // if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    // .set('Authorization', `Bearer ${jwt}`)
    // .attach('image1', imgUrl)
    .send(name, description)
    .then(result => dispatch(addEvent(result.body)))
    .catch(err => console.error(err))
}