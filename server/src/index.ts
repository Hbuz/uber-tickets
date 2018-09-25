import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError } from "routing-controllers"
import { verify } from './jwt'
import setupDb from './db'
import LoginController from './logins/controller'
import UserController from './users/controller'
import EventController from './events/controller'
import TicketController from './tickets/controller'

const port = process.env.PORT || 4000


const app = createKoaServer({
  cors: true,
  controllers: [
    LoginController,
    UserController,
    EventController,
    TicketController
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
  }
})


setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))