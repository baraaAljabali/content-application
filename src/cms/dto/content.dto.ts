import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsBoolean, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class ContentKey {
  @IsString({})
  id: string;
}

export class Content {
  @IsString()
  @Expose()
  title: string;

  @IsOptional()
  @IsString()
  @Expose()
  description?: string;
  
  @IsOptional()
  @IsArray()
  @Expose()
  genre?: string[]

  @IsOptional()
  @IsString()
  @Expose()
  language?: string

  @IsOptional()
  @IsNumber()
  @Expose()
  length?: number

  @IsOptional()
  @IsString()
  @Expose()
  content_link?: string
  
  @IsOptional()
  @IsBoolean()
  @Expose()
  published?: boolean

  @IsOptional()
  @IsString()
  @Expose()
  source_type?: string

  // system-generated fields that are only needed for output and indexing
  @IsOptional()
  @IsDate()
  @Exclude()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Exclude()
  updatedAt?: Date;
}

export class UpdateContent extends PartialType(Content) {}

