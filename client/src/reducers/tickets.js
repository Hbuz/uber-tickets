import { TICKETS_FETCHED, ADD_TICKET, TICKET_EDIT } from '../actions/tickets'


export default function (state = [], { type, payload }) {
  console.log("PAYLOADbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb            "+JSON.stringify(payload))
  switch (type) {
    case TICKETS_FETCHED:
      // console.log("INDIDE REDCIESDS: " + JSON.stringify(payload))
      return {
        // ...state,  //because should be updated everytime
        tickets: payload
      }
    case ADD_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, payload]
      }
      case TICKET_EDIT:
      return {
        // ...state.tickets,
        // [payload.id]: payload
        ...state,
         // optional 2nd arg in callback is the array index
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