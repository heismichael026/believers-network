import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../lib/auth";

export default function SignUpPage() {
  const { signUp, session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await signUp(email, password);
      navigate("/onboarding");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(
        msg.includes("already")
          ? "An account with this email already exists. Try signing in."
          : msg
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h1 className="heading-serif text-2xl">Create your account</h1>
        <p className="mt-2 text-sm text-cream-100/60">
          Join Believers Network and become part of a global community.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-100/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 pl-10 pr-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-100/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 pl-10 pr-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-300">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-100/40" />
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-ink-600 bg-ink-800/60 py-3 pl-10 pr-4 text-sm text-cream-50 outline-none transition-colors placeholder:text-cream-100/30 focus:border-gold-400/50 focus:bg-ink-800"
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-clay-500/40 bg-clay-500/10 p-3 text-sm text-clay-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full"
          >
            {submitting ? "Creating account..." : "Create Account"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-cream-100/60">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-gold-200 transition-colors hover:text-gold-100"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
