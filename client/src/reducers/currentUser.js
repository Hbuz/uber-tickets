import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions/auth'

export default function (state = null, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        jwt: action.payload.jwt
      }

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}