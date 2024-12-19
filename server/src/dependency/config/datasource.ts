import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Answer } from '../../core/entities/answer.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { resolve } from 'path';
import 'dotenv/config';

export const datasource = registerAs(
	'datasource',
	(): TypeOrmModuleOptions => ({
		type: 'postgres',
		host: process.env.DATABASE_HOST,
		port: +(process.env.DATABASE_PORT || 5432),
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		autoLoadEntities: true,
		synchronize: false,
		migrationsRun: true,
		useUTC: true,
		entities: [Answer],
		migrations: [resolve(__dirname + '/../../scripts/migrations/*.ts')],
	}),
);

export default new DataSource(<DataSourceOptions>datasource());
