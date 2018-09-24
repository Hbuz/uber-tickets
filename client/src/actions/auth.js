import request from 'superagent'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const userLoginSuccess = (jwt) => ({
  type: USER_LOGIN_SUCCESS,
  payload: jwt
})

const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILED,
  payload: error || 'Unknown error'
})

export const login = (email, password) => (dispatch) =>
  request
    .post(`${baseUrl}/logins`)
    .send({ email, password })
    .then(result => dispatch(userLoginSuccess(result.body.jwt)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message))
      }
      else {
        console.error(err)
      }
    })