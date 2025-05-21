import { CreateClientUseCase } from '../application/use-cases/create-client.usecase';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../infrastructure/auth/guards/roles-guard';
import { Roles } from '../infrastructure/auth/decorators/role-decorator';
import { CreateClientMapper } from 'src/infrastructure/mappers/create-client.mapper';
import { CreateClientHttpResponsetDto } from 'src/infrastructure/dto/client/response/create-client-http-response.dto';
import { CreateClientHttpRequestDto } from 'src/infrastructure/dto/client/request/create-client-http-request.dto';

@Controller('client')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly createClientMapper: CreateClientMapper,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MODERATOR', 'ADMIN', 'USER')
  @ApiBearerAuth()
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createClientHttpRequestDto: CreateClientHttpRequestDto,
  ): Promise<CreateClientHttpResponsetDto> {
    const result = await this.createClientUseCase.execute(
      createClientHttpRequestDto,
    );
    return this.createClientMapper.toHttp(result);
  }

  /* @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  } */
}
