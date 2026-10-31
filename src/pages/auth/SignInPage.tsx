import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../lib/auth";

export default function SignInPage() {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/dashboard" replace />;

  const from =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(
        msg.includes("Invalid login")
          ? "Invalid email or password."
          : msg
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h1 className="heading-serif text-2xl">Welcome back</h1>
        <p className="mt-2 text-sm text-cream-100/60">
          Sign in to your Believers Network account.
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
                placeholder="Your password"
                autoComplete="current-password"
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
            {submitting ? "Signing in..." : "Sign In"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-cream-100/60">
          New to Believers Network?{" "}
          <Link
            to="/signup"
            className="font-semibold text-gold-200 transition-colors hover:text-gold-100"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
