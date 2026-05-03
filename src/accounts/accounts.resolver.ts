import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './account.schema';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private accountsService: AccountsService) {}

  @Query(() => [Account])
  accounts(@Args('coachId') coachId: string) {
    return this.accountsService.findByCoach(coachId);
  }

  @Mutation(() => Account)
  connectAccount(
    @Args('coachId') coachId: string,
    @Args('platform') platform: string,
    @Args('accessToken') accessToken: string,
  ) {
    return this.accountsService.createOrUpdate(coachId, platform, { accessToken, connected: true });
  }

  @Mutation(() => Boolean)
  disconnectAccount(@Args('coachId') coachId: string, @Args('platform') platform: string) {
    return this.accountsService.disconnect(coachId, platform).then(() => true);
  }
}