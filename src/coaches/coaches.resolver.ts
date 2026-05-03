import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoachesService } from './coaches.service';
import { Coach } from './coach.schema';

@Resolver(() => Coach)
export class CoachesResolver {
  constructor(private coachesService: CoachesService) {}

  @Query(() => [Coach])
  coaches() {
    return this.coachesService.coachModel.find().exec();
  }

  @Query(() => Coach, { nullable: true })
  coach(@Args('id') id: string) {
    return this.coachesService.findById(id);
  }

  @Mutation(() => Coach)
  createCoach(@Args('name') name: string, @Args('email') email: string, @Args('studioName') studioName: string) {
    return this.coachesService.create({ name, email, studioName, specialties: [], tiktokConnected: false, instagramConnected: false, youtubeConnected: false });
  }
}