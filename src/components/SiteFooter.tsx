import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Logo from "../components/Logo";

export default function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-ink-700/60 bg-ink-950/60">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/60">
              A global, Christ-centred platform connecting, equipping and
              uniting believers across every sphere of life.
            </p>
            <p className="mt-4 font-serif text-sm italic text-gold-200/80">
              "For the earnest expectation of the creature waiteth for the
              manifestation of the sons of God."
            </p>
            <p className="mt-1 text-xs text-cream-100/40">Romans 8:19 (KJV)</p>
          </div>

          <FooterColumn
            title="Explore"
            links={[
              { to: "/about", label: "About" },
              { to: "/vision", label: "Our Vision" },
              { to: "/what-we-do", label: "What We Do" },
            ]}
          />
          <FooterColumn
            title="Community"
            links={[
              { to: "/join", label: "Become a Member" },
              { to: "/signin", label: "Sign In" },
            ]}
          />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Contact
            </h4>
            <a
              href="mailto:hello@believers.network"
              className="mt-4 flex items-center gap-2 text-sm text-cream-100/70 transition-colors hover:text-gold-200"
            >
              <Mail className="h-4 w-4" /> hello@believers.network
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-700/50 pt-6 text-xs text-cream-100/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Believers Network. Christ is the
            foundation.
          </p>
          <div className="flex gap-5">
            <Link to="/join" className="transition-colors hover:text-cream-100">
              Privacy
            </Link>
            <Link to="/join" className="transition-colors hover:text-cream-100">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-cream-100/70 transition-colors hover:text-gold-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
