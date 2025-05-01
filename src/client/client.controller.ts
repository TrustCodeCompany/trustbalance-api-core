import { CreateClientUseCase } from './../application/use-cases/create-client.usecase';
import { Controller, Post, Body, UseGuards} from '@nestjs/common';
import { CreateClientRequestDto } from './dto/create-client-request.dto';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/roles-guard';
import { Roles } from 'src/infrastructure/auth/decorators/role-decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MODERATOR', 'ADMIN', 'USER')
  @ApiBearerAuth()
  @Post('create')
  create(@Body() createClientRequestDto: CreateClientRequestDto) {
    return this.createClientUseCase.execute(createClientRequestDto);
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
