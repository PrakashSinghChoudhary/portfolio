"use client";
import { useState } from "react";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import Reveal from "@/components/Reveal";

export type Post = {
  id: string;
  date: string;
  isoDate: string;
  tag: string;
  topicGroup: string;
  title: string;
  excerpt: string;
  read: string;
  href: string;
  featured?: boolean;
};

const POSTS: Post[] = [
  {
    id: "01",
    date: "NOV 12, 2026",
    isoDate: "2026-11-12",
    tag: "CREATIONAL PATTERNS",
    topicGroup: "Creational Patterns",
    title: "Singleton Pattern: Taming the Global Instance",
    excerpt:
      "How to implement thread-safe, compile-time verified singletons in TypeScript, why global state creates testing nightmares, and how to refactor cleanly toward Dependency Injection.",
    read: "10 MIN",
    href: "/blog/system-design/creational-patterns/singleton",
    featured: true,
  },
  {
    id: "02",
    date: "NOV 12, 2026",
    isoDate: "2026-11-12",
    tag: "CREATIONAL PATTERNS",
    topicGroup: "Creational Patterns",
    title: "Factory Method: Decoupling Object Creation",
    excerpt:
      "Stop hardcoding 'new' in your business logic. Let creator subclasses and parameterized registry factories handle dynamic instantiations cleanly without tight coupling.",
    read: "12 MIN",
    href: "/blog/system-design/creational-patterns/factory-method",
  },
  {
    id: "03",
    date: "NOV 13, 2026",
    isoDate: "2026-11-13",
    tag: "OBJECT-ORIENTED DESIGN",
    topicGroup: "Object-Oriented Design",
    title: "Encapsulation: Guarding State & Boundaries",
    excerpt:
      "Why bundling data with methods is only the starting point. Discover how encapsulation enforces state invariants, shields business logic, and guards domain entities against leaky abstractions in TypeScript.",
    read: "12 MIN",
    href: "/blog/system-design/object-oriented-programming/encapsulation",
  },
  {
    id: "04",
    date: "NOV 12, 2026",
    isoDate: "2026-11-12",
    tag: "OBJECT-ORIENTED DESIGN",
    topicGroup: "Object-Oriented Design",
    title: "Introduction to Object-Oriented Programming",
    excerpt:
      "From procedural chaos to cohesive domain entities: a deep dive into encapsulation, abstraction, composition over inheritance, and polymorphism in TypeScript.",
    read: "14 MIN",
    href: "/blog/system-design/object-oriented-programming/introduction-to-object-oriented-programming",
  },
  {
    id: "05",
    date: "NOV 11, 2026",
    isoDate: "2026-11-11",
    tag: "SYSTEM DESIGN",
    topicGroup: "System Design",
    title: "Load Balancer: High-Availability Traffic Distribution",
    excerpt:
      "How Layer 4 and Layer 7 load balancers orchestrate incoming user requests across server fleets to prevent bottlenecks and eliminate single points of failure.",
    read: "13 MIN",
    href: "/blog/system-design/general/load-balancer",
  },
  {
    id: "06",
    date: "NOV 05, 2026",
    isoDate: "2026-11-05",
    tag: "SYSTEM DESIGN",
    topicGroup: "System Design",
    title: "API Gateway: The Architectural Shield",
    excerpt:
      "Centralizing authentication, rate limiting, request routing, and payload aggregation in front of monolithic and microservices backends.",
    read: "14 MIN",
    href: "/blog/system-design/general/api-gateway",
  },
  {
    id: "07",
    date: "NOV 07, 2026",
    isoDate: "2026-11-07",
    tag: "DISTRIBUTED SYSTEMS",
    topicGroup: "Distributed Systems",
    title: "CAP Theorem: Making Distributed Trade-Offs",
    excerpt:
      "When network partitions inevitably occur, who gets sacrificed: consistency or availability? Real-world analysis from MongoDB to Cassandra.",
    read: "09 MIN",
    href: "/blog/system-design/database/cap-theorem",
  },
  {
    id: "08",
    date: "NOV 17, 2026",
    isoDate: "2026-11-17",
    tag: "GOLANG",
    topicGroup: "Golang",
    title: "Introduction to Golang: Simple, Fast & Concurrent",
    excerpt:
      "A systems developer's guide to Go: radical simplicity, pointer semantics without pointer arithmetic, interface polymorphism, and native concurrency with goroutines and channels.",
    read: "12 MIN",
    href: "/blog/golang",
  },
];

