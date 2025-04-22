import { Module } from '@nestjs/common';
import { ErrorTestController } from './error-test.controller';
import { ErrorTestService } from './error-test.service';

@Module({
  controllers: [ErrorTestController],
  providers: [ErrorTestService],
})
export class ErrorTestModule {} 