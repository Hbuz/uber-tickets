import { JsonController, Post, HttpCode, Body, Param, Authorized } from 'routing-controllers'
import Comment from './entity'
import Ticket from '../tickets/entity'
import User from '../users/entity'

@JsonController()
export default class CommentController {
  
  @Authorized()
  @Post('/events/:eventId/tickets/:ticketId')
  @HttpCode(201)
  async createComment(
    @Param("ticketId") ticketId: number,
    @Body() { text }  //name, desc, pic, start, end
  ) {
    // console.log("*************************************  BODY RECEIVED FROM ADD_COMMENT: " + ticketId)
    const ticket = await Ticket.findOne({ id: ticketId })
    const user = await User.findOne({ id: 1 })

    // console.log("*************************************  BODY RECEIVED FROM ADD_COMMENT: " + text)
    const entity = await Comment.create({ user, ticket, text }).save()
    return entity
  }

}