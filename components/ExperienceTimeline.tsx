import { experience } from "@/lib/data/experience";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <Container>
        <SectionHeading eyebrow="02 · Experience" title="Where I've worked" />
        <div className="flex flex-col gap-14">
          {experience.map((entry) => (
            <div
              key={`${entry.company}-${entry.period}`}
              className="grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr] sm:gap-8"
            >
              <div>
                <p className="font-mono text-sm text-muted">{entry.period}</p>
                <p className="mt-1 text-sm text-muted">{entry.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {entry.role}
                </h3>
                <p className="mt-0.5 text-accent">{entry.company}</p>
                {entry.project && (
                  <p className="mt-1 text-sm text-muted">
                    Project: {entry.project}
                  </p>
                )}
                <ul className="mt-4 flex flex-col gap-3">
                  {entry.highlights.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
