import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../../entities/answer.entity';

@Injectable()
export class AnswersRepository {
	constructor(
		@InjectRepository(Answer)
		private answersRepository: Repository<Answer>,
	) {}

	findById(id: number): Promise<Answer | null> {
		return this.answersRepository.findOneBy({ id });
	}

	findByAnswer(answer: string): Promise<Answer | null> {
		return this.answersRepository.findOneBy({ answer });
	}

	async setAsAnswered(id: number): Promise<Answer | null> {
		await this.answersRepository.update(id, { answeredAt: new Date() });
		return this.findById(id);
	}
}
