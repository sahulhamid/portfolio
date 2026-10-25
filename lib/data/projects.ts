export type ProjectSection = {
  heading: string;
  body: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  period: string;
  tagline: string;
  tags: string[];
  metrics: ProjectMetric[];
  sections: ProjectSection[];
  diagram?: "platform" | "ingestion" | "log-pipeline";
  demo?: "form-engine";
};

export const projects: Project[] = [
  {
    slug: "network-traffic-platform",
    title: "Network Traffic Analytics & Monitoring Platform",
    company: "Nubewell Networks",
    period: "01/2025 – Present",
    tagline:
      "Six microservices turning raw NetFlow telemetry into live dashboards, automated reports, and proactive alerts for network operators.",
    tags: ["TypeScript", "Express.js", "MongoDB", "Docker", "Puppeteer", "node-cron"],
    diagram: "platform",
    metrics: [
      { label: "Microservices", value: "6" },
      { label: "Inactivity alert", value: "10 min" },
      { label: "HDFS alert threshold", value: "60% capacity" },
      { label: "Report formats", value: "PDF + XLSX" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Network operators needed real-time visibility into NetFlow traffic across many routers — live dashboards, historical analytics, automated reporting, and proactive alerting — plus the ability to push configuration changes to live devices. A single monolith handling all of that would become unmanageable as device count and traffic volume grew.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "The platform is split into 6 independently deployed TypeScript/Express.js services running on Docker: analytics, reports, config, alerts, auth, and log-server.",
          "The config service owns NetFlow device onboarding through MongoDB aggregation pipelines and proxies HTTP requests directly to live network appliances to push configuration changes — so device management doesn't route through the services that handle traffic analytics.",
          "The analytics service serves router-filtered NetFlow queries and a session time-series API with adaptive bucket sizing: it auto-selects minute/hour/day/month resolution to target roughly 60 data points per query range, so a one-hour window and a one-year window both render a readable, appropriately-dense chart. It also tracks HDFS storage per router on an hourly cron and exposes IPDR subscriber-level flow records.",
          "The reports service generates PDFs via Puppeteer and pdfkit-table on node-cron schedules (once / weekly / monthly), alongside singleton background jobs: bandwidth sampled every second and aggregated per minute to MongoDB, router-inactivity alerts after 10 minutes of no flow data, and HDFS capacity notifications at 60% usage.",
        ],
      },
      {
        heading: "Key engineering decisions",
        body: [
          "Adaptive time-series bucketing over fixed intervals — a fixed bucket size either overplots long ranges or renders sparse, noisy charts for short ones. Targeting a constant point count keeps every chart readable regardless of the query window.",
          "Singleton background services for cron-driven jobs (bandwidth sampling, inactivity alerts, capacity notifications) to guarantee exactly-once execution rather than risking duplicate alerts if a service runs multiple instances.",
          "HTTP proxying from the config service straight to appliances, keeping device-configuration traffic isolated from the analytics/reporting data path.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "Operators get live dashboards, automated PDF reports on a schedule, and proactive alerts for router inactivity and storage pressure — replacing manual, reactive monitoring of individual devices.",
        ],
      },
    ],
  },
  {
    slug: "kafka-hdfs-ingestion",
    title: "Kafka-to-HDFS Ingestion Layer",
    company: "Nubewell Networks",
    period: "01/2025 – Present",
    tagline:
      "A Python ingestion pipeline enriching ~12,000 records/sec of live NetFlow with customer identity and landing them in queryable, compressed Parquet within 45 seconds.",
    tags: ["Python", "Kafka", "HDFS", "Parquet", "zstd", "Multiprocessing"],
    diagram: "ingestion",
    metrics: [
      { label: "Collector throughput", value: "~12,000 rec/sec" },
      { label: "End-to-end latency", value: "≤45s" },
      { label: "Streaming export", value: "500,000+ rows" },
      { label: "Live snapshot", value: "1,000 flows / router" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "NetFlow UDP packets arrive continuously from every router on the network. The system needed lossless high-throughput collection, enrichment with customer identity, and durable columnar storage for historical analytics — all without blocking the real-time dashboard queries running against the same data.",
        ],
      },
      {
        heading: "Collector design",
        body: [
          "The collector runs a dedicated OS process per router rather than a thread per router, sidestepping Python's GIL for the CPU-bound work of parsing UDP packets. Socket buffers are tuned per process to prevent packet loss under burst load.",
          "Each process publishes to Kafka on a dual trigger — whichever comes first of 100,000 records buffered or 15 seconds elapsed — which bounds worst-case publish latency while still batching efficiently at high volume. Sustained throughput reaches roughly 12,000 records/sec per router process.",
        ],
      },
      {
        heading: "Enrichment & storage",
        body: [
          "Three consumer processes enrich each flow with a customer ID using a hybrid lookup: an exact-match hash map for single IPs and binary search over sorted ranges for CIDR blocks, so lookups stay fast regardless of how a customer's address space is defined.",
          "Enriched batches are written as zstd-compressed Parquet, partitioned by year/month/day/hour so later queries can prune partitions instead of scanning full history. Reporting queries use vectorized integer IP-range filtering rather than per-row comparisons.",
          "Report export was migrated to XLSX write-only streaming mode, enabling exports of 500,000+ rows at constant memory instead of scaling with result size.",
        ],
      },
      {
        heading: "Real-time layer",
        body: [
          "MongoDB holds a rolling 1,000-flow snapshot per router, giving dashboards sub-second access to live traffic without querying HDFS directly — HDFS stays the system of record for historical analytics, while MongoDB serves the live path.",
        ],
      },
      {
        heading: "Trade-offs",
        body: [
          "Process-per-router over thread-per-router: true CPU parallelism at the cost of higher memory overhead per router — worth it given the CPU-bound nature of UDP parsing at this volume.",
          "Dual-trigger batching over a fixed interval: caps worst-case latency (15s) while still batching efficiently when volume is high enough to hit the record-count trigger first.",
        ],
      },
    ],
  },
  {
    slug: "structured-log-pipeline",
    title: "Structured Log Pipeline",
    company: "Nubewell Networks",
    period: "01/2025 – Present",
    tagline:
      "A Fluent Bit + Kafka pipeline that turns scattered service logs into a queryable, classified, centralized log store.",
    tags: ["Fluent Bit", "Kafka", "KafkaJS", "Express.js"],
    diagram: "log-pipeline",
    metrics: [
      { label: "Consumer batch", value: "500 rec / 2s" },
      { label: "Kafka topics", value: "2, by log type" },
      { label: "Services instrumented", value: "6" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Six independently deployed microservices each wrote logs to local disk with no central place to search, filter, or alert across them — debugging meant SSHing into individual containers.",
        ],
      },
      {
        heading: "Pipeline",
        body: [
          "Each service emits structured JSON logs to disk. Fluent Bit tails those files and applies tag-rewrite rules to classify every record as either a system log or an accounting log, publishing each class to its own dedicated Kafka topic.",
          "A KafkaJS consumer batches incoming records — 500 records or 2 seconds, whichever comes first — before writing them into a centralized store, exposed through a filtered Express REST API for querying by service, log type, and time range.",
        ],
      },
      {
        heading: "Why this shape",
        body: [
          "Decoupling log shipping (Fluent Bit tailing local files) from ingestion (the KafkaJS consumer) means no service ever blocks on log delivery — a slow or down consumer can't back-pressure the services generating logs.",
          "The same dual-trigger batching pattern used in the NetFlow ingestion layer keeps both consumer latency and write amplification bounded, rather than writing one record at a time or waiting on a long fixed interval.",
        ],
      },
    ],
  },
  {
    slug: "dynamic-form-engine",
    title: "Dynamic Form Engine",
    company: "Ariveguru Technology Solutions",
    period: "12/2023 – 12/2024",
    tagline:
      "A React engine that turns a JSON field schema into a fully working form, with Formik driving state and Yup validating it.",
    tags: ["React", "Formik", "Yup", "JSON Schema", "Dynamic UI"],
    demo: "form-engine",
    metrics: [
      { label: "Field types supported", value: "6" },
      { label: "Rebuild per new form", value: "Zero" },
      { label: "Source of truth", value: "JSON schema" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "The product needed many different application forms (IRB submission workflows with different field sets per use case), and hand-building a React form for each one meant repeated boilerplate — every new form shape was a new pull request.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "A form is described entirely as data: an array of field definitions, each with a name, label, input type, validation rules, and type-specific config (like options for a select). The engine walks that schema and renders the matching controlled input for each field — text, textarea, number, select, checkbox, date.",
          "Formik owns form state, touched/dirty tracking, and submission, while each field's validation rules compile into a Yup schema generated at render time from the same field definitions — so the validation logic lives in the JSON alongside the layout, instead of being hand-written per form.",
          "Because the form is schema-driven, adding a new application type is a data change, not a code change: write the JSON, not the JSX.",
        ],
      },
      {
        heading: "Impact",
        body: [
          "Eliminated manual form-building effort for each new IRB application type and improved submission speed by giving non-engineers a path to add or adjust form fields without a code deploy.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
