import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private courses: CoursesService) {}
  @Get() list() { return this.courses.list(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.courses.findOne(id); }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() dto: CreateCourseDto) { return this.courses.create(dto); }
}
