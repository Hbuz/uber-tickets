import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions/auth'

export default function (state = null, action) {
  console.log("INSIDE LOGIN REDUCE: "+JSON.stringify(action))
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        user: action.payload.user, //user + jwt
        jwt: action.payload.jwt
      }

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}