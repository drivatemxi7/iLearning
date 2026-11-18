import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Module({ controllers: [RegistrationsController], providers: [RegistrationsService, JwtAuthGuard] })
export class RegistrationsModule {}
