"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const activeStyle = "font-medium text-(--text) underline underline-offset-4";
  const inActiveStyle = "font-normal text-(--text-2) hover:text-(--text)";

  return (
    <header
      className="sticky z-30 w-full border-b bg-(--bg)/80 backdrop-blur-md"
      style={{
        top: "var(--safe-area-inset-top)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-12">
        <div className="flex items-center gap-10">
          <Link href="/">
            <img src="/logo.png" alt="Logo" width={35} />
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/blog"
              className={`text-[13px] font-medium tracking-[-0.01em] text-(--text) ${
                isActive("/blog") ? activeStyle : inActiveStyle
              }`}
            >
              Blog
            </Link>
            <a
              href="https://github.com/PrakashSinghChoudhary"
              className="text-[13px] font-normal tracking-[-0.01em] text-(--text-2) hover:text-(--text) transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <Link
              href="/about"
              className={`text-[13px] font-medium tracking-[-0.01em] text-(--text) ${
                isActive("/about") ? activeStyle : inActiveStyle
              }`}
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-[0.08em] text-(--text-3)">
            <span className="h-1.25 w-1.25 rounded-full bg-[#22c55e] inline-block" />
            AVAILABLE FOR WORK
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-md border text-(--text-2) border-(--border)"
            aria-label="Toggle menu"
          >
            <span className="flex flex-col gap-0.75">
              <span
                className={`block h-px w-3.5 bg-current transition-all ${menuOpen ? "translate-y-0.5 rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-3.5 bg-current transition-all ${menuOpen ? "-translate-y-0.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4"
          style={{ borderColor: "var(--border)", background: "var(--bg)" }}
        >
          <nav className="flex flex-col gap-3">
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className={`text-(--text-2) ${
                isActive("/blog") ? activeStyle : inActiveStyle
              }`}
            >
              Blog
            </Link>
            <a
              href="https://github.com/PrakashSinghChoudhary"
              className="text-(--text-2)"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={`text-(--text-2) ${
                isActive("/about") ? activeStyle : inActiveStyle
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
