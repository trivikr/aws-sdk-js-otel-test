import { DynamoDB } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({});
await client.listTables({});
