import { profile } from "@/lib/data/profile";
import Container from "./Container";

export default function Hero() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {profile.openToWork && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open to work
            </span>
          )}
          <p className="font-mono text-sm text-muted">{profile.location}</p>
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg font-medium text-accent sm:text-xl">
          {profile.title}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.pitch}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
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
          <a
            href={profile.resumeUrl}
            download="SahulHameed_Resume.pdf"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Download Resume
          </a>
        </div>
      </Container>
    </section>
  );
}