const TOPICS = [
  { name: "All", count: 8 },
  { name: "Creational Patterns", count: 2 },
  { name: "System Design", count: 2 },
  { name: "Object-Oriented Design", count: 2 },
  { name: "Distributed Systems", count: 1 },
  { name: "Golang", count: 1 },
];

const SINGLETON_HERO_CODE = `class DatabaseConnectionPool {
  private static instance: DatabaseConnectionPool | null = null;
  private readonly poolId: string;
  private activeConnections = 0;

  private constructor() {
    this.poolId = Math.random().toString(36).substring(2, 9);
  }

  public static getInstance(): DatabaseConnectionPool {
    if (!DatabaseConnectionPool.instance) {
      DatabaseConnectionPool.instance = new DatabaseConnectionPool();
    }
    return DatabaseConnectionPool.instance;
  }

  public query(sql: string): { status: string; poolId: string } {
    this.activeConnections++;
    return { status: "OK", poolId: this.poolId };
  }
}

const db1 = DatabaseConnectionPool.getInstance();
const db2 = DatabaseConnectionPool.getInstance();

console.log(db1 === db2);`;

const SIDEBAR_SNIPPET_CODE = `type PaymentProvider = "stripe" | "paypal" | "crypto";

const registry = new Map<PaymentProvider, () => PaymentProcessor>();

registry.set("stripe", () => new StripeProcessor());
registry.set("paypal", () => new PayPalProcessor());

export function getProcessor(provider: PaymentProvider): PaymentProcessor {
  const factory = registry.get(provider);
  if (!factory) {
    throw new Error(\`Unsupported: \${provider}\`);
  }
  return factory();
}`;

