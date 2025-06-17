import * as dynamoose from 'dynamoose';
import * as AWS from 'aws-sdk';
import { DynamoDB } from '@aws-sdk/client-dynamodb'; // v3

import * as dotenv from 'dotenv';
dotenv.config();

export function configureDynamooseForEnv() {
  const region = `${process.env.DY_REGION}`

  AWS.config.update({
    region: region,
    accessKeyId: `${process.env.DYNAMO_ACCESS_KEY}`,
    secretAccessKey: `${process.env.DYNAMO_SECRET_KEY}`,
  });

  if (region == "local") {
      const endpoint = process.env.DY_ENDPOINT? process.env.DY_ENDPOINT : 'http://dynamodb-local:8000';
      const localDynamoDB = new DynamoDB({
        endpoint:  endpoint,
        region: 'local',
        credentials: {
            accessKeyId: 'fakeMyKeyId',
            secretAccessKey: 'fakeSecretAccessKey',
        },
      });
    
      dynamoose.aws.ddb.set(localDynamoDB);
  }

}
