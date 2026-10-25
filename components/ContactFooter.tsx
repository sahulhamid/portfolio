import { profile } from "@/lib/data/profile";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <Container>
        <SectionHeading eyebrow="06 · Contact" title="Let's talk" />
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          I&apos;m currently looking for full stack / backend roles. The
          fastest way to reach me is email.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-16 text-sm text-muted">
          © 2026 {profile.name}
        </p>
      </Container>
    </footer>
  );
}