export default function BlogPage() {
  const [activeTopic, setActiveTopic] = useState("All");

  const featured = POSTS.find((p) => p.featured)!;

  const postsToShow =
    activeTopic === "All"
      ? POSTS.filter((p) => !p.featured)
      : POSTS.filter(
        (p) => p.topicGroup.toLowerCase() === activeTopic.toLowerCase()
      );

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
      {/* FEATURED HERO SECTION */}
      <section className="grid grid-cols-12 gap-0 border-b pb-16 pt-10 md:pt-16 lg:pt-[72px] border-(--border)">
        {/* Left Meta & Headline */}
        <div className="col-span-12 lg:col-span-5 lg:pr-12">
          <Reveal delay={40}>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono tracking-[0.1em] text-(--text-3)">
              <span className="inline-flex items-center gap-2 rounded-full border border-(--border-strong) bg-(--bg-2) px-2.5 py-[3px] text-[10px] font-medium tracking-[0.08em] text-(--text)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--text)" />
                FEATURED ARTICLE
              </span>
              <span>{featured.date}</span>
              <span className="h-[1px] w-6 bg-(--border-strong)" />
              <span className="text-(--text-2)">{featured.read}</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[46px] lg:text-[50px] text-(--text)">
              <Link
                href={featured.href}
                className="hover:underline underline-offset-4 transition-all"
              >
                {featured.title}
              </Link>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 text-[15px] leading-[1.65] text-(--text-2) md:text-[16px]">
              {featured.excerpt}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={featured.href}
                className="group inline-flex h-[36px] items-center gap-2 rounded-full bg-(--text) px-5 text-[12px] font-medium tracking-[-0.01em] text-(--bg) transition-opacity hover:opacity-90"
              >
                Read Full Article
                <span className="transition-transform group-hover:translate-x-[2px]">
                  →
                </span>
              </Link>
              <span className="text-[11px] font-mono tracking-[0.08em] text-(--text-3)">
                {featured.tag}
              </span>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-12 hidden lg:flex items-center gap-2 text-[11px] font-mono text-(--text-3)">
              <div className="h-px w-12 bg-(--border-strong)" />
              SCROLL FOR ARCHIVE
            </div>
          </Reveal>
        </div>

        {/* Right Code Block */}
        <div className="col-span-12 mt-10 lg:col-span-7 lg:mt-0 lg:pl-8">
          <Reveal delay={120}>
            <CodeBlock
              filename="DatabaseConnectionPool.ts"
              langLabel="TypeScript"
              code={SINGLETON_HERO_CODE}
              className="my-0 shadow-xs"
            />
          </Reveal>
        </div>
      </section>

      {/* MAIN CONTENT + SIDEBAR */}
      <div className="grid grid-cols-12 gap-0">
        {/* Main Article List */}
        <main
          id="writing"
          className="col-span-12 lg:col-span-8 lg:border-r lg:pr-10 border-(--border)"
        >
          {/* List Header */}
          <Reveal delay={0}>
            <div className="flex items-center justify-between border-b py-6 border-(--border)">
              <div className="flex items-center gap-3">
                <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase">
                  Articles &amp; Essays
                </h2>
                <span className="text-[11px] font-mono text-(--text-3)">
                  / {postsToShow.length} {postsToShow.length === 1 ? "POST" : "POSTS"}
                </span>
              </div>
              <div className="hidden items-center gap-2 md:flex text-[11px] font-mono text-(--text-3)">
                <span>SORT:</span>
                <span className="text-(--text) underline decoration-(--border-strong) underline-offset-4">
                  CHRONOLOGICAL
                </span>
              </div>
            </div>
          </Reveal>

          {/* Article List Items */}
          <div className="divide-y border-(--border)">
            {postsToShow.map((post, idx) => (
              <Reveal key={post.id} delay={idx * 50}>
                <article
                  className="group relative flex gap-6 py-8 md:gap-8 md:py-10 transition-colors hover:bg-(--bg-2)/60 -mx-3 px-3 md:-mx-4 md:px-4 lg:-mx-6 lg:px-6 rounded-xl"
                >
                  {/* Desktop Meta Column */}
                  <div className="hidden shrink-0 flex-col items-start gap-1 pt-1 md:flex w-[100px]">
                    <span className="text-[10px] font-mono tracking-[0.08em] text-(--text-3)">
                      {post.id}
                    </span>
                    <span className="text-[11px] font-mono leading-[1.2] text-(--text-3)">
                      {post.date}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex h-[20px] items-center rounded-sm border bg-(--bg) px-2 text-[10px] font-medium tracking-[0.08em] text-(--text-2) border-(--border)">
                        {post.tag}
                      </span>
                      <span className="text-[11px] font-mono text-(--text-3) md:hidden">
                        {post.date} • {post.read}
                      </span>
                      <span className="hidden text-[11px] font-mono text-(--text-3) md:inline">
                        {post.read}
                      </span>
                    </div>

                    <h3 className="mt-3 text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[22px] text-(--text)">
                      <Link
                        href={post.href}
                        className="hover:underline underline-offset-4 transition-all"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 max-w-[56ch] text-[14px] leading-[1.65] text-(--text-2)">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-(--text-3)">
                      <span className="inline-block h-px w-6 bg-(--border-strong) group-hover:w-10 group-hover:bg-(--text) transition-all" />
                      <Link
                        href={post.href}
                        className="group-hover:text-(--text) transition-colors flex items-center gap-1 font-medium text-(--text-2)"
                      >
                        READ ARTICLE →
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Bottom Archive Nav */}
          <Reveal delay={0}>
            <div className="flex items-center justify-between border-y py-6 text-[11px] font-mono border-(--border)">
              <span className="text-(--text-3)">ENGINEERING ARCHIVE</span>
              <div className="flex gap-4">
                <a
                  href="#writing"
                  className="hover:text-(--text) hover:underline underline-offset-4"
                >
                  TOP OF ARCHIVE ↑
                </a>
                <Link
                  href="/"
                  className="hover:text-(--text) hover:underline underline-offset-4"
                >
                  HOME PORTFOLIO →
                </Link>
              </div>
            </div>
          </Reveal>
        </main>

        {/* Sidebar */}
        <aside
          id="about"
          className="col-span-12 lg:col-span-4 lg:pl-10 pt-10 lg:pt-0"
        >
          <div className="lg:sticky lg:top-[80px]">
            {/* Author / Engineering Profile */}
            <Reveal delay={40}>
              <div className="border-b py-8 border-(--border)">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full border-2 border-(--text) bg-(--bg-2) flex items-center justify-center font-mono text-[13px] font-bold text-(--text)">
                    P
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold tracking-[-0.01em] text-(--text)">
                      Prakash Choudhary
                    </h4>
                    <p className="mt-1 font-mono text-[11px] text-(--text-2)">
                      Senior Full-Stack Engineer
                    </p>
                    <p className="mt-2.5 max-w-[30ch] text-[13px] leading-[1.6] text-(--text-2)">
                      Notes on distributed systems, design patterns, and full-stack software architecture with React, TypeScript, and Express.js.
                    </p>
                    <div className="mt-3 flex gap-2 font-mono text-[11px]">
                      <a
                        href="https://github.com/PrakashSinghChoudhary"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 decoration-(--border-strong) hover:text-(--text) transition-colors"
                      >
                        GITHUB
                      </a>
                      <span className="text-(--border-strong)">/</span>
                      <Link
                        href="/"
                        className="underline underline-offset-4 decoration-(--border-strong) hover:text-(--text) transition-colors"
                      >
                        PORTFOLIO
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Topic Filter Pills */}
            <Reveal delay={100}>
              <div className="border-b py-8 border-(--border)">
                <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-(--text-3)">
                  TOPICS
                </h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => {
                        setActiveTopic(t.name);
                        document.getElementById("writing")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-[6px] text-[12px] font-[450] tracking-[-0.01em] transition-all cursor-pointer ${activeTopic === t.name
                        ? "bg-(--text) text-(--bg) border-(--text)"
                        : "bg-(--bg) text-(--text-2) border-(--border) hover:border-(--border-strong) hover:text-(--text)"
                        }`}
                    >
                      {t.name}
                      <span
                        className={`text-[10px] font-mono ${activeTopic === t.name
                          ? "text-(--bg)/80"
                          : "text-(--text-3)"
                          }`}
                      >
                        {t.count}
                      </span>
                    </button>
                  ))}
                </div>
                {activeTopic !== "All" && (
                  <div className="mt-3 text-[11px] font-mono text-(--text-3)">
                    Filtering by{" "}
                    <span className="text-(--text) font-medium">{activeTopic}</span> —{" "}
                    <button
                      onClick={() => setActiveTopic("All")}
                      className="underline underline-offset-4 hover:text-(--text) cursor-pointer"
                    >
                      show all
                    </button>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Sidebar Latest Snippet */}
            <Reveal delay={160}>
              <div id="snippets" className="py-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-(--text-3)">
                    LATEST PATTERN SNIPPET
                  </h4>
                  <Link
                    href="/blog/system-design/creational-patterns/factory-method"
                    className="text-[10px] font-mono text-(--text-2) hover:text-(--text) hover:underline"
                  >
                    Factory Method →
                  </Link>
                </div>
                <CodeBlock
                  filename="registry-factory.ts"
                  langLabel="TypeScript"
                  code={SIDEBAR_SNIPPET_CODE}
                  className="mt-4 mb-0"
                />
              </div>
            </Reveal>
          </div>
        </aside>
      </div>
    </div>
  );
}
