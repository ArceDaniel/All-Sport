import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationService } from './reservation.service';
import { AuthUserDTO } from 'src/Core/auth/dto';
import { GetUser } from 'src/Core/auth/decorators';

@ApiTags('Reservations Endpoints')
@Controller('reservation')
export class ReservationController {
  // private logger: Logger = new Logger(ReservationController.name);
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @GetUser() user: AuthUserDTO) {
    return this.reservationService.create(createReservationDto, user.id);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
