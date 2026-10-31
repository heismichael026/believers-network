import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink-900">
      <div className="absolute inset-0 -z-10 bg-grain opacity-40" />
      <div className="absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold-400/8 blur-[120px]" />

      <div className="container-page flex min-h-screen flex-col items-center justify-center py-12">
        <div className="mb-8">
          <Logo />
        </div>

        <div className="w-full max-w-md">{children}</div>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-cream-100/50 transition-colors hover:text-gold-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </div>
  );
}
