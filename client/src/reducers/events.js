import { EVENTS_FETCHED } from '../actions/events'


export default function (state = [], { type, payload }) {
  switch (type) {
    case EVENTS_FETCHED:
    console.log("INDIDE REDCIESDS: "+JSON.stringify(payload))
      return {
        ...state,
        events: payload
      }
    default:
      return state
  }
}