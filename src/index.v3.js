import "./tracing.js";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({ region: "us-west-2" });
await client.listTables({});
