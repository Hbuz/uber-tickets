import { COMMENTS_FETCHED, ADD_COMMENT } from '../actions/comments'


export default function (state = [], { type, payload }) {
  console.log("PAYLOADbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb "+type+"            " + JSON.stringify(payload))
  switch (type) {
    case COMMENTS_FETCHED:
    console.log("DENTRO COMMENTS_FETCHED")
      // console.log("INDIDE REDCIESDS: " + JSON.stringify(payload))
      return {
        // ...state,  //because should be updated everytime
        comments: payload
      }
    case ADD_COMMENT:
    console.log("DENTRO ADD COMMENT")
      return {
        ...state,
        comments: [...state.comments, payload]
      }
    default:
      return state
  }
}