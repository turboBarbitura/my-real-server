import { Controller, Patch, Param, Body, Post, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Contact } from './schemas/contact.schema';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все обращения' })
  async getAllContacts() {
    return this.contactsService.getAllContacts();
  }

  @Post()
  @ApiOperation({ summary: 'Создать новое обращение' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Иван', description: 'Имя пользователя' },
        lastName: { type: 'string', example: 'Иванов', description: 'Фамилия пользователя' },
        phone: { type: 'string', example: '+79991234567', description: 'Телефон пользователя' },
        email: { type: 'string', example: 'ivanov@example.com', description: 'Электронная почта пользователя' },
        message: { type: 'string', example: 'Текст обращения', description: 'Текст обращения' },
      },
    },
  })
  async createContact(@Body() contactData: Contact) {
    return this.contactsService.createContact(contactData);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Обновить статус обращения' })
  @ApiParam({ name: 'id', description: 'ID обращения' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'open',
          description: 'Новый статус обращения',
        },
      },
    },
  })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.contactsService.changeStatus(id, status);
  }
} 