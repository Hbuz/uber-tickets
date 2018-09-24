import { USER_LOGIN_SUCCESS } from '../actions/auth'

export default function (state = null, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.payload //jwt
    default:
      return state
  }
}