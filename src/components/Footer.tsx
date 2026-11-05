"use client";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-(--border)">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <div className="flex items-center gap-6 text-[11px] font-mono tracking-[0.06em] text-(--text-3)">
          <span>© {year} Blog</span>
          <span className="hidden md:inline h-px w-8 bg-(--border-strong)" />
          <span className="hidden md:inline">
            BUILT WITH NEXT.JS + TYPESCRIPT
          </span>
        </div>
        <div className="text-[11px] font-mono">
          <p className="inline-flex h-6 items-center rounded-full border px-2.5 text-[10px] tracking-[0.08em] border-(--border)">
            STATUS: OK
          </p>
        </div>
      </div>
    </footer>
  );
}
