import { TICKETS_FETCHED, ADD_TICKET, TICKET_EDIT } from '../actions/tickets'


export default function (state = [], { type, payload }) {
  switch (type) {
    case TICKETS_FETCHED:
      return {
        tickets: payload
      }
    case ADD_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, payload]
      }
    case TICKET_EDIT:
      return {
        ...state,
        tickets: state.tickets.map(ticket => {
          if (ticket.id === payload.id) {
            return payload
          }
          return ticket
        })
      }
    default:
      return state
  }
}