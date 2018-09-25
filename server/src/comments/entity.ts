import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import User from '../users/entity'
import Ticket from '../tickets/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.comments, { eager: true })
  user: User

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket

  @Column({ nullable: true })
  text: string

}