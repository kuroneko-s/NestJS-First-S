import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entity/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];

  create(movieDate: CreateMovieDTO): Movie {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieDate,
    });
    return this.movies[this.movies.length - 1];
  }

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Not Found MovieId - ${id}`);
    }

    return movie;
  }

  update(id: number, movieData: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.delete(id);
    this.movies.push({ ...movie, ...movieData });
  }

  delete(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }
}
