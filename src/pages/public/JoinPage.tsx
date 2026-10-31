import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import { PageHeader } from "./AboutPage";
import { ArrowRight, Check } from "lucide-react";
import { useAuth } from "../../lib/auth";

export default function JoinPage() {
  const { session } = useAuth();

  return (
    <>
      <PageHeader
        eyebrow="Join"
        title="Become a member of Believers Network"
        lead="Membership is open to believers from every denomination, profession and stage of life. Registration, email verification and onboarding open the door to the community."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="heading-serif text-3xl">What to expect</h2>
            <div className="gold-divider mt-5" />
            <ol className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/40 font-serif text-sm text-gold-200">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-cream-50">{s.t}</h3>
                    <p className="mt-1 text-sm text-cream-100/60">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-surface p-7">
              <h3 className="font-serif text-xl text-cream-50">
                A place for every believer
              </h3>
              <p className="mt-3 text-sm text-cream-100/65">
                A student, an entrepreneur, a pastor, a software developer, a
                teacher, a doctor and an experienced professional should all
                feel equally welcomed and valued as members of the body of
                Christ.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-cream-100/80">
                {[
                  "No preference by titles, status or achievements",
                  "Christ-centred community culture",
                  "Spiritual growth and professional development together",
                  "Global connections with local fellowship",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <div className="card-surface mx-auto max-w-2xl p-10 text-center">
            <h2 className="heading-serif text-2xl sm:text-3xl">
              {session ? "Continue your journey" : "Registration is open"}
            </h2>
            <p className="mt-4 text-cream-100/65">
              {session
                ? "You are already a member. Head to your dashboard to explore the community and connect with other believers."
                : "Create your account, complete your profile, choose your chapter, and configure your privacy — all in a guided onboarding flow."}
            </p>
            {session ? (
              <a href="/dashboard" className="btn-primary mt-8">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <a href="/signup" className="btn-primary mt-8">
                Create Your Account <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  );
}

const steps = [
  {
    t: "Register your account",
    d: "Create your account with your email and a password. Email verification keeps the community trustworthy.",
  },
  {
    t: "Complete your profile",
    d: "Share who you are — your stage of life, profession, interests and what you hope to find in the network.",
  },
  {
    t: "Choose your location & primary chapter",
    d: "Select your geographical location so the platform can assign your primary chapter and connect you locally.",
  },
  {
    t: "Set your privacy",
    d: "Decide how visible you are and how others can reach you. You are in control of your experience.",
  },
];
