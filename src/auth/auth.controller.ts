import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetUserProfileUseCase } from '../application/use-cases/get-user-profile.usecase';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { JwtAuthGuard } from '../infrastructure/auth/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/query')
  @ApiQuery({
    name: 'email',
    type: 'string',
    example: 'micorreo@gmail.com',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: 'se debe ingresar un correo valido existente',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  profile(@Query('email') email: string) {
    return this.getUserProfileUseCase.execute(email);
  }

  @Post('sign-in')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  @Post('sign-up')
  register(@Body() createUserDto: CreateUserDto) {
    return this.registerUserUseCase.execute(createUserDto);
  }

  /*@Get()
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
