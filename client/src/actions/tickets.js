import request from 'superagent'

export const TICKETS_FETCHED = 'TICKETS_FETCHED'
export const ADD_TICKET = 'ADD_TICKET'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const ticketsFetched = tickets => ({
  type: TICKETS_FETCHED,
  payload: tickets //Array
})

const addTicket = ticket => ({
  type: ADD_TICKET,
  payload: ticket
})


export const loadTickets = (eventId) => (dispatch, getState) => {
  // console.log("ssssssssssssssssssssssssssssss   " + JSON.stringify(getState()))
  // if (getState().events.lenght > 0) return  //Add conditions for tickets

  request(`${baseUrl}/events/${eventId}/tickets`)
    .then(response =>{
      console.log("RESPONSE TICKETS: "+JSON.stringify(response))
     return dispatch(ticketsFetched(response.body))
    })
    .catch(console.error)
}


export const createTicket = (eventId, ticket) => (dispatch, getState) => {
  // console.log("asasasasasasasasas: "+eventId+"    "+JSON.stringify(ticket))
  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    // .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(result => {
      // console.log("INSIDE CREATE TICKET ACTION: "+JSON.stringify(result))
      return dispatch(addTicket(result.body))
    })
    .catch(err => console.error(err))
}