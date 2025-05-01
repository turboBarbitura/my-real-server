import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendVerificationEmail(email: string, token: string) {
    const url = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Подтверждение email',
      template: 'verification',
      context: {
        url,
      },
    });
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const url = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Сброс пароля',
      template: 'reset-password',
      context: {
        url,
      },
    });
  }
} 