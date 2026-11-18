import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({ controllers: [CoursesController], providers: [CoursesService, JwtAuthGuard, RolesGuard] })
export class CoursesModule {}
