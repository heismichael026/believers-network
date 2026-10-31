import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Who we are"
        lead="Believers Network is a global, Christ-centred platform created to connect, equip, develop and unite believers across different denominations, professions, industries, geographical locations and stages of life."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="heading-serif text-3xl">Our foundation is Jesus Christ</h2>
            <div className="gold-divider mt-5" />
            <p className="mt-6 text-cream-100/70 leading-relaxed">
              We believe that the children of God are called to demonstrate the
              nature, wisdom, character, excellence and influence of Christ
              beyond the walls of church buildings. Christianity should not be
              limited to Sunday services or religious gatherings. Believers
              should demonstrate Christ in their workplaces, businesses,
              schools, families, communities and every sphere of human
              endeavour.
            </p>
            <p className="mt-4 text-cream-100/70 leading-relaxed">
              We want to create an environment where believers can grow
              spiritually, develop professionally, learn from one another, build
              meaningful relationships, receive mentorship, share knowledge,
              collaborate and become better equipped to fulfil their God-given
              purpose.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-surface p-7">
              <h3 className="font-serif text-xl text-cream-50">What we are not</h3>
              <ul className="mt-4 space-y-3 text-sm text-cream-100/70">
                {[
                  "We are not a church management system.",
                  "We are not designed to replace local churches or denominations.",
                  "We are not simply another social media app with Christian colours and Bible verses.",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <ValuesSection />
      <SiteFooter />
    </>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-700/40">
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-400/10 blur-[100px]" />
      <div className="container-page py-20 text-center sm:py-28">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="heading-serif mt-4 text-balance text-4xl sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-cream-100/65">
            {lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      t: "Equal worth before Christ",
      d: "A student, an entrepreneur, a pastor and a doctor should all feel equally welcomed and valued as members of one body.",
    },
    {
      t: "Spiritual and practical growth together",
      d: "We refuse to separate devotion from excellence. Both belong to the life of a believer.",
    },
    {
      t: "Fellowship across boundaries",
      d: "Denominations, professions and locations differ — the body of Christ is one.",
    },
    {
      t: "Mentorship and mutual care",
      d: "Established professionals encourage younger believers; the young find guidance and opportunity.",
    },
  ];
  return (
    <section className="container-page pb-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Our Values</span>
        <h2 className="heading-serif mt-4 text-3xl">How we treat one another</h2>
        <div className="gold-divider mt-6" />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {values.map((v, i) => (
          <Reveal key={v.t} delay={i * 90}>
            <div className="card-surface h-full p-6">
              <h3 className="font-serif text-lg text-cream-50">{v.t}</h3>
              <p className="mt-2 text-sm text-cream-100/60">{v.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
