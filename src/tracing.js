const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { ConsoleSpanExporter, SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { AwsInstrumentation } = require("@opentelemetry/instrumentation-aws-sdk");

const provider = new NodeTracerProvider({
  instrumentations: [new AwsInstrumentation({})],
});

// Configure span processor to send spans to the exporter
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

provider.register();
