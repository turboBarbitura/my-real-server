import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    schema: {
      example: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'securePassword123'
      }
    }
  })
  @Post()
  createUser(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.createUser(body.name, body.email, body.password);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}