import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class GetAnswerValidationDto {
	@ApiProperty()
	@IsBoolean()
	isValid: boolean;

	@ApiProperty()
	@IsString()
	message: string;

	@ApiProperty()
	@IsString()
	secret?: string;
}
