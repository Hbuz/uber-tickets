import { TICKETS_FETCHED, ADD_TICKET } from '../actions/tickets'


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
    default:
      return state
  }
}