import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AnswersService } from './core/services/answers/answers.service';
import { InterfaceModule } from './interface/interface.module';
import envConfig from './dependency/config/env';
import { AppService } from './app.service';
import { DatasourceModule } from './dependency/datasource/datasource.module';
import { AnswersRepositoryModule } from './core/repositories/answers/answers.repository.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			},
		]),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
		}),
		DatasourceModule,
		InterfaceModule,
		AnswersRepositoryModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		AnswersService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
	exports: [AnswersService],
})
export class AppModule {}
