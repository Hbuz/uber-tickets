import { JsonController, Get, Post, HttpCode, Body } from 'routing-controllers'
import Event from './entity'
// import User from '../users/entity'

@JsonController()
export default class EventController {

  @Get('/events')
  getEvents() {
    return Event.find()
  }


  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() {name, description}  //name, desc, pic, start, end
  ) {
    console.log("*************************************  BODY RECEIVED FROM ADD_EVENT: "+name +" "+description)
    const entity = await Event.create({name, description}).save()
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