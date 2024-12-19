import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { datasource } from '../config/datasource';

/**
 * Datasource module responsible for configuring the database connection.
 */

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [datasource],
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				...configService.get('datasource'),
				migrations: [], // reset the migrations for runtime, else causes parse error
			}),
		}),
	],
})
export class DatasourceModule {}
