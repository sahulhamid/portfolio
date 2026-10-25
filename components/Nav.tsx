import Link from "next/link";
import { profile } from "@/lib/data/profile";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.resumeUrl}
          download="SahulHameed_Resume.pdf"
          className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
