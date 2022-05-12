# aws-sdk-js-otel-test

Testing OpenTelemetry instrumentation for AWS SDK for JavaScript

## Prerequisites

Complete the following tasks:

- Install **Node.js** by following these steps:
  1. Install [nvm](https://github.com/nvm-sh/nvm#installation-and-update).
  1. Use node v16.x.x by running `nvm use` or `nvm use 16` in a terminal window.
  1. Verify that node is installed by running `node -v` in a terminal window and confirm that it shows the latest version of `v16`, such as `v16.15.0`).
- Enable corepack by running `corepack enable`.
- Install dependencies by running `yarn`.
- If you don't have an AWS account, [create one](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).
  - If you're an Amazon employee, see the internal wiki for creating an AWS account.
- Install the [AWS CLI](https://aws.amazon.com/cli/).
  - Verify that the AWS CLI is installed by running `aws` in a terminal window.
- Set up [AWS Shared Credential File](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).
  - Your `~/.aws/credentials` (`%UserProfile%\.aws\credentials` on Windows) should look like the following:
    ```
    [default]
    aws_access_key_id = <ACCESS_KEY>
    aws_secret_access_key = <SECRET_ACCESS_KEY>
    ```
  - Your `~/.aws/config` (`%UserProfile%\.aws\config` on Windows) should look like the following:
    ```
    [default]
    region = us-west-2
    ```

## Setup

The test code from this package uses `AwsInstrumentation` from [@opentelemetry/instrumentation-aws-sdk][instrumentation-aws-sdk]
to instrument listTables call on DynamoDB client.

Refer to the npm package for custom instrumentation options which can be passed.

### v2

<details>
<summary>yarn instrument:v2</summary>


```console
$ yarn instrument:v2
{
  traceId: 'c96109ff523f6a7329f0bd65eec2892a',
  parentId: undefined,
  name: 'DynamoDB.ListTables',
  id: '9447373ca2e94fbb',
  kind: 2,
  timestamp: 1652378759628002,
  duration: 355717,
  attributes: {
    'aws.operation': 'listTables',
    'aws.signature.version': 'v4',
    'aws.service.api': 'DynamoDB',
    'aws.service.identifier': 'dynamodb',
    'aws.service.name': 'DynamoDB',
    'rpc.system': 'aws-api',
    'rpc.method': 'ListTables',
    'rpc.service': 'DynamoDB',
    'aws.region': 'us-west-2',
    'db.system': 'dynamodb',
    'db.operation': 'ListTables',
    'db.statement': '{}',
    'aws.request.id': 'CHET3R0PV7TGOKSGL635TCJA5FVV4KQNSO5AEMVJF66Q9ASUAAJG',
    'http.status_code': 200
  },
  status: { code: 0 },
  events: []
}
```

</details>

### v3

<details>
<summary>yarn instrument:v3</summary>

```console
$ yarn instrument:v3
{
  traceId: '56b077b3ff6aaf8c2b33eb056315636e',
  parentId: undefined,
  name: 'DynamoDB.ListTables',
  id: 'e0e3bdd16faaf834',
  kind: 2,
  timestamp: 1652379082829773,
  duration: 355633,
  attributes: {
    'rpc.system': 'aws-api',
    'rpc.method': 'ListTables',
    'rpc.service': 'DynamoDB',
    'db.system': 'dynamodb',
    'db.operation': 'ListTables',
    'db.statement': '{}',
    'aws.region': 'us-west-2',
    'aws.request.id': 'BUKTIJGGFT96U2BBOLDR0CE1KRVV4KQNSO5AEMVJF66Q9ASUAAJG',
    'http.status_code': 200
  },
  status: { code: 0 },
  events: []
}
```

</details>

[instrumentation-aws-sdk]: https://www.npmjs.com/package/@opentelemetry/instrumentation-aws-sdk
