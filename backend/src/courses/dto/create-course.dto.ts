import { IsArray, IsBoolean, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseOfferingDto {
  @IsString() level: 'BEGINNER' | 'REGULAR' | 'ADVANCED';
  @IsOptional() @IsBoolean() isAvailable?: boolean;
  @IsOptional() fee?: number;
}
export class CreateCourseDto {
  @IsString() @MinLength(2) @MaxLength(120) title: string;
  @IsOptional() @IsString() @MaxLength(2000) description?: string;
  @IsOptional() @IsString() @MaxLength(80) category?: string;
  @IsOptional() @IsString() @MaxLength(80) duration?: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CourseOfferingDto)
  levels?: CourseOfferingDto[];
}
