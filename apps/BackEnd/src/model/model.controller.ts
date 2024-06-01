import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('model')
@Controller('model')
/**
 * @description
 */
export class ModelController {
  constructor(private readonly modelService: ModelService) {}
  @Get()
  findAllConfig() {
    return this.modelService.findAllModel();
  }

  @Post('/config')
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.modelService.create(createConfigDto);
  }

  @Get('/config')
  findAll(paginationQueryDto: PaginationQueryDto) {
    return this.modelService.findAll(paginationQueryDto);
  }

  @Get('/config/:id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(+id);
  }

  @Put('/config/:id')
  update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.modelService.update(+id, updateConfigDto);
  }

  @Delete('/config/:id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
