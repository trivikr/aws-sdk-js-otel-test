import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";

const provider = new BasicTracerProvider({
  instrumentations: [new AwsInstrumentation({})],
});

// Configure span processor to send spans to the exporter
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

if (process.env.OTEL_EXPORTER_JAEGER_ENABLED === "true") {
// Configure span processor to send spans to the exporter
const exporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}

provider.register();
