# aws-sdk-js-otel-test

This sample shows how to use [@opentelemetry/instrumentation-aws-sdk][instrumentation-aws-sdk]
to instrument listTables call on DynamoDB client in AWS SDK for JavaScript.

The example exports spans data to `Console`. You can also export it to [Jaeger][jaegertracing]
by setting `JAEGER_ENABLED` environment variable.

## Prerequisites

Complete the following tasks:

- Install **Node.js** by following these steps:
  1. Install [nvm](https://github.com/nvm-sh/nvm#installation-and-update).
  1. Use node v22.x.x by running `nvm use` or `nvm use 22` in a terminal window.
  1. Verify that node is installed by running `node -v` in a terminal window and confirm that it shows the latest version of `v22`, such as `v22.10.0`).
- Run `npm install` to install the dependencies.
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

<details>
<summary>node --run instrument</summary>

```console
$ node --run instrument
{
  resource: {
    attributes: {
      'service.name': 'test-aws-sdk',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.28.0'
    }
  },
  instrumentationScope: {
    name: '@opentelemetry/instrumentation-aws-sdk',
    version: '0.47.0',
    schemaUrl: undefined
  },
  traceId: '5393756927067c7b6ca6dc30439c0c10',
  parentId: undefined,
  traceState: undefined,
  name: 'DynamoDB.ListTables',
  id: 'ae24760f494e5931',
  kind: 2,
  timestamp: 1731951374039000,
  duration: 129575.75,
  attributes: {
    'rpc.system': 'aws-api',
    'rpc.method': 'ListTables',
    'rpc.service': 'DynamoDB',
    'db.system': 'dynamodb',
    'db.operation': 'ListTables',
    'aws.region': 'us-west-2',
    'aws.request.id': 'CQPLDQLNFP5AT4GGOMD199FC37VV4KQNSO5AEMVJF66Q9ASUAAJG',
    'http.status_code': 200,
    'aws.dynamodb.table_count': 16
  },
  status: { code: 0 },
  events: [],
  links: []
}
```

</details>

<details>
<summary>Jaeger Span Screenshot</summary>

![Jaeger Span for AWS SDK for JavaScript](img/jaeger-span.png?raw=true)

</details>

For JS SDK v2, pleas refer to the [v2][v2] branch.

## Screenshots

<details>
<summary>Jaeger Traces when operation is called multiple times</summary>

![Jaeger Traces for AWS SDK for JavaScript](img/jaeger-traces.png?raw=true)

</details>

[instrumentation-aws-sdk]: https://www.npmjs.com/package/@opentelemetry/instrumentation-aws-sdk
[jaegertracing]: https://www.jaegertracing.io
[jaeger-getting-started]: https://www.jaegertracing.io/docs/latest/getting-started/
[v2]: https://github.com/trivikr/aws-sdk-js-otel-test/tree/v2
