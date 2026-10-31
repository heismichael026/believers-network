import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import { PageHeader } from "./AboutPage";
import {
  Globe2,
  Users,
  MessagesSquare,
  Briefcase,
  GraduationCap,
  BookOpen,
  HeartHandshake,
  Compass,
  Megaphone,
  Search,
} from "lucide-react";

type Module = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const modules: Module[] = [
  {
    icon: Globe2,
    title: "Geographical Communities",
    body: "Chapters and branches rooted in your location — local fellowship that shares a global identity in Christ.",
  },
  {
    icon: Briefcase,
    title: "Professional & Industry Communities",
    body: "Connect with believers in your field, exchange knowledge, and grow in excellence together.",
  },
  {
    icon: MessagesSquare,
    title: "Discussion Groups",
    body: "Focused conversations around shared interests, callings, and questions of life and faith.",
  },
  {
    icon: Users,
    title: "Profiles & Connections",
    body: "A profile rooted in identity in Christ, and meaningful connections across the body.",
  },
  {
    icon: Megaphone,
    title: "Posts, Comments & Feed",
    body: "Share testimonies, insights and encouragement. A feed shaped by your communities.",
  },
  {
    icon: HeartHandshake,
    title: "Mentorship & Relationships",
    body: "Find mentors and guides. Offer guidance to those coming behind you.",
  },
  {
    icon: Search,
    title: "Opportunities & Resources",
    body: "Discover opportunities, resources and tools to grow spiritually and professionally.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    body: "Learn from believers across denominations, industries and stages of life.",
  },
  {
    icon: Compass,
    title: "Guidance for Purpose",
    body: "Become better equipped to fulfil your God-given purpose in every sphere.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="A community and ecosystem for God's children"
        lead="Every major feature of the platform exists to serve a purpose — not generic social networking, but the identity, development, fellowship and influence of believers."
      />

      <section className="container-page py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 80}>
              <article className="card-surface group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20 transition-colors group-hover:bg-gold-400/20">
                  <m.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-lg text-cream-50">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/60">
                  {m.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <div className="card-surface mx-auto max-w-3xl p-10 text-center">
            <GraduationCap className="mx-auto h-10 w-10 text-gold-300" />
            <h2 className="heading-serif mt-5 text-2xl sm:text-3xl">
              Every feature serves the purpose
            </h2>
            <p className="mt-4 text-cream-100/65">
              We do not reduce this vision to generic social networking. Each
              module — communities, mentorship, opportunities, communication —
              exists to help believers connect, grow, mature and manifest the
              nature and influence of Christ.
            </p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  );
}
