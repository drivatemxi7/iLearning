
import { Global, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Global()
@Module({
  imports: [
    AuthModule,
    PrismaModule,
  ],
  providers: [
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [
    AuthModule,
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class CommonModule {}
