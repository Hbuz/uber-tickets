import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED, ADD_USER } from '../actions/auth'

export default function (state = {}, { type, payload }) {
  switch (type) {
    case USER_SIGNUP_SUCCESS:
      return {
        success: true
      }
    case ADD_USER:
      return {
        ...state,
        success: true,
        [payload.id]: payload
      }
    case USER_SIGNUP_FAILED:
      return {
        error: payload
      }

    default:
      return state
  }
}