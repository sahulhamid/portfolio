import Link from "next/link";
import { projects } from "@/lib/data/projects";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <Container>
        <SectionHeading eyebrow="03 · Projects" title="Deep dives" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.tagline}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read the case study
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
