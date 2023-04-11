import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { CreateSportsComplexDTO } from './dto/create-sports-complex.dto';
import { UpdateSportsComplexDTO } from './dto/update-sports-complex.dto';
import SportsComplex from './entities/sports-complex.entity';
import { SportsComplexService } from './sports-complex.service';
import { GetUser } from 'src/Core/auth/decorators';
import { AuthUserDTO } from 'src/Core/auth/dto';
import { RoleGuard } from 'src/Core/auth/guards';

@ApiTags('Sports-Complex endpoints')
@Controller('sports-complex')
export class SportsComplexController {
  constructor(
    private readonly sportsComplexService: SportsComplexService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  // @UseGuards(RoleGuard)
  async create(
    @Body() createSportsComplexDto: CreateSportsComplexDTO,
    @GetUser() user: AuthUserDTO,
  ): Promise<SportsComplex> {
    const id: string = user.id;
    const userDB: User = await this.usersService.findOne(id);
    const owner = userDB.owner;
    if (!owner) {
      throw new Error('User is not owner');
    }
    return this.sportsComplexService.create(createSportsComplexDto, owner);
  }

  @Get()
  async findAll(): Promise<SportsComplex[]> {
    return this.sportsComplexService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SportsComplex> {
    return this.sportsComplexService.findOne(id);
  }

  @Get('/owner')
  async findAllOfOwner(@Param() req: Request & { user: any }) {
    const id: string = req.user.id;
    const user: User = await this.usersService.findOne(id);
    const owner = user.owner;
    return this.sportsComplexService.findAllOfOwner(owner);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSportsComplexDTO: UpdateSportsComplexDTO,
    @Req() req: Request & { user: any },
  ) {
    const idUser: string = req.user.id;
    const user: User = await this.usersService.findOne(idUser);
    const owner = user.owner;
    if (!owner) {
      throw new Error('User is not owner');
    }

    return this.sportsComplexService.update(owner.id, id, updateSportsComplexDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request & { user: any }) {
    const idUser: string = req.user.id;
    const user: User = await this.usersService.findOne(idUser);
    const owner = user.owner;
    if (!owner) {
      throw new Error('User is not owner');
    }
    return this.sportsComplexService.remove(id, owner.id);
  }
}
