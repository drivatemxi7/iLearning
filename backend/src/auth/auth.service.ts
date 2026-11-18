import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('An account with this email already exists');
    const rounds = Number(this.config.get('BCRYPT_SALT_ROUNDS', 12));
    const passwordHash = await bcrypt.hash(dto.password, rounds);
    const user = await this.prisma.user.create({
      data: { fullName: dto.fullName.trim(), email, phone: dto.phone, passwordHash },
      select: { id: true, fullName: true, email: true, phone: true, role: true, createdAt: true },
    });
    return { user, accessToken: await this.signToken(user.id, user.email, user.role) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase().trim() } });
    if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    const safeUser = { id: user.id, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role };
    return { user: safeUser, accessToken: await this.signToken(user.id, user.email, user.role) };
  }

  private signToken(sub: string, email: string, role: string) {
    return this.jwt.signAsync({ sub, email, role });
  }
}
