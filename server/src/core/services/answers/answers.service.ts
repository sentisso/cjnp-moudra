import { Injectable } from '@nestjs/common';
import { AnswersRepository } from '../../repositories/answers/answers.repository';
import { AnswerValidation } from './types';

@Injectable()
export class AnswersService {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async validateAnswer(answer: string): Promise<{
		secret?: string;
		validation: AnswerValidation;
	}> {
		const valid = await this.answersRepository.findByAnswer(answer);

		if (!valid) {
			return {
				validation: AnswerValidation.INCORRECT,
			};
		}

		await this.answersRepository.setAsAnswered(valid.id);

		return {
			validation: AnswerValidation.CORRECT,
			secret: valid.secret,
		};
	}
}
