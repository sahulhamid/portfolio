import { ArrowheadDefs, Box, Arrow, DiagramFrame } from "./primitives";

export default function IngestionDiagram() {
  return (
    <DiagramFrame>
      <svg viewBox="0 0 1000 460" className="w-full min-w-[640px]" role="img" aria-label="Architecture diagram: routers send NetFlow over UDP to a Python collector process per router, which publishes to Kafka. Three consumer processes enrich records with customer IDs, then split into two paths: a historical path writing zstd-compressed Parquet to HDFS partitioned by time, and a live path writing a rolling snapshot to MongoDB for dashboards.">
        <ArrowheadDefs />

        <Box x={20} y={30} width={150} height={70} lines={["Routers", "NetFlow / UDP"]} />
        <Box x={200} y={30} width={180} height={70} lines={["Python Collector", "1 process / router"]} />
        <Box x={410} y={30} width={110} height={70} lines={["Kafka"]} />
        <Box
          x={550}
          y={30}
          width={260}
          height={70}
          lines={["3 Consumer Processes", "enrich: hash map + binary search"]}
          accent
        />

        <Arrow x1={170} y1={65} x2={200} y2={65} />
        <Arrow x1={380} y1={65} x2={410} y2={65} />
        <Arrow x1={520} y1={65} x2={550} y2={65} />

        <Box x={520} y={220} width={200} height={70} lines={["zstd Parquet", "Y / M / D / H partitions"]} />
        <Box x={520} y={340} width={200} height={70} lines={["HDFS"]} />

        <Box x={760} y={220} width={200} height={70} lines={["MongoDB", "1,000-flow snapshot / router"]} />
        <Box x={760} y={340} width={200} height={70} lines={["Live Dashboard"]} />

        <Arrow x1={620} y1={100} x2={620} y2={220} label="historical path" />
        <Arrow x1={740} y1={100} x2={860} y2={220} label="live path" />
        <Arrow x1={620} y1={290} x2={620} y2={340} />
        <Arrow x1={860} y1={290} x2={860} y2={340} />
      </svg>
    </DiagramFrame>
  );
}
