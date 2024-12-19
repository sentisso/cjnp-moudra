import { Body, Controller, Post } from '@nestjs/common';
import { AnswersService } from '../../core/services/answers/answers.service';
import { ApiOkResponse, ApiTooManyRequestsResponse } from '@nestjs/swagger';
import { GetAnswerValidationDto } from './dto/get-answer-validation.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AnswerValidation } from '../../core/services/answers/types';

@Controller('answers')
@ApiTooManyRequestsResponse()
export class AnswersController {
	constructor(private readonly answersService: AnswersService) {}

	@Post('/validate')
	@ApiOkResponse({
		type: GetAnswerValidationDto,
	})
	async postAnswer(
		@Body() answer: CreateAnswerDto,
	): Promise<GetAnswerValidationDto> {
		// very profi
		await new Promise((resolve) =>
			setTimeout(resolve, Math.random() * 4200),
		);

		const { validation, secret } = await this.answersService.validateAnswer(
			answer.answer,
		);

		switch (validation) {
			case AnswerValidation.INCORRECT:
				return {
					isValid: false,
					message: 'Křížovka answer is incorrect. Try again :))',
				};

			case AnswerValidation.CORRECT:
				return {
					isValid: true,
					message: `Křížovka answer is correct. Congrats for getting the křížovka answer right! Here's your secret: ${secret}`,
					secret,
				};
		}
	}
}
