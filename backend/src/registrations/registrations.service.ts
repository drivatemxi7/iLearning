import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}
  async create(userId: string, dto: CreateRegistrationDto) {
    const offering = await this.prisma.courseOffering.findFirst({
      where: { id: dto.offeringId, courseId: dto.courseId },
    });
    if (!offering) throw new BadRequestException('Selected course level does not match this course');
    return this.prisma.registration.create({
      data: { ...dto, userId },
      include: { course: true, offering: true },
    });
  }
  mine(userId: string) {
    return this.prisma.registration.findMany({
      where: { userId }, include: { course: true, offering: true },
      orderBy: { registeredAt: 'desc' },
    });
  }
}
