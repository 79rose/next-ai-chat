import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Model } from './entities/model.entity';
import { ModelConfig } from './entities/model-config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Model, ModelConfig])],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
