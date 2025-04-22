import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ErrorTestService {
  async triggerError() {
    throw new InternalServerErrorException('Тестовая ошибка 500');
  }
} 