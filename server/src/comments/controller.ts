import { JsonController, Post, HttpCode, Body, Param, Authorized, Get, QueryParam } from 'routing-controllers'
import Comment from './entity'
import Ticket from '../tickets/entity'
import User from '../users/entity'

@JsonController()
export default class CommentController {

  @Get('/events/:eventId/tickets/:ticketId')
  async getComments(
    @Param("ticketId") ticketId: number
  ) {
    //COULD QUERY BUILDER BE BETTER?
    const ticket = await Ticket.findOne({ id: ticketId })
    const comments = ticket ? await Comment.find({ ticket: ticket }) : null
    return ticket ? comments : []
  }

  @Authorized()
  @Post('/events/:eventId/tickets/:ticketId')
  @HttpCode(201)
  async createComment(
    @Param("ticketId") ticketId: number,
    @QueryParam("userId") userId: number,
    @Body() { text }
  ) {
    const ticket = await Ticket.findOne({ id: ticketId })
    const user = await User.findOne({ id: userId })

    const entity = await Comment.create({ user, ticket, text }).save()
    return entity
  }

}