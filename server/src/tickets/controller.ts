//${baseUrl}/events/${idEvent}/tickets`
import { JsonController, Get, Post, HttpCode, Body, Param } from 'routing-controllers'
import Ticket from './entity'
import Event from '../events/entity'
import User from '../users/entity'

@JsonController()
export default class TicketController {

  @Get('/events/:eventId/tickets')
  async getTickets(@Param("eventId") eventId: number) {
    
    const event = await Event.findOne({id: eventId})  //CHECK
    console.log("eeeeeeeeeeeeeeeeeeeeeEEEEEEEeeeee: "+JSON.stringify(event))
    // return Ticket.find(event)
    return event? event.tickets:[]
  }


  @Post('/events/:eventId/tickets')
  @HttpCode(201)
  async createTicket(
    @Param("eventId") eventId: number,
    @Body() {price, description}  //name, desc, pic, start, end
  ) {
    const event = await Event.findOne({id: eventId})
    const user = await User.findOne({id: 1})
    
    console.log("*************************************  BODY RECEIVED FROM ADD_EVENT: " + price, description)
    const entity = await Ticket.create({ event, user, price, description }).save()
    return entity

  }
}
