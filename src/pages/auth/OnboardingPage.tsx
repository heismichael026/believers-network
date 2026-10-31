import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import Logo from "../../components/Logo";

interface Chapter {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  country: string | null;
}

const STAGES = [
  "Student",
  "Entrepreneur",
  "Professional",
  "Pastor / Ministry",
  "Business Owner",
  "Educator",
  "Healthcare",
  "Creative / Arts",
  "Trades / Skilled Labour",
  "Retired",
  "Other",
];

const VISIBILITY_OPTIONS = [
  {
    value: "public" as const,
    title: "Public",
    desc: "Your profile is visible to everyone on the platform.",
  },
  {
    value: "members" as const,
    title: "Members Only",
    desc: "Only signed-in members can view your profile.",
  },
  {
    value: "private" as const,
    title: "Private",
    desc: "Only you and your chapter members can see your profile.",
  },
];

export default function OnboardingPage() {
  const { session, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterFilter, setChapterFilter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [stage, setStage] = useState("");
  const [profession, setProfession] = useState("");
  const [interests, setInterests] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [visibility, setVisibility] = useState<"public" | "members" | "private">(
    "members"
  );

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data } = await supabase
        .from("chapters")
        .select("id, name, description, location, country")
        .order("name");
      if (data) setChapters(data as Chapter[]);
    })();

    if (profile) {
      setDisplayName(profile.display_name ?? "");
      setBio(profile.bio ?? "");
      setStage(profile.stage_of_life ?? "");
      setProfession(profile.profession ?? "");
      setInterests(profile.interests.join(", "));
      setLocation(profile.location ?? "");
      setCountry(profile.country ?? "");
      setSelectedChapter(profile.primary_chapter_id ?? "");
      setVisibility(profile.visibility);
    }
  }, [session, profile]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-900">
        <div className="skeleton h-8 w-48" />
      </div>
    );
  }

  if (!session) return <Navigate to="/signin" replace />;
  if (profile?.onboarding_completed) return <Navigate to="/dashboard" replace />;

  const filteredChapters = chapters.filter((c) => {
    const q = chapterFilter.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.location ?? "").toLowerCase().includes(q) ||
      (c.country ?? "").toLowerCase().includes(q)
    );
  });

  const saveProfileStep = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const interestArray = interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: session.user.id,
            display_name: displayName,
            bio: bio || null,
            stage_of_life: stage || null,
            profession: profession || null,
            interests: interestArray,
            onboarding_step: "location",
          },
          { onConflict: "id" }
        );

      if (upsertError) throw upsertError;
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const saveLocationStep = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          location: location || null,
          country: country || null,
          primary_chapter_id: selectedChapter || null,
          onboarding_step: "privacy",
        })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      if (selectedChapter) {
        const { data: existing } = await supabase
          .from("chapter_members")
          .select("id")
          .eq("user_id", session.user.id)
          .eq("chapter_id", selectedChapter)
          .maybeSingle();

        if (!existing) {
          await supabase.from("chapter_members").insert({
            user_id: session.user.id,
            chapter_id: selectedChapter,
            is_primary: true,
          });
        } else {
          await supabase
            .from("chapter_members")
            .update({ is_primary: true })
            .eq("id", existing.id);
        }
      }

      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save location.");
    } finally {
      setSubmitting(false);
    }
  };

  const finishOnboarding = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          visibility,
          onboarding_completed: true,
          onboarding_step: null,
        })
        .eq("id", session.user.id);

      if (updateError) throw updateError;
      await refreshProfile();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to finish onboarding.");
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { n: 1, icon: User, label: "Profile" },
    { n: 2, icon: MapPin, label: "Location & Chapter" },
    { n: 3, icon: Shield, label: "Privacy" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink-900">
      <div className="absolute inset-0 -z-10 bg-grain opacity-40" />
      <div className="absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold-400/8 blur-[120px]" />

      <div className="container-page py-12">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {/* Step indicator */}
        <div className="mx-auto mb-10 flex max-w-lg items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  step >= s.n
                    ? "border border-gold-400/40 bg-gold-400/10 text-gold-200"
                    : "border border-ink-600 text-cream-100/40"
                }`}
              >
                <s.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-px w-6 transition-colors sm:w-10 ${
                    step > s.n ? "bg-gold-400/40" : "bg-ink-600"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mx-auto mb-6 flex max-w-lg items-start gap-2 rounded-xl border border-clay-500/40 bg-clay-500/10 p-3 text-sm text-clay-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Profile */}
        {step === 1 && (
          <div className="mx-auto max-w-lg">
            <div className="card-surface p-8">
              <h1 className="heading-serif text-2xl">Tell us about yourself</h1>
              <p className="mt-2 text-sm text-cream-100/60">
                Your profile helps other believers find and connect with you.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void saveProfileStep();
                }}
                className="mt-8 space-y-5"
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                    Stage of Life
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors focus:border-gold-400/50 focus:bg-ink-800"
                  >
                    <option value="">Select...</option>
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                    Profession / Industry
                  </label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                    placeholder="e.g. Software Developer, Teacher, Doctor"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                    Interests
                  </label>
                  <input
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                    placeholder="Comma-separated, e.g. Music, Teaching, Football"
                  />
                  <p className="mt-1 text-xs text-cream-100/40">
                    Separate multiple interests with commas.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                    placeholder="A short introduction — your faith journey, what you do, what you hope to find in the network..."
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? "Saving..." : "Continue"}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Location & Chapter */}
        {step === 2 && (
          <div className="mx-auto max-w-lg">
            <div className="card-surface p-8">
              <h1 className="heading-serif text-2xl">Your location & chapter</h1>
              <p className="mt-2 text-sm text-cream-100/60">
                Choose your location so we can connect you with local fellowship.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void saveLocationStep();
                }}
                className="mt-8 space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                      City / Region
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                      placeholder="e.g. South London"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                      Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                      placeholder="e.g. United Kingdom"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
                    Choose Your Primary Chapter
                  </label>
                  <input
                    type="text"
                    value={chapterFilter}
                    onChange={(e) => setChapterFilter(e.target.value)}
                    className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 px-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                    placeholder="Search chapters by name, city or country..."
                  />

                  <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
                    {filteredChapters.length === 0 && (
                      <p className="py-4 text-center text-sm text-cream-100/40">
                        No chapters found.
                      </p>
                    )}
                    {filteredChapters.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedChapter(c.id)}
                        className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                          selectedChapter === c.id
                            ? "border-gold-400/50 bg-gold-400/10"
                            : "border-ink-600 bg-ink-800/40 hover:border-ink-500 hover:bg-ink-800/60"
                        }`}
                      >
                        <div
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                            selectedChapter === c.id
                              ? "border-gold-400 bg-gold-400"
                              : "border-ink-500"
                          }`}
                        >
                          {selectedChapter === c.id && (
                            <Check className="h-3 w-3 text-ink-950" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-cream-50">
                            {c.name}
                          </p>
                          {c.location && (
                            <p className="mt-0.5 text-xs text-cream-100/50">
                              {c.location}
                            </p>
                          )}
                          {c.description && (
                            <p className="mt-1 text-xs text-cream-100/40">
                              {c.description}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-ghost"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button type="submit" disabled={submitting} className="btn-primary flex-1">
                    {submitting ? "Saving..." : "Continue"}
                    {!submitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 3: Privacy */}
        {step === 3 && (
          <div className="mx-auto max-w-lg">
            <div className="card-surface p-8">
              <h1 className="heading-serif text-2xl">Set your privacy</h1>
              <p className="mt-2 text-sm text-cream-100/60">
                Decide how visible you are and how others can find you.
                You can change this anytime.
              </p>

              <form onSubmit={finishOnboarding} className="mt-8 space-y-5">
                <div className="space-y-3">
                  {VISIBILITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setVisibility(opt.value)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                        visibility === opt.value
                          ? "border-gold-400/50 bg-gold-400/10"
                          : "border-ink-600 bg-ink-800/40 hover:border-ink-500 hover:bg-ink-800/60"
                      }`}
                    >
                      <div
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                          visibility === opt.value
                            ? "border-gold-400 bg-gold-400"
                            : "border-ink-500"
                        }`}
                      >
                        {visibility === opt.value && (
                          <Check className="h-3 w-3 text-ink-950" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-cream-50">
                          {opt.title}
                        </p>
                        <p className="mt-0.5 text-xs text-cream-100/50">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-ghost"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button type="submit" disabled={submitting} className="btn-primary flex-1">
                    {submitting ? "Finishing..." : "Complete Onboarding"}
                    {!submitting && <Check className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
