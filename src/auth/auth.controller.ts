import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly createUserUseCase: RegisterUserUseCase) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    return this.createUserUseCase.execute(createAuthDto);
  }

  /*@Post()
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }*/
}
