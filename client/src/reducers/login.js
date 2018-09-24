import { USER_LOGIN_FAILED } from '../actions/auth'

export default function (state = {}, { type, payload }) {
  switch (type) {
    case USER_LOGIN_FAILED:
      return {
        error: payload
      }

    default:
      return state
  }
}