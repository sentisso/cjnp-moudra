import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor() {}

	getHello(): number {
		return Date.now();
	}
}
