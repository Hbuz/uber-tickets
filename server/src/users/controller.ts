import { JsonController, Post, Body } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

  @Post('/users')
  async createUser(
    @Body() user: User
  ) {
    const { password, ...rest } = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    const userWithPW = await entity.save()
    return userWithPW
  }
}