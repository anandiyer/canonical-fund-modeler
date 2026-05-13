import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function InputSection({ title, subtitle, defaultOpen = true, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="border-b border-rule">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-canvas/60"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted font-medium">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs text-ink-faint mt-0.5">{subtitle}</div>
          )}
        </div>
        <span
          className="text-ink-faint text-sm transition-transform"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          ›
        </span>
      </button>
      {open && <div className="px-5 pb-5 pt-1 space-y-3">{children}</div>}
    </section>
  );
}
