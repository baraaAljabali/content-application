import { Module } from '@nestjs/common';
import { DiscoveryPublicApiController } from './discovery-public-api.controller';
import { DiscoveryPublicApiService } from './discovery-public-api.service';
import { OpenSearchModule } from 'src/opensearch/opensearch.module';

@Module({
  imports: [OpenSearchModule],
  controllers: [DiscoveryPublicApiController],
  providers: [DiscoveryPublicApiService]
})
export class DiscoveryPublicApiModule {}
