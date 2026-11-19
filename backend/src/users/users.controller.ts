
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private users: UsersService) {}

  // Current user's profile
  @Get('me')
  getMe(@CurrentUser() user: AuthUser) {
    return this.users.getMe(user.id);
  }

  @Patch('me')
  updateMe(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.users.updateMe(user.id, dto);
  }

  // ADMIN: List all users
  @Get('admin')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getAllUsers() {
    return this.users.getAllUsers();
  }

  // ADMIN: Change user role
  @Patch('admin/:id/role')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  updateUserRole(
    @CurrentUser() admin: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.users.updateUserRole(admin.id, id, dto);
  }

  // ADMIN: Activate or deactivate user
  @Patch('admin/:id/status')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  updateUserStatus(
    @CurrentUser() admin: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.users.updateUserStatus(admin.id, id, dto);
  }
}
