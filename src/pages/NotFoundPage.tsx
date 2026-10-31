import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import SiteFooter from "../components/SiteFooter";

export default function NotFoundPage() {
  return (
    <>
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
        <span className="font-serif text-7xl text-gold-400/40">404</span>
        <h1 className="heading-serif mt-4 text-3xl">Page not found</h1>
        <p className="mt-4 max-w-md text-cream-100/60">
          The page you are looking for does not exist or has moved. Let us guide
          you back home.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" /> Return Home
        </Link>
      </section>
      <SiteFooter />
    </>
  );
}
