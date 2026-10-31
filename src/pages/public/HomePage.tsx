import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Users, BookOpen, Compass } from "lucide-react";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";

const pillars = [
  {
    icon: BookOpen,
    title: "Grow Spiritually",
    body: "Rooted in Christ and His Word — growing in the nature, wisdom and character of the Son of God.",
  },
  {
    icon: Compass,
    title: "Develop Professionally",
    body: "Equipped to demonstrate excellence and influence in workplaces, businesses and industries.",
  },
  {
    icon: Users,
    title: "Build Relationships",
    body: "Meaningful fellowship across denominations, professions and stages of life — one body, many members.",
  },
  {
    icon: Globe2,
    title: "Influence Every Sphere",
    body: "Manifesting Christ in communities, schools, families and every sphere of human endeavour.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Conviction />
      <ScriptureBand />
      <FeaturePreview />
      <CtaBand />
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grain opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900 to-ink-950" />
        <div className="absolute -top-32 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-gold-400/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-sage-500/10 blur-[100px]" />
      </div>

      <div className="container-page flex min-h-[88vh] flex-col items-center justify-center py-24 text-center">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-ink-800/60 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Romans 8:19
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="heading-serif mt-7 max-w-4xl text-balance text-5xl leading-[1.08] sm:text-6xl md:text-7xl">
            Manifesting the{" "}
            <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-300 bg-clip-text text-transparent">
              Sons of God
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-cream-100/70">
            A global, Christ-centred platform created to connect, equip,
            develop and unite believers across denominations, professions,
            industries and every sphere of life.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary">
              Become a Member <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="btn-ghost">
              Learn Who We Are
            </Link>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-12 max-w-xl text-sm italic text-cream-100/50">
            "For the earnest expectation of the creature waiteth for the
            manifestation of the sons of God."
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="container-page py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">What We Pursue</span>
        <h2 className="heading-serif mt-4 text-3xl sm:text-4xl">
          Spiritual growth and practical development, together
        </h2>
        <div className="gold-divider mt-6" />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 90}>
            <article className="card-surface group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:bg-ink-800/90">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20 transition-colors group-hover:bg-gold-400/20">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-lg text-cream-50">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/60">
                {p.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Conviction() {
  return (
    <section className="relative isolate overflow-hidden border-y border-ink-700/40 bg-ink-950/50">
      <div className="absolute inset-0 -z-10 bg-grain opacity-40" />
      <div className="container-page py-24">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">Our Central Conviction</span>
            <h2 className="heading-serif mt-4 text-3xl sm:text-4xl">
              Christ is the core and foundation of everything we build
            </h2>
            <div className="gold-divider mt-6" />
            <p className="mt-6 text-lg leading-relaxed text-cream-100/70">
              We do not want a platform where people are valued primarily by
              their titles, financial status, popularity or achievements. A
              student, an entrepreneur, a pastor, a doctor and an experienced
              professional should all feel equally welcomed and valued as
              members of the body of Christ.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Connect with believers around the world",
                "Find mentors and meaningful relationships",
                "Join professional and industry communities",
                "Discover opportunities and resources",
                "Share testimonies, knowledge and experiences",
                "Collaborate across industries and nations",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-ink-700/60 bg-ink-800/50 p-4"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  <span className="text-sm text-cream-100/80">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScriptureBand() {
  return (
    <section className="container-page py-28 text-center">
      <Reveal>
        <span className="eyebrow">Foundational Scripture</span>
        <blockquote className="heading-serif mx-auto mt-6 max-w-3xl text-balance text-2xl leading-relaxed sm:text-3xl">
          “For the earnest expectation of the creature waiteth for the
          manifestation of the sons of God.”
        </blockquote>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold-300/80">
          Romans 8:19 — KJV
        </p>
      </Reveal>
    </section>
  );
}

function FeaturePreview() {
  return (
    <section className="container-page pb-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">What Members Can Do</span>
        <h2 className="heading-serif mt-4 text-3xl sm:text-4xl">
          An ecosystem for identity, fellowship and influence
        </h2>
        <div className="gold-divider mt-6" />
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          {
            n: "01",
            t: "Geographical Communities",
            d: "Participate in chapters and branches rooted in your location — local fellowship with a global identity.",
          },
          {
            n: "02",
            t: "Professional & Industry Groups",
            d: "Connect with believers in your field, learn from one another and grow in excellence together.",
          },
          {
            n: "03",
            t: "Mentorship & Opportunities",
            d: "Find guidance, discover resources and opportunities, and help others along the way.",
          },
        ].map((item, i) => (
          <Reveal key={item.n} delay={i * 100}>
            <article className="card-surface h-full p-7">
              <span className="font-serif text-3xl text-gold-400/50">
                {item.n}
              </span>
              <h3 className="mt-3 font-serif text-xl text-cream-50">{item.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-100/60">
                {item.d}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <Link to="/what-we-do" className="btn-ghost">
          See Everything the Platform Offers{" "}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="container-page pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 text-center sm:p-16">
          <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-400/15 blur-[90px]" />
          <span className="eyebrow">Join the Network</span>
          <h2 className="heading-serif mt-5 max-w-2xl text-balance text-3xl sm:text-4xl">
            Become part of a generation manifesting Christ across every sphere
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream-100/65">
            Membership is open to believers from every denomination,
            profession and stage of life. Christ is the foundation — and there
            is a place for you.
          </p>
          <Link to="/signup" className="btn-primary mt-8">
            Become a Member <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
