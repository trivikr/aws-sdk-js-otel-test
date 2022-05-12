const AWS = require("aws-sdk");

const client = new AWS.DynamoDB({ region: "us-west-2" });
client
  .listTables({})
  .promise()
  .then(() => {});
