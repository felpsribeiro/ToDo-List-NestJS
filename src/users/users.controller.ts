import { Body, Controller, Post, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
