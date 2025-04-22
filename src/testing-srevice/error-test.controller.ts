import { Controller, Get } from '@nestjs/common';
import { ErrorTestService } from './error-test.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Сервис для тестирования')
@Controller('server-500')
export class ErrorTestController {
  constructor(private readonly errorTestService: ErrorTestService) {}

  @ApiOperation({ summary: 'Внутренняя техническая ошибка сервера' })
  @ApiResponse({ status: 500, description: 'Внутренняя техническая ошибка сервера' })
  @Get()
  async triggerError() {
    return this.errorTestService.triggerError();
  }
} 