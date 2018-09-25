import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import User from '../users/entity'
import Event from '../events/entity'

// @Entity()
// @Index(['game', 'user', 'avatar'], { unique: true }) //???
@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.tickets, { eager: true })
  user: User

  @ManyToOne(_ => Event, event => event.tickets, { eager: true })
  event: Event

  @Column({ nullable: true })
  picture: string

  @Column({nullable: true}) //TRY TO REMOVE
  price: number

  @Column('text', {nullable: true})//TRY TO REMOVE
  description: string
}