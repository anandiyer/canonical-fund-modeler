export function Header() {
  return (
    <header className="bg-navy text-white border-b border-navy-soft/60">
      <div className="mx-auto max-w-[1600px] px-6 py-3 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <a
            href="https://canonical.cc"
            target="_blank"
            rel="noreferrer"
            className="text-base font-medium tracking-tight hover:opacity-80"
          >
            canonical
          </a>
          <span className="text-white/40">·</span>
          <span className="text-base font-light text-white/80">
            fundmodeler
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-xs text-white/70">
          <a
            href="https://canonical.cc"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            canonical.cc
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            github
          </a>
        </div>
      </div>
    </header>
  );
}
