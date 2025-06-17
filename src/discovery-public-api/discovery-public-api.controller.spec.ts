import { Test, TestingModule } from '@nestjs/testing';
import { DiscoveryPublicApiController } from './discovery-public-api.controller';

describe('DiscoveryPublicApiController', () => {
  let controller: DiscoveryPublicApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscoveryPublicApiController],
    }).compile();

    controller = module.get<DiscoveryPublicApiController>(DiscoveryPublicApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
