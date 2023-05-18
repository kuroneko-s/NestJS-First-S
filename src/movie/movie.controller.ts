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

@Controller()
export class MovieController {
  @Get('')
  getAllMovie() {
    return 'all movie';
  }

  @Post()
  create(@Body() data) {
    console.log(data);
    return `get data ${data}`;
  }

  @Get('search')
  search(@Query('year') keyword: string) {
    return `searching movie ${keyword}`;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return `get id ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `delete id ${id}`;
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() data) {
    console.log(data);
    return {
      id: id,
      updatedData: data,
    };
  }
}
