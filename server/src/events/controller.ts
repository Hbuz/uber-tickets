import { JsonController, Get, Post, HttpCode, Body, QueryParam } from 'routing-controllers'
import Event from './entity'
// import User from '../users/entity'



// const limit = req.query.limit || 25
// const offset = req.query.offset || 0


@JsonController()
export default class EventController {

  @Get('/events')
  getEvents(
    @QueryParam("pageNumber") pageNumber: number,
    @QueryParam("pageSize") pageSize: number
  )
    {
    // console.log("PAGINATION PARAMS: " +JSON.stringify(body))
    // console.log("PAGINATION PARAMS: " +pageNumber)
    // console.log("PAGINATION PARAMS: " +pageSize)
    return Event.createQueryBuilder("event")
      .skip((--pageNumber) * pageSize)
      .take(pageSize).getMany()
    // return Event.find()
  }
  // @Param("pageNumber") pageNumber: number,  //offset
  // @Param("pageSize") pageSize: number) {    //limit


  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() { name, description, startDate, endDate }  //name, desc, pic, start, end
  ) {
    // console.log("*************************************  BODY RECEIVED FROM ADD_EVENT: "+name +" "+description)
    const entity = await Event.create({ name, description, startDate, endDate }).save()
    return entity
  }
  // @Post('/events')
  // @HttpCode(201)
  // async createEvent(
  //   @Body() body  //name, desc, pic, start, end
  // ) {
  //   console.log("*************************************  BODY RECEIVED FROM ADD_EVENT: "+JSON.stringify(body))
  //   const entity = await Event.create().save()
  //   const event = await Event.findByOneId(entity.id)
  //   if (!event) throw new BadRequestError(`Game does not exist`)
  //   await event.save()
  //   return entity
  // }

}