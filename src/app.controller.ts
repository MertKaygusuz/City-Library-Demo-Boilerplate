import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/seed-data')
  seedData(): string {
    this.appService.seedData();
    return 'Seed was succeeded!';
  }

  @Get('/delete-all-data')
  deleteAllData() {
    this.appService.deleteAllData();
    return 'Delete was succeded!';
  }
}
