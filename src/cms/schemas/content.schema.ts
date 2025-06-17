import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';

export const ContentSchema = new dynamoose.Schema({
        id: {
            type: String,
            hashKey: true,
            default: uuidv4
        },
        title: {
            type: String,
            index: true,
            required: true,
        },
        description: String,
        genre:  {
            type: Array,
            schema: [String],
         },
        language: String,
        length: Number,
        content_link: String,
        published: {
            type: Boolean,
            default: false
        },
        source_type: String,
    },
    { timestamps: true }
);
