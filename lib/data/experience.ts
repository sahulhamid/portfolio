export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  project?: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "Nubewell Networks (Network Traffic Optimization)",
    period: "01/2025 – Present",
    location: "Bengaluru",
    project: "Network Traffic Analytics & Monitoring Platform",
    highlights: [
      "Architected 6 TypeScript/Express.js microservices (analytics, reports, config, alerts, auth, log-server) deployed on Docker; the config service manages NetFlow device onboarding via MongoDB aggregation pipelines and HTTP proxying to push configuration changes directly to live network appliances.",
      "Built a structured log pipeline — services emit JSON logs to disk; Fluent Bit tails log files, classifies records by type (system vs. accounting) using tag-rewrite rules, and publishes to two dedicated Kafka topics; a KafkaJS consumer batches ingestion at 500 records / 2s into a centralized store with a filtered Express REST API.",
      "Built the analytics service — router-filtered NetFlow record queries backed by MongoDB; session time-series API with adaptive bucket sizing that auto-selects minute/hour/day/month resolution targeting ~60 data points per query range; hourly cron-scheduled HDFS storage tracking per router; and IPDR subscriber-level flow record access.",
      "Developed the reports service — PDF generation via Puppeteer and pdfkit-table, node-cron scheduled reports (once / weekly / monthly), and singleton background services: network bandwidth sampled every 1s and aggregated per minute to MongoDB, router inactivity alerts fired after 10 min of no flow data, and HDFS storage notifications triggered at 60% capacity.",
      "Engineered a multi-process Python NetFlow collector — dedicated OS process per router sustaining ~12,000 records/sec, bypassing Python's GIL for CPU-bound UDP packet parsing, with tuned UDP socket buffers to prevent packet loss under load and dual-trigger Kafka publishing (100K records / 15s).",
      "Designed the Kafka-to-HDFS ingestion layer — 3 consumer processes enriching flows with customer IDs via a hybrid hash map (exact IPs) and binary search (IP ranges), batching into zstd-compressed Parquet targeting ≤45s end-to-end latency; used MongoDB as a live-traffic layer with a rolling 1,000-flow snapshot per router for real-time dashboard queries; optimized report performance via year/month/day/hour partition pruning and vectorized integer IP range filtering; migrated report export to XLSX write-only streaming mode enabling 500,000+ row exports at constant memory.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Ariveguru Technology Solutions",
    period: "12/2023 – 12/2024",
    location: "Bengaluru",
    highlights: [
      "Built a reusable Dynamic Form engine in React that converts structured JSON schemas into fully rendered UI forms, eliminating manual form-building effort and improving IRB application submission speed.",
      "Developed a customer-facing web portal (React, Redux) simplifying complex IRB application workflows, with backend RESTful APIs (Express.js) and MongoDB/Mongoose for structured storage and querying of application data.",
      "Built a WhatsApp query-answering POC integrating the Meta Graph API for message handling with an LLM API for intelligent, context-aware responses to customer queries, demonstrating end-to-end conversational AI integration.",
    ],
  },
];
