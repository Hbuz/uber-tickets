import { EVENTS_FETCHED, ADD_EVENT } from '../actions/events'


export default function (state = [], { type, payload }) {
  switch (type) {
    case EVENTS_FETCHED:
      // console.log("INDIDE REDCIESDS: " + JSON.stringify(payload))
      return {
        ...state,
        events: payload
      }
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, payload]
      }
    default:
      return state
  }
}