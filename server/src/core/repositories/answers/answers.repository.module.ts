import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../../entities/answer.entity';
import { Module } from '@nestjs/common';
import { AnswersRepository } from './answers.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Answer])],
	providers: [AnswersRepository],
	exports: [AnswersRepository],
})
export class AnswersRepositoryModule {}
