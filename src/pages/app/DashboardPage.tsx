import { Link } from "react-router-dom";
import {
  BookOpen,
  Compass,
  Users,
  Globe2,
  Briefcase,
  MessagesSquare,
  HeartHandshake,
  Search,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../lib/auth";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";

export default function DashboardPage() {
  const { profile } = useAuth();

  const quickLinks = [
    {
      icon: Globe2,
      title: "Geographical Communities",
      desc: "Connect with your local chapter and members nearby.",
    },
    {
      icon: Briefcase,
      title: "Professional Groups",
      desc: "Find believers in your industry and learn together.",
    },
    {
      icon: MessagesSquare,
      title: "Discussion Groups",
      desc: "Join focused conversations around faith and life.",
    },
    {
      icon: HeartHandshake,
      title: "Mentorship",
      desc: "Find mentors or offer guidance to others.",
    },
    {
      icon: Search,
      title: "Opportunities & Resources",
      desc: "Discover tools and openings to grow.",
    },
    {
      icon: Megaphone,
      title: "Posts & Feed",
      desc: "Share testimonies and encouragement with the community.",
    },
  ];

  return (
    <>
      {/* Welcome hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gold-400/10 blur-[120px]" />
        <div className="container-page py-20 text-center">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-ink-800/60 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Welcome
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="heading-serif mt-6 text-4xl sm:text-5xl">
              Hello, {profile?.display_name ?? "Member"}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-cream-100/65">
              You are now part of a global, Christ-centred network. Explore your
              community, connect with believers, and grow in every sphere.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/about" className="btn-primary">
                Learn About the Network <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/vision" className="btn-ghost">
                Our Vision
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Profile summary */}
      <section className="container-page pb-8">
        <Reveal>
          <div className="card-surface p-7">
            <h2 className="heading-serif text-xl">Your Profile Summary</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoTile label="Stage of Life" value={profile?.stage_of_life} icon={Compass} />
              <InfoTile label="Profession" value={profile?.profession} icon={Briefcase} />
              <InfoTile label="Location" value={profile?.location} icon={Globe2} />
              <InfoTile label="Visibility" value={profile ? capitalize(profile.visibility) : null} icon={Users} />
            </div>
            {profile?.bio && (
              <div className="mt-4 rounded-xl border border-ink-700/60 bg-ink-800/40 p-4">
                <p className="text-sm text-cream-100/70">{profile.bio}</p>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Feature grid */}
      <section className="container-page py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Explore</span>
          <h2 className="heading-serif mt-4 text-3xl sm:text-4xl">
            Everything the platform offers
          </h2>
          <div className="gold-divider mt-6" />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 80}>
              <article className="card-surface group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20 transition-colors group-hover:bg-gold-400/20">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-lg text-cream-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/60">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Scripture reminder */}
      <section className="container-page pb-16">
        <Reveal>
          <div className="card-surface mx-auto max-w-2xl p-10 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-gold-300/70" />
            <blockquote className="heading-serif mt-5 text-xl leading-relaxed">
              "For the earnest expectation of the creature waiteth for the
              manifestation of the sons of God."
            </blockquote>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gold-300/80">
              Romans 8:19 — KJV
            </p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  );
}

function InfoTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | null | undefined;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-ink-700/60 bg-ink-800/40 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gold-300/60" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm text-cream-100/80">
        {value || "Not set"}
      </p>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
