import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class CreateRegistrationDto {
  @IsString() courseId: string;
  @IsString() offeringId: string;
  @IsOptional() @IsString() @MaxLength(150) university?: string;
  @IsOptional() @IsInt() @Min(1900) universityYear?: number;
  @IsOptional() @IsString() @MaxLength(100) universityRegNo?: string;
  @IsOptional() @IsString() @MaxLength(30) guardianContact?: string;
}
