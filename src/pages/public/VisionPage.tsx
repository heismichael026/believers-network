import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import { PageHeader } from "./AboutPage";

export default function VisionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vision"
        title="Manifesting Christ in every sphere"
        lead="To raise and connect a generation of believers who manifest the nature, wisdom and influence of Christ across every sphere of human endeavour."
      />

      <section className="container-page py-20">
        <Reveal>
          <h2 className="heading-serif max-w-3xl text-3xl">
            Our goal is to build a network where spiritual growth and practical
            development work together
          </h2>
          <div className="gold-divider mt-6" />
          <p className="mt-6 max-w-2xl text-cream-100/70 leading-relaxed">
            We want established professionals to encourage younger believers. We
            want young people to find guidance, opportunities and meaningful
            relationships. We want believers from different industries to
            connect and learn from one another.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Product Objectives</span>
          <h2 className="heading-serif mt-4 text-3xl">What the platform enables</h2>
          <div className="gold-divider mt-6" />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o, i) => (
            <Reveal key={o} delay={(i % 3) * 80}>
              <div className="flex items-start gap-3 rounded-xl border border-ink-700/60 bg-ink-800/40 p-5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                <span className="text-sm text-cream-100/80">{o}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ScriptureClosing />
      <SiteFooter />
    </>
  );
}

const objectives = [
  "Connect with believers around the world.",
  "Participate in geographical communities.",
  "Join professional and industry communities.",
  "Participate in focused discussion groups.",
  "Share knowledge, testimonies, experiences and useful information.",
  "Develop meaningful relationships.",
  "Find mentors and people who can guide them.",
  "Discover opportunities and resources.",
  "Grow spiritually and professionally.",
  "Collaborate with other believers.",
  "Contribute to their communities and organisations.",
  "Manifest the nature and influence of Christ.",
];

function ScriptureClosing() {
  return (
    <section className="container-page pb-24">
      <Reveal>
        <div className="card-surface mx-auto max-w-2xl p-10 text-center">
          <span className="eyebrow">Our Conviction</span>
          <blockquote className="heading-serif mt-5 text-2xl leading-relaxed">
            “Christ is not an additional feature of this platform. He is its
            foundation.”
          </blockquote>
        </div>
      </Reveal>
    </section>
  );
}
