import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getMe(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, fullName: true, email: true, phone: true, role: true, avatarUrl: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async updateMe(id: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id }, data: dto,
      select: { id: true, fullName: true, email: true, phone: true, role: true, avatarUrl: true, updatedAt: true },
    });
  }
}
