import { COMMENTS_FETCHED, ADD_COMMENT } from '../actions/comments'

export default function (state = [], { type, payload }) {
  switch (type) {
    case COMMENTS_FETCHED:
      return {
        comments: payload
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload]
      }
    default:
      return state
  }
}