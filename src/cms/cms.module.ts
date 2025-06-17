import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import {  ContentSchema } from './schemas/content.schema';
import { OpenSearchModule } from 'src/opensearch/opensearch.module';

@Module({
  imports: [DynamooseModule.forFeature([{name: 'Content', schema: ContentSchema}]), OpenSearchModule],
  controllers: [CmsController],
  providers: [CmsService]
})
export class CmsModule {}
