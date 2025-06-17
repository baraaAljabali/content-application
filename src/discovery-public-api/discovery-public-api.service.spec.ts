import { Test, TestingModule } from '@nestjs/testing';
import { DiscoveryPublicApiService } from './discovery-public-api.service';

describe('DiscoveryPublicApiService', () => {
  let service: DiscoveryPublicApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscoveryPublicApiService],
    }).compile();

    service = module.get<DiscoveryPublicApiService>(DiscoveryPublicApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
