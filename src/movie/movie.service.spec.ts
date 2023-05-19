import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { NotFoundException } from '@nestjs/common';

// 정의하다
describe('MovieService', () => {
  let service: MovieService;

  // 테스트 전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  // 테스트 문 (개별테스트)
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('return array', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('return Movie', () => {
      const movie = service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });

      expect(service.getOne(1)).toBeDefined(); // not undefined
      expect(service.getOne(1)).toEqual(movie);
      expect(movie.id).toEqual(1);
    });

    it('not found exception', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Not Found MovieId - ${999}`);
      }
    });
  });

  describe('delete', () => {
    it('delete a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });

      const before = service.getAll().length;
      service.delete(1);
      const after = service.getAll().length;

      expect(after).toEqual(before - 1);
      expect(after).toBeLessThan(before);
    });

    it('delete not found', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });

      try {
        service.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Not Found MovieId - ${999}`);
      }
    });
  });

  describe('create', () => {
    it('create movie', () => {
      const before = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });

      const after = service.getAll().length;
      expect(after).toBeGreaterThan(before);
    });
  });

  describe('update', () => {
    it('movie update', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });

      service.update(1, {
        title: 'Update title',
        genres: ['test', 'update'],
      });

      const movie = service.getOne(1);

      expect(movie.title).toEqual('Update title');
      expect(movie.genres).toEqual(['test', 'update']);
    });
  });
});
