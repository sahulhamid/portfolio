import { profile } from "@/lib/data/profile";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="01 · About" title="Summary" />
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.summary}
        </p>
      </Container>
    </section>
  );
}
