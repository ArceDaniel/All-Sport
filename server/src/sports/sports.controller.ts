import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.sportsService.findOne(name);
  }

}