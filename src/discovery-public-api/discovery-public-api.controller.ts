import { Controller, Get, Query } from '@nestjs/common';
import { DiscoveryPublicApiService } from './discovery-public-api.service';

@Controller('discovery-public-api')
export class DiscoveryPublicApiController {
    constructor(private readonly discoveryService: DiscoveryPublicApiService) {}

    @Get()
    discover(@Query('query') query: string) {
            return this.discoveryService.discover(query);
        }
}
