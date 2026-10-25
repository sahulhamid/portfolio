import { ArrowheadDefs, Box, Arrow, DiagramFrame } from "./primitives";

export default function LogPipelineDiagram() {
  return (
    <DiagramFrame>
      <svg viewBox="0 0 1000 340" className="w-full min-w-[640px]" role="img" aria-label="Architecture diagram: 6 services write JSON logs to disk, Fluent Bit tails and classifies them into two Kafka topics (system and accounting), a KafkaJS consumer batches both into a centralized log store, exposed through a filtered Express REST API.">
        <ArrowheadDefs />

        <Box x={20} y={50} width={160} height={70} lines={["6 Services", "JSON logs → disk"]} />
        <Box x={220} y={50} width={170} height={70} lines={["Fluent Bit", "tag-rewrite rules"]} />
        <Box x={430} y={10} width={170} height={60} lines={["Kafka Topic", "system logs"]} />
        <Box x={430} y={110} width={170} height={60} lines={["Kafka Topic", "accounting logs"]} />

        <Arrow x1={180} y1={85} x2={220} y2={85} />
        <Arrow x1={390} y1={75} x2={430} y2={40} />
        <Arrow x1={390} y1={95} x2={430} y2={140} />

        <Box
          x={330}
          y={230}
          width={190}
          height={70}
          lines={["KafkaJS Consumer", "batch 500 rec / 2s"]}
          accent
        />
        <Box x={570} y={230} width={180} height={70} lines={["Centralized", "Log Store"]} />
        <Box x={800} y={230} width={180} height={70} lines={["Filtered Express", "REST API"]} />

        <Arrow x1={515} y1={70} x2={425} y2={230} />
        <Arrow x1={515} y1={170} x2={425} y2={230} />
        <Arrow x1={520} y1={265} x2={570} y2={265} />
        <Arrow x1={750} y1={265} x2={800} y2={265} />
      </svg>
    </DiagramFrame>
  );
}
