import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { GetUserProfileUseCase } from '../application/use-cases/get-user-profile.usecase';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { JwtAuthGuard } from '../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../infrastructure/auth/guards/roles-guard';
import { Roles } from '../infrastructure/auth/decorators/role-decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('sign-in')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  @Post('sign-up')
  register(@Body() createUserDto: CreateUserDto) {
    return this.registerUserUseCase.execute(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MODERATOR', 'ADMIN', 'USER')
  @Get('/profile')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario obtenido exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para acceder a este recurso',
  })
  getProfile(@Request() req: any) {
    const roles = ['MODERATOR', 'ADMIN', 'USER'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const email: string = req.user.email;
    return this.getUserProfileUseCase.execute(email, roles);
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
