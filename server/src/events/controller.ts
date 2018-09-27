import { JsonController, Get, Post, HttpCode, Body, QueryParam, Authorized } from 'routing-controllers'
import Event from './entity'


@JsonController()
export default class EventController {

  @Get('/events')
  getEvents(
    @QueryParam("pageNumber") pageNumber: number,
    @QueryParam("pageSize") pageSize: number
  )
    {
    return Event.createQueryBuilder("event")
      .skip((--pageNumber) * pageSize)
      .take(pageSize)
      .getMany()
  }


  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() { name, description, picture, startDate, endDate }
  ) {
    const entity = await Event.create({ name, description, picture, startDate, endDate }).save()
    return entity
  }
}