import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Home } from "lucide-react";
import { useAuth } from "../lib/auth";
import Logo from "../components/Logo";

export default function AppLayout() {
  const { profile, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink-900">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-ink-700/70 bg-ink-900/85 backdrop-blur-md"
            : "border-b border-transparent bg-ink-900/50 backdrop-blur-sm"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between sm:h-20">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-gold-200"
                    : "text-cream-100/70 hover:text-cream-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <span className="text-sm text-cream-100/60">
              {profile?.display_name ?? "Member"}
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-4 py-2 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400/60 hover:text-gold-200"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-700 text-cream-100 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden">
            <nav className="container-page flex flex-col gap-1 border-t border-ink-700/70 bg-ink-900/95 py-4 backdrop-blur-md">
              <Link
                to="/"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-cream-100/80 hover:bg-ink-800/60"
              >
                <Home className="h-4 w-4" /> Public Site
              </Link>
              {navItems.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl px-4 py-3 text-base font-medium text-cream-100/80 hover:bg-ink-800/60"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="mt-2 flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-cream-100/80 hover:bg-ink-800/60"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-16 sm:pt-20">
        <Outlet />
      </main>
    </div>
  );
}
