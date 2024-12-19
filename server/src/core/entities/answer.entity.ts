import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['answer', 'secret'])
export class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	answer: string;

	@Column()
	secret: string;

	@Column('timestamp', {
		nullable: true,
	})
	answeredAt?: Date;
}
