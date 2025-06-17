import { Injectable, Inject } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Content, ContentKey } from './dto/content.dto';
import { plainToInstance } from 'class-transformer';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class CmsService {
    constructor(
        @InjectModel('Content') private ContentModel: Model<Content, ContentKey>,
        @Inject('OPENSEARCH_CLIENT') private readonly op_client: Client
    ) {}

    private indexContent(doc_id: ContentKey , doc: Content) {
        const transformedDoc = plainToInstance(Content, doc, {excludeExtraneousValues: true});
        this.op_client.index({
            index: 'contents',
            id: doc_id.id,
            body: transformedDoc,
        });
    }

    async create(content: Content) {
        const created_content = await this.ContentModel.create(content);
        await this.indexContent(plainToInstance(ContentKey, created_content), plainToInstance(Content, created_content))
        return created_content
    }

    update(id: string, content: Partial<Content>) {
        let key = new ContentKey()
        key.id = id
        const updated_content =  this.ContentModel.update(key, content);
        this.indexContent(plainToInstance(ContentKey, updated_content), plainToInstance(Content, updated_content))
        return updated_content
    }

    async toggle_publish(id: string, new_status: boolean) {
        let key = new ContentKey()
        key.id = id
        const updated_content =  await this.ContentModel.update(key, {published: new_status});
        this.indexContent(plainToInstance(ContentKey, updated_content), plainToInstance(Content, updated_content))
        return updated_content
    }

    findAll() {
        return this.ContentModel.scan().exec();
    }


    async discover(query: string) {
        const { body } = await this.op_client.search({
        index: 'contents',
        body: {
            query: {
            multi_match: {
                query: query,
                fields: ['title^2', 'description'],
                fuzziness: 'AUTO',
            },
            },
        },
        });

        return body.hits.hits.map((hit: any) => hit._source);
    }
}
    


