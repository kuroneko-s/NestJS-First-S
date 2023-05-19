import { PartialType } from '@nestjs/mapped-types'; // objectMapper ?
import { CreateMovieDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}

// 이렇게 해도 된다

/* export class UpdateMovieDTO {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsString({ each: true })
  readonly genres?: string[];
} */
