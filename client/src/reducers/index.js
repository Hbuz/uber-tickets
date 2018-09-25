import { combineReducers } from 'redux'
import currentUser from './currentUser'
import login from './login'
import signup from './signup'
import events from './events'

export default combineReducers({
  currentUser,
  login,
  signup,
  events
})