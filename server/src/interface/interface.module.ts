import { Module } from '@nestjs/common';
import { AnswersController } from './answers/answers.controller';

/**
 * The InterfaceModule is a feature module that encapsulates all the interface controllers.
 */
@Module({
	controllers: [AnswersController],
})
export class InterfaceModule {}
