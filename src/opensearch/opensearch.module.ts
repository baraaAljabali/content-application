import { Module } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';

import * as dotenv from 'dotenv';
dotenv.config();

const node_link = process.env.OPENSEARCH_NODE? process.env.OPENSEARCH_NODE : 'http://opensearch:9200';
const OpenSearchProvider = {
  provide: 'OPENSEARCH_CLIENT',
  useFactory: () => {
    return new Client({
      node: node_link,
    });
  },
};


@Module({
  providers: [OpenSearchProvider],
  exports: [OpenSearchProvider],
})
export class OpenSearchModule {}