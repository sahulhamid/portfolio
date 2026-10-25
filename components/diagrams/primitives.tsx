export function ArrowheadDefs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="8"
        markerHeight="8"
        refX="7"
        refY="4"
        orient="auto"
      >
        <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
      </marker>
    </defs>
  );
}

export function Box({
  x,
  y,
  width,
  height,
  lines,
  accent = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  lines: string[];
  accent?: boolean;
}) {
  const lineHeight = 16;
  const startY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2 + 4;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill="var(--surface)"
        stroke={accent ? "var(--accent)" : "var(--border)"}
        strokeWidth={1.5}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + width / 2}
          y={startY + i * lineHeight}
          textAnchor="middle"
          fontSize={12.5}
          fill={i === 0 ? "var(--foreground)" : "var(--muted)"}
          fontWeight={i === 0 ? 600 : 400}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--muted)"
        strokeWidth={1.5}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 8}
          textAnchor="middle"
          fontSize={11}
          fill="var(--muted)"
          fontFamily="var(--font-geist-mono)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function CurvedArrow({
  d,
  label,
  labelX,
  labelY,
}: {
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        markerEnd="url(#arrowhead)"
      />
      {label && labelX !== undefined && labelY !== undefined && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fontSize={11}
          fill="var(--muted)"
          fontFamily="var(--font-geist-mono)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function DiagramFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 overflow-x-auto rounded-2xl border border-border bg-background p-6">
      {children}
    </div>
  );
}
