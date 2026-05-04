import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { CoachesModule } from './coaches/coaches.module';
import { VideosModule } from './videos/videos.module';
import { SocialModule } from './social/social.module';
import { AccountsModule } from './accounts/accounts.module';
import { UploadModule } from './uploads/uploads.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/golfclip'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CoachesModule,
    VideosModule,
    SocialModule,
    AccountsModule,
    UploadModule,
  ],
})
export class AppModule {}