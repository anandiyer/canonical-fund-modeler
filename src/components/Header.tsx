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
      id="header"
      className="fixed top-0 w-full bg-transparent z-50 transition-all duration-200"
      style={{
        backgroundColor: scrolled ? "rgba(30, 58, 138, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          <a href="https://canonical.cc" className="logo-link">
            <img
              src="https://canonical.cc/images/logo-rectangle-trans-short.svg"
              alt="Canonical"
              className="h-8 w-auto"
            />
          </a>
          <nav className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm transition tracking-[0.1em] hover:text-white"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                }}
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
