import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError } from "routing-controllers"
import { verify } from './jwt'
import setupDb from './db'
import LoginController from './logins/controller'
import UserController from './users/controller'
import EventController from './events/controller'
import TicketController from './tickets/controller'
import CommentController from './comments/controller'
// import User from './users/entity'

const port = process.env.PORT || 4000


const app = createKoaServer({
  cors: true,
  controllers: [
    LoginController,
    UserController,
    EventController,
    TicketController,
    CommentController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')
      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }
    return false
  },
  currentUserChecker: async (action: Action) => {
    const header = action.request.headers["authorization"];
    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')
      try {
        // return User.findOne(jwt); 
        return !!(token && verify(token)) //FIX ME
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }
  }
})


setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))