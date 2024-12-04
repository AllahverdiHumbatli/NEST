import { Controller, Delete, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Delete('/testing/all-data')
@HttpCode(204)
  async deleteAllData(): Promise<void> {
  await this.appService.deleteAllData();

}
}
