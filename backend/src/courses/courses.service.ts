import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  list() {
    return this.prisma.course.findMany({
      where: { isPublished: true },
      include: { levels: true },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findOne(id: string) {
    const course = await this.prisma.course.findFirst({
      where: { id, isPublished: true }, include: { levels: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }
  create(dto: CreateCourseDto) {
    const { levels, ...data } = dto;
    return this.prisma.course.create({
      data: {
        ...data,
        levels: levels?.length ? { create: levels.map((l) => ({ ...l, fee: l.fee ?? 0 })) } : undefined,
      },
      include: { levels: true },
    });
  }
}
