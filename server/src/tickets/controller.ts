import { JsonController, Get, Post, HttpCode, Body, Param, Put, NotFoundError, Authorized, QueryParam } from 'routing-controllers'
import Ticket from './entity'
import Event from '../events/entity'
import User from '../users/entity'


@JsonController()
export default class TicketController {

  @Get('/events/:eventId/tickets')
  async getTickets(@Param("eventId") eventId: number) {
    const event = await Event.findOne({ id: eventId })  //CHECK
    const tickets = event ? await Ticket.find({ event: event }) : null
    return event ? tickets : []
  }


  @Authorized()
  @Post('/events/:eventId/tickets')
  @HttpCode(201)
  async createTicket(
    @Param("eventId") eventId: number,
    @QueryParam("userId") userId: number,
    @Body() { price, description, picture }
  ) {
    const event = await Event.findOne({ id: eventId })
    const user = await User.findOne({ id: userId })

    const entity = await Ticket.create({ event, user, price, description, picture }).save()
    return entity
  }


  @Authorized()
  @Put('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)')
  async updateTicket(
    // @CurrentUser() user?: User,  //FIX ME!!!
    @Param('ticketId') ticketId: number,
    @Body() editedTicket: Ticket
  ) {
    const ticket = await Ticket.findOne({ id: ticketId })
    if (!ticket) throw new NotFoundError(`Game does not exist`)

    const newEditedTicket = await Ticket.create(editedTicket)

    return Ticket.merge(ticket, newEditedTicket).save()
  }

}
