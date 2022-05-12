import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";

const provider = new BasicTracerProvider({
  instrumentations: [new AwsInstrumentation({})],
});

// Configure span processor to send spans to the ConsoleSpanExporter
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Configure span processor to send spans to the JaegerExporter
if (process.env.OTEL_EXPORTER_JAEGER_ENABLED) {
  const { JaegerExporter } = await import("@opentelemetry/exporter-jaeger");
  const exporter = new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}

provider.register();
