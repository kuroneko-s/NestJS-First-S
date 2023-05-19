import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이션이 달려있지 않는 요소들은 배제한 상태로 전송
      forbidNonWhitelisted: true, // 데코레이션이 달려있지 않는 요소들까지 요청시 req 거절
      transform: true, // 타입 변환해줌. // Formmator or Convertor
    }),
  );
  await app.listen(3000);
}

bootstrap();
