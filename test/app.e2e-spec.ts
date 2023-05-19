import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('movie', () => {
    it('/ (GET_getAll)', () => {
      return request(app.getHttpServer()).get('/').expect(200).expect([]);
    });

    it('/ (POST_create)', () => {
      return request(app.getHttpServer())
        .post('/')
        .expect(201)
        .send({
          title: 'test',
          year: 2023,
          genres: ['test'],
        });
    });

    it('/ (DELETE_delete)', () => {
      return request(app.getHttpServer());
    });
  });
});
