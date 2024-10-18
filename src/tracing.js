import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";
import { Resource } from "@opentelemetry/resources";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

const provider = new NodeTracerProvider({
  resource: new Resource({ [ATTR_SERVICE_NAME]: "test-aws-sdk" }),
  instrumentations: [new AwsInstrumentation({})],
});

// Configure span processor to send spans to the ConsoleSpanExporter
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Configure span processor to send spans to the JaegerExporter
if (process.env.JAEGER_ENABLED) {
  const { JaegerExporter } = await import("@opentelemetry/exporter-jaeger");
  const exporter = new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}

provider.register();
