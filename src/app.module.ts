import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CmsModule } from './cms/cms.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamooseModule } from 'nestjs-dynamoose';

import postgres_config from 'postgres.config';
import { configureDynamooseForEnv } from 'dynamodb.config';
import { DiscoveryPublicApiModule } from './discovery-public-api/discovery-public-api.module';
import { OpenSearchModule } from './opensearch/opensearch.module';

configureDynamooseForEnv()
@Module({
  imports: [
    UserModule,
    CmsModule,
    AuthModule,
    OpenSearchModule, 
    TypeOrmModule.forRoot(postgres_config), 
    DynamooseModule.forRoot(), DiscoveryPublicApiModule, 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
