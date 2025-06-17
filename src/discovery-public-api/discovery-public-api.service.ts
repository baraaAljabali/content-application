import { Injectable, Inject } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { plainToInstance } from 'class-transformer';
import { Client } from '@opensearch-project/opensearch';
import { PublicContent } from './dto/public_content.dto';

@Injectable()
export class DiscoveryPublicApiService {
    constructor(
            @Inject('OPENSEARCH_CLIENT') private readonly op_client: Client
        ) {}

    async discover(query: string) {
        const { body } = await this.op_client.search({
            index: 'contents',
            body: {
            query: {
                bool: {
                must: [
                    {
                    multi_match: {
                        query: query,
                        fields: ['title^2', 'description'],
                        fuzziness: 'AUTO',
                    },
                    },
                ],
                filter: [
                    {
                    term: {
                        published: true,
                    },
                    },
                ],
                },
            },
            },
        });

        return plainToInstance(PublicContent, body.hits.hits.map(hit => hit._source), {
            excludeExtraneousValues: true,
        });
}

}
