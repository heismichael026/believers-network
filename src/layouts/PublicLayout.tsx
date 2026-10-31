import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../lib/auth";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/vision", label: "Vision" },
  { to: "/what-we-do", label: "What We Do" },
  { to: "/join", label: "Join" },
];

export default function PublicLayout() {
  const { session, profile, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink-900">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-ink-700/70 bg-ink-900/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between sm:h-20">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-gold-200"
                      : "text-cream-100/70 hover:text-cream-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <>
                <Link to="/dashboard" className="rounded-full px-4 py-2 text-sm font-medium text-cream-100/70 transition-colors hover:text-cream-50">
                  {profile?.display_name ?? "Dashboard"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-4 py-2 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400/60 hover:text-gold-200"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="rounded-full px-4 py-2 text-sm font-medium text-cream-100/70 transition-colors hover:text-cream-50">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Become a Member
                </Link>
              </>
            )}
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
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-ink-800 text-gold-200"
                        : "text-cream-100/80 hover:bg-ink-800/60"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {session ? (
                <>
                  <Link to="/dashboard" className="rounded-xl px-4 py-3 text-base font-medium text-cream-100/80 hover:bg-ink-800/60">
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="mt-2 flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-cream-100/80 hover:bg-ink-800/60">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="rounded-xl px-4 py-3 text-base font-medium text-cream-100/80 hover:bg-ink-800/60">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-primary mt-2 w-full">
                    Become a Member
                  </Link>
                </>
              )}
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
