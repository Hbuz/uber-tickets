import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import { userId } from '../../jwt'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const TopBar = (props) => {
  const { location, history, currentUser, user, logout } = props
  console.log("PROPS in TOOLBAR: " + JSON.stringify(props))

  return (
    <AppBar position="absolute" style={{ zIndex: 10 }}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
          Uber for tickets
        </Typography>

        {
          currentUser &&
          <Button color="inherit"><AccountCircleIcon/> {currentUser.user.firstName}</Button>
        }

        {
          location.pathname.indexOf('signup') > 0 &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          location.pathname.indexOf('events/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button>
        }
        {
          /events$/.test(location.pathname) && currentUser &&
          <Button color="inherit" onClick={() => logout()}>Log out</Button>
        }
        {
          /events$/.test(location.pathname) && !currentUser &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  currentUser: state.currentUser

  //FIX ME!!!
  // user: state.currentUser &&
  //   state.users[userId(state.currentUser.jwt)]

})

const mapDispatchToProps = { logout }

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopBar)
)