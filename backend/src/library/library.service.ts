import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}
  list(category?: string) {
    return this.prisma.libraryResource.findMany({
      where: { isPublished: true, ...(category ? { category } : {}) },
      select: {
        id: true, title: true, description: true, category: true, subject: true,
        level: true, thumbnailUrl: true, access: true, price: true, canDownload: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
