import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('')
  getAllMovie(): Movie[] | [] {
    // @Req() req, @Res() res => express에서 사용하는 방법
    return this.movieService.getAll();
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return { movie: this.movieService.create(movieData) };
  }

  @Get('search')
  search(@Query('year') keyword: string) {
    return 's';
  }

  @Get(':id')
  getOne(@Param('id') movieId: number) {
    console.log(movieId);
    const movie = this.movieService.getOne(movieId);

    return {
      movie,
    };
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return {
      result: this.movieService.delete(movieId),
    };
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() data: UpdateMovieDTO) {
    this.movieService.update(id, data);

    return {
      id: id,
      updatedData: data,
    };
  }
}
