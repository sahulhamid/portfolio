import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/data/projects";
import Container from "@/components/Container";
import PlatformDiagram from "@/components/diagrams/PlatformDiagram";
import IngestionDiagram from "@/components/diagrams/IngestionDiagram";
import LogPipelineDiagram from "@/components/diagrams/LogPipelineDiagram";
import FormEngineDemo from "@/components/FormEngineDemo";

const diagrams = {
  platform: PlatformDiagram,
  ingestion: IngestionDiagram,
  "log-pipeline": LogPipelineDiagram,
};

const demos = {
  "form-engine": FormEngineDemo,
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const Diagram = project.diagram ? diagrams[project.diagram] : null;
  const Demo = project.demo ? demos[project.demo] : null;

  return (
    <article className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Link
          href="/#projects"
          className="text-sm font-medium text-accent transition-colors hover:text-foreground"
        >
          ← All projects
        </Link>

        <p className="mt-8 font-mono text-sm text-muted">
          {project.company} · {project.period}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 border-y border-border py-8 sm:grid-cols-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-xl font-semibold text-foreground sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-muted">{metric.label}</p>
            </div>
          ))}
        </div>

        {Diagram && <Diagram />}

        <div className="mt-14 flex flex-col gap-12">
          {project.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {Demo && (
          <div className="mt-14">
            <Demo />
          </div>
        )}

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/#projects"
            className="text-sm font-medium text-accent transition-colors hover:text-foreground"
          >
            ← Back to all projects
          </Link>
        </div>
      </Container>
    </article>
  );
}
