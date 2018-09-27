import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import User from '../users/entity'
import Event from '../events/entity'
import Comment from '../comments/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.tickets, { eager: true })
  user: User

  @ManyToOne(_ => Event, event => event.tickets, { eager: true })
  event: Event

  @OneToMany(_ => Comment, comment => comment.ticket, { eager: true })
  comments: Comment[]

  @Column({ nullable: true })
  picture: string

  @Column({ nullable: true }) //TRY TO REMOVE
  price: number

  @Column('text', { nullable: true })//TRY TO REMOVE
  description: string

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}