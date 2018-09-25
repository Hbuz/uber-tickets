import { combineReducers } from 'redux'
import currentUser from './currentUser'
import login from './login'
import signup from './signup'
import events from './events'
import tickets from './tickets'

export default combineReducers({
  currentUser,
  login,
  signup,
  events,
  tickets
})