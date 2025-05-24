import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GetUserProfileUseCase } from '../application/use-cases/get-user-profile.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { JwtAuthGuard } from '../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../infrastructure/auth/guards/roles-guard';
import { Roles } from '../infrastructure/auth/decorators/role-decorator';
import { LoginUserMapper } from '../infrastructure/mappers/login-user.mapper';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { CreateUserMapper } from '../infrastructure/mappers/create-user.mapper';
import { LoginUserHttpRequestDto } from '../infrastructure/dto/auth/request/login-user-http-request.dto';
import { LoginUserHttpResponsetDto } from '../infrastructure/dto/auth/response/login-user-http-response.dto';
import { CreateUserHttpRequestDto } from '../infrastructure/dto/auth/request/create-user-http-request.dto';
import { CreateUserHttpResponsetDto } from '../infrastructure/dto/auth/response/create-user-http-response.dto';
import { GetUserProfileMapper } from '../infrastructure/mappers/get-user-profile.mapper';
import { GetUserProfileHttpResponseDTO } from '../infrastructure/dto/auth/response/get-user-profile-http-response.dto';
import { ChangePasswordDto } from './dto/request/change-password-request.dto';
import { ChangePasswordUseCase } from '../application/use-cases/change-password.usecase';
import { ChangePasswordMapper } from '../infrastructure/mappers/change-password.mapper';
import { ChangePasswordHttpResponseDto } from '../infrastructure/dto/auth/response/change-password-http-response.dto';
import { ChangePasswordResponseDto } from './dto/response/change-password-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserMapper: LoginUserMapper,
    private readonly createUserMapper: CreateUserMapper,
    private readonly getUserProfileMapper: GetUserProfileMapper,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly changePasswordMapper: ChangePasswordMapper,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserHttpRequestDto: LoginUserHttpRequestDto,
  ): Promise<LoginUserHttpResponsetDto> {
    const result = await this.loginUserUseCase.execute(loginUserHttpRequestDto);
    return this.loginUserMapper.toHttp(result);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserHttpRequestDto: CreateUserHttpRequestDto,
  ): Promise<CreateUserHttpResponsetDto> {
    const result = await this.registerUserUseCase.execute(createUserHttpRequestDto);
    return this.createUserMapper.toHttp(result);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MODERATOR', 'ADMIN', 'USER')
  @Get('/profile')
  @ApiBearerAuth()
  async getProfile(@Request() req: any): Promise<GetUserProfileHttpResponseDTO> {
    const roles = ['MODERATOR', 'ADMIN', 'USER'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const email: string = req.user.email;
    const result = await this.getUserProfileUseCase.execute(email, roles);
    return this.getUserProfileMapper.toHttp(result);
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MODERATOR', 'ADMIN', 'USER')
  @ApiBearerAuth()
  async changePassword(
    @Request() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ChangePasswordHttpResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const email: string = req.user.email;
    const result: ChangePasswordResponseDto = await this.changePasswordUseCase.execute(
      changePasswordDto,
      email,
    );
    return this.changePasswordMapper.toHttp(result);
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
