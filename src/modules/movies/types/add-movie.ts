import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateMovieRequest {
  @Length(1, 255)
  title: string = '';

  @IsDefined()
  @IsInt()
  year: number = null;

  @IsDefined()
  @IsInt()
  runtime: number = null;

  @Length(1, 255)
  director: string = null;

  @IsOptional()
  @IsString()
  actors: string = undefined;

  @IsOptional()
  @IsString()
  plot: string = undefined;

  @IsOptional()
  @IsString()
  posterUrl: string = undefined;


}