//${baseUrl}/events/${idEvent}/tickets`
import { JsonController, Get, Post, HttpCode, Body, Param, Put, NotFoundError, Authorized } from 'routing-controllers'
import Ticket from './entity'
import Event from '../events/entity'
import User from '../users/entity'


@JsonController()
export default class TicketController {

  @Get('/events/:eventId/tickets')
  async getTickets(@Param("eventId") eventId: number) {
    console.log("eeeeeeeeeeeeeeeeeeeeeEEEEEEEeeeee: " + eventId)
    const event = await Event.findOne({ id: eventId })  //CHECK
    const tickets = event ? await Ticket.find({ event: event }) : null
    console.log("eeeeeeeeeeeeeeeeeeeeeEEEEEEEeeeee: " + JSON.stringify(event))
    console.log("eeeeeeeeeeeeeeeeeeeeeEEEEEEEeeeee: " + tickets)
    // return Ticket.find(event)
    return event ? tickets : []
  }


  @Authorized()
  @Post('/events/:eventId/tickets')
  @HttpCode(201)
  async createTicket(
    @Param("eventId") eventId: number,
    @Body() { price, description, picture }  //name, desc, pic, start, end
  ) {
    const event = await Event.findOne({ id: eventId })
    const user = await User.findOne({ id: 1 })  //CHANGE ME!!!

    // console.log("*************************************  BODY RECEIVED FROM ADD_EVENT: " + price, description)
    const entity = await Ticket.create({ event, user, price, description, picture }).save()
    return entity

  }


  @Authorized()
  @Put('/events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)')
  async updateTicket(
    // @CurrentUser() user?: User,
    @Param('ticketId') ticketId: number,
    @Body() editedTicket: Ticket
  ) {
    const ticket = await Ticket.findOne({ id: ticketId })  //CHECK!!!
    if (!ticket) throw new NotFoundError(`Game does not exist`)
    console.log("BODY TICKET: " + JSON.stringify(editedTicket))
    console.log("TICKET TREOVATO: " + JSON.stringify(ticket))

    const newEditedTicket = await Ticket.create(
      editedTicket
    )
    console.log("NEW EDITED TICKET: " + JSON.stringify(newEditedTicket))

    return Ticket.merge(ticket, newEditedTicket).save()
  }

}
