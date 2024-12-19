import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: process.env.CORS_ORIGIN ?? '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	});

	const config = new DocumentBuilder()
		.setTitle('Scentia API')
		.setDescription('Scentia API')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	const theme = new SwaggerTheme();

	SwaggerModule.setup('docs', app, document, {
		explorer: true,
		customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
	});

	const port = process.env.PORT ?? 3000;
	console.log('Listening on port', port);
	await app.listen(port);
}

bootstrap();
