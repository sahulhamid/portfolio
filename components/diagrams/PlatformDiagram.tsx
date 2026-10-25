import { ArrowheadDefs, Box, Arrow, CurvedArrow, DiagramFrame } from "./primitives";

export default function PlatformDiagram() {
  return (
    <DiagramFrame>
      <svg viewBox="0 0 1160 300" className="w-full min-w-[720px]" role="img" aria-label="Architecture diagram: NetFlow devices feed a Python collector, which publishes to Kafka, consumed by 6 microservices backed by MongoDB, producing dashboards, reports, and alerts. The microservices push config back to the devices.">
        <ArrowheadDefs />

        <Box x={20} y={120} width={140} height={70} lines={["NetFlow Devices", "routers"]} />
        <Box x={190} y={120} width={140} height={70} lines={["Python Collector"]} />
        <Box x={360} y={120} width={110} height={70} lines={["Kafka"]} />
        <Box
          x={500}
          y={110}
          width={260}
          height={90}
          lines={[
            "6 Microservices",
            "analytics · reports · config",
            "alerts · auth · log-server",
          ]}
          accent
        />
        <Box x={790} y={120} width={120} height={70} lines={["MongoDB"]} />
        <Box
          x={940}
          y={110}
          width={190}
          height={90}
          lines={["Dashboards", "PDF / XLSX reports", "Alerts"]}
        />

        <Arrow x1={160} y1={155} x2={190} y2={155} />
        <Arrow x1={330} y1={155} x2={360} y2={155} />
        <Arrow x1={470} y1={155} x2={500} y2={155} />
        <Arrow x1={760} y1={155} x2={790} y2={155} />
        <Arrow x1={910} y1={155} x2={940} y2={155} />

        <CurvedArrow
          d="M 630 110 C 630 35 90 35 90 120"
          label="config push · HTTP proxy"
          labelX={360}
          labelY={28}
        />
      </svg>
    </DiagramFrame>
  );
}
