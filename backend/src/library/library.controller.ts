import { Controller, Get, Query } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private library: LibraryService) {}
  @Get() list(@Query('category') category?: string) { return this.library.list(category); }
}
