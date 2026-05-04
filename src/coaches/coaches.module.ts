import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CoachesResolver } from './coaches.resolver';
import { Coach, CoachSchema } from './coach.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Coach.name, schema: CoachSchema }])],
  providers: [CoachesService, CoachesResolver],
  exports: [CoachesService],
})
export class CoachesModule {}