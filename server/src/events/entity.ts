import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import Ticket from '../tickets/entity'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: true })
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  picture: string

  @Column({ nullable: true })
  startDate: string

  @Column({ nullable: true })
  endDate: string

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]
}