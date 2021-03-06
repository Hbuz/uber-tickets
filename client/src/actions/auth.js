import request from 'superagent'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const ADD_USER = 'ADD_USER'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const userLoginSuccess = (userJwt) => ({
  type: USER_LOGIN_SUCCESS,
  payload: userJwt
})

const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILED,
  payload: error || 'Unknown error'
})

const userSignupSuccess = (entity) => ({
  type: ADD_USER,
  payload: entity
})

const userSignupFailed = (error) => ({
  type: USER_SIGNUP_FAILED,
  payload: error || 'Unknown error'
})

export const logout = () => ({
  type: USER_LOGOUT
})

export const login = (email, password) => (dispatch) =>
  request
    .post(`${baseUrl}/logins`)
    .send({ email, password })
    .then(result => dispatch(userLoginSuccess(result.body)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message))
      }
      else {
        console.error(err)
      }
    })


export const signup = (email, password) => (dispatch) =>
  request
    .post(`${baseUrl}/users`)
    .send({ firstName: email, lastName: email, email, password })
    .then(result => dispatch(userSignupSuccess(result.body)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(userSignupFailed(err.response.body.message))
      }
      else {
        console.error(err)
      }
    })