import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
  constructor(private registrations: RegistrationsService) {}
  @Post() create(@CurrentUser() user: AuthUser, @Body() dto: CreateRegistrationDto) {
    return this.registrations.create(user.id, dto);
  }
  @Get('my') mine(@CurrentUser() user: AuthUser) { return this.registrations.mine(user.id); }
}
