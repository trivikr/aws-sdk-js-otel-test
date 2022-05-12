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

provider.register();
