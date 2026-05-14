import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "ABOUT", href: "https://canonical.cc/#about" },
  { label: "THESIS", href: "https://canonical.cc/#thesis" },
  { label: "PORTFOLIO", href: "https://canonical.cc/portfolio" },
  { label: "TEAM", href: "https://canonical.cc/#team" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled ? "backdrop-blur" : ""
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(30, 58, 138, 0.95)" : "transparent",
      }}
    >
      <div className="container mx-auto px-6 sm:px-8 py-6 sm:py-7">
        <div className="flex items-center justify-between gap-4">
          <a
            href="https://canonical.cc"
            className="inline-flex items-baseline gap-3 hover:opacity-90 transition"
          >
            <img
              src="https://canonical.cc/images/logo-rectangle-trans-short.svg"
              alt="Canonical"
              className="h-8 w-auto"
            />
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/80 hover:text-white transition tracking-[0.1em]"
                style={{ fontWeight: 500 }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
