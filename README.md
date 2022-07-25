# aws-sdk-js-otel-test

This sample shows how to use [@opentelemetry/instrumentation-aws-sdk][instrumentation-aws-sdk]
to instrument listTables call on DynamoDB client in AWS SDK for JavaScript.

The example exports spans data to `Console`. You can also export it to [Jaeger][jaegertracing]
by setting `JAEGER_ENABLED` environment variable.

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
- (Optional) Setup [Jaeger Tracing][jaeger-getting-started]: needs to be running on `localhost` port `16686`.

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
  traceId: '5cdc3ef6df6feafd083ee31780eaf2af',
  parentId: undefined,
  name: 'DynamoDB.ListTables',
  id: 'daebdb25fd06eebd',
  kind: 2,
  timestamp: 1652398876357628,
  duration: 165648,
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
    'aws.request.id': 'M76TSMKB4MKBEAPTS5SAG2552FVV4KQNSO5AEMVJF66Q9ASUAAJG',
    'http.status_code': 200
  },
  status: { code: 0 },
  events: []
}
```

</details>

<details>
<summary>Jaeger Span Screenshot (v2)</summary>

![Jaeger Span for AWS SDK for JavaScript (v2)](img/jaeger-span-v2.png?raw=true)

</details>

### v3

<details>
<summary>yarn instrument:v3</summary>

```console
$ yarn instrument:v3
{
  traceId: '8667843daae9aa29ee07d5853d234ef3',
  parentId: undefined,
  name: 'DynamoDB.ListTables',
  id: 'a0de3f91383e0d71',
  kind: 2,
  timestamp: 1652398963098096,
  duration: 166117,
  attributes: {
    'rpc.system': 'aws-api',
    'rpc.method': 'ListTables',
    'rpc.service': 'DynamoDB',
    'db.system': 'dynamodb',
    'db.operation': 'ListTables',
    'db.statement': '{}',
    'aws.region': 'us-west-2',
    'aws.request.id': 'S7HO96KJSTPJVCCCA6UMB1DU13VV4KQNSO5AEMVJF66Q9ASUAAJG',
    'http.status_code': 200
  },
  status: { code: 0 },
  events: [ { name: 'name', attributes: [Object], time: [Array] } ]
}
```

</details>

<details>
<summary>Jaeger Span Screenshot (v3)</summary>

![Jaeger Span for AWS SDK for JavaScript (v3)](img/jaeger-span-v3.png?raw=true)

</details>

## Screenshots

<details>
<summary>Jaeger Traces when operation is called multiple times</summary>

![Jaeger Traces for AWS SDK for JavaScript](img/jaeger-traces.png?raw=true)

</details>

[instrumentation-aws-sdk]: https://www.npmjs.com/package/@opentelemetry/instrumentation-aws-sdk
[jaegertracing]: https://www.jaegertracing.io
[jaeger-getting-started]: https://www.jaegertracing.io/docs/latest/getting-started/
