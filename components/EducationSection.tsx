import { education } from "@/lib/data/education";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <Container>
        <SectionHeading eyebrow="05 · Education" title="Background" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {education.degree}
          </h3>
          <p className="mt-1 text-accent">{education.school}</p>
          <p className="mt-1 font-mono text-sm text-muted">{education.period}</p>
        </div>
      </Container>
    </section>
  );
}
