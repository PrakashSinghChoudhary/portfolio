"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Frontend" | "Mobile" | "Backend";
  tags: string[];
  link: string;
  github: string;
  stats: string;
  previewType: "web" | "mobile" | "terminal";
  badge: string;
  displayUrl: string;
  image?: string;
  secondaryImage?: string;
  icon?: string;
  ctaText?: string;
}

interface ArticleLink {
  title: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  date: string;
}

const PROJECTS: Project[] = [
  {
    id: "memory-game",
    title: "Memory Game",
    tagline: "Interactive 3D Card-Matching Recall Game with Web Audio Synthesis",
    description:
      "A sleek, tactile visual recall game built with React 19 and Tailwind CSS v4. Features 3 difficulty grid levels (Casual 4×4 to Master 8×8), 4 thematic emoji card decks, smooth 3D CSS perspective card flips, real-time Web Audio API sound synthesis, local storage personal bests, and HTML5 canvas celebration confetti.",
    category: "Frontend",
    tags: [
      "React 19",
      "Vite 8",
      "Tailwind CSS v4",
      "Web Audio API",
      "HTML5 Canvas",
      "TypeScript",
    ],
    link: "https://memory-game.singhprakashchoudhary.workers.dev/",
    github: "https://github.com/PrakashSinghChoudhary/memory-game",
    stats: "3D CSS Transforms • Web Audio • 60 FPS",
    previewType: "web",
    badge: "Live Web App",
    displayUrl: "memory-game.workers.dev",
    image: "/projects/memory-game-demo.gif",
    ctaText: "Play Live Game ↗",
  },
  {
    id: "docket",
    title: "Docket",
    tagline: "Minimalist Daily Task Tracker & Recurring Interval Reminder Companion",
    description:
      "A modern cross-platform productivity mobile companion combining daily task planning with lightweight recurring interval alarms. Features intelligent midnight rollover detection, background-to-foreground app state management, custom chime intervals with native audio playback, and an offline-first monthly calendar archive.",
    category: "Mobile",
    tags: [
      "React Native",
      "Expo SDK 58",
      "Expo Router",
      "TypeScript",
      "AsyncStorage",
      "Expo Audio",
      "Expo Notifications",
    ],
    link: "https://github.com/PrakashSinghChoudhary/docket",
    github: "https://github.com/PrakashSinghChoudhary/docket",
    stats: "iOS • Android • Web • Offline-First",
    previewType: "mobile",
    badge: "Cross-Platform Mobile",
    displayUrl: "docket / expo-sdk-58",
    image: "/projects/docket-screenshot-3.png",
    secondaryImage: "/projects/docket-screenshot-4.png",
    icon: "/projects/docket-icon.png",
    ctaText: "View on GitHub ↗",
  },
  {
    id: "learn-go",
    title: "Learn Go",
    tagline: "Hands-On Systems & Concurrency Programming with Idiomatic Go",
    description:
      "A comprehensive, 11-chapter hands-on curriculum mastering Go (Golang) fundamentals and backend systems architecture. Covers memory addresses and pointer semantics, slice capacity management, struct methods, interface polymorphism, defer/panic recovery, and concurrent execution pipelines with Goroutines, WaitGroups, and Channels.",
    category: "Backend",
    tags: [
      "Go / Golang",
      "Concurrency",
      "Goroutines",
      "Channels",
      "Pointers",
      "Interfaces",
      "Memory Management",
    ],
    link: "https://github.com/PrakashSinghChoudhary/learn-go",
    github: "https://github.com/PrakashSinghChoudhary/learn-go",
    stats: "11 Modules • Concurrency & Channels • Go 1.24",
    previewType: "terminal",
    badge: "Backend & Systems",
    displayUrl: "github.com/.../learn-go",
    ctaText: "Explore Curriculum ↗",
  },
];

const ARTICLES: ArticleLink[] = [
  {
    title: "Load Balancer: High-Availability Traffic Distribution",
    description:
      "How Layer 4 and Layer 7 load balancers orchestrate incoming user requests across server fleets to prevent bottlenecks and eliminate single points of failure.",
    category: "System Design",
    readTime: "13 MINS",
    href: "/blog/system-design/general/load-balancer",
    date: "NOV 2026",
  },
  {
    title: "API Gateway: The Architectural Shield",
    description:
      "Centralizing authentication, rate limiting, request routing, and payload aggregation in front of monolithic and microservices backends.",
    category: "System Design",
    readTime: "14 MINS",
    href: "/blog/system-design/general/api-gateway",
    date: "NOV 2026",
  },
  {
    title: "CAP Theorem: Making Distributed Trade-Offs",
    description:
      "When network partitions inevitably occur, who gets sacrificed: consistency or availability? Real-world analysis from MongoDB to Cassandra.",
    category: "Database",
    readTime: "09 MINS",
    href: "/blog/system-design/database/cap-theorem",
    date: "NOV 2026",
  },
  {
    title: "Singleton Pattern: Taming the Global Instance",
    description:
      "How to implement thread-safe, compile-time verified singletons in TypeScript, and why Dependency Injection offers a superior lifecycle model.",
    category: "Creational Patterns",
    readTime: "10 MINS",
    href: "/blog/system-design/creational-patterns/singleton",
    date: "NOV 2026",
  },
  {
    title: "Factory Method: Decoupling Object Creation",
    description:
      "Stop hardcoding 'new' in your business logic. Let creator subclasses and parameterized registry factories handle dynamic instantiations cleanly.",
    category: "Creational Patterns",
    readTime: "12 MINS",
    href: "/blog/system-design/creational-patterns/factory-method",
    date: "NOV 2026",
  },
  {
    title: "Encapsulation: Guarding State & Boundaries",
    description:
      "Why bundling data with methods is only the beginning. Enforcing state invariants, compile vs. runtime privacy, and stopping leaky abstractions in TypeScript.",
    category: "Object-Oriented Design",
    readTime: "12 MINS",
    href: "/blog/system-design/object-oriented-programming/encapsulation",
    date: "NOV 2026",
  },
  {
    title: "Introduction to Object-Oriented Programming",
    description:
      "From procedural chaos to cohesive domain entities: a deep dive into encapsulation, abstraction, composition over inheritance, and polymorphism in TypeScript.",
    category: "Software Engineering",
    readTime: "14 MINS",
    href: "/blog/system-design/object-oriented-programming/introduction-to-object-oriented-programming",
    date: "NOV 2026",
  },
  {
    title: "Introduction to Golang: Simple, Fast & Concurrent",
    description:
      "A systems developer&apos;s guide to Go: radical simplicity, pointer semantics without pointer arithmetic, interface polymorphism, and native concurrency with goroutines and channels.",
    category: "Systems Programming",
    readTime: "12 MINS",
    href: "/blog/golang",
    date: "NOV 2026",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-(--bg) text-(--text)">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {/* HERO SECTION */}
        <section className="border-b pb-16 pt-12 md:pb-24 md:pt-20 border-(--border)">
          <div className="max-w-4xl">
            {/* Minimalist Top Meta Badges */}
            <Reveal delay={40} duration={600}>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-(--text-3)">
                <span className="inline-flex items-center gap-2 rounded-full border border-(--border-strong) bg-(--bg-2) px-3 py-1 text-(--text) font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-(--text)" />
                  AVAILABLE FOR OPPORTUNITIES
                </span>
                <span className="hidden sm:inline text-(--border-strong)">/</span>
                <span className="text-(--text-2)">7+ YEARS OF EXPERIENCE</span>
                <span className="hidden sm:inline text-(--border-strong)">/</span>
                <span className="text-(--text-3)">JAVASCRIPT • TYPESCRIPT • REACT • EXPRESS.JS</span>
              </div>
            </Reveal>

            {/* BIGGER AVATAR & NAME SECTION */}
            <Reveal delay={120} duration={650}>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                {/* Large Minimalist Avatar in Crisp Monochrome */}
                <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
                  <div className="h-full w-full rounded-full p-1 border-2 border-(--border-strong) bg-(--bg-2) shadow-xs">
                    <Image
                      src="/Prakash Choudhary.original.JPG"
                      alt="Prakash Choudhary"
                      width={160}
                      height={160}
                      className="h-full w-full rounded-full object-cover object-[50%_25%]"
                      priority
                    />
                  </div>
                  <span
                    className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-(--bg) bg-(--text)"
                    title="Available for work"
                  />
                </div>

                {/* Big Name & Distinctive Subtitle */}
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--text-3) font-semibold">
                    Senior Full-Stack Engineer
                  </span>
                  <h1 className="mt-1 text-[38px] sm:text-[52px] md:text-[64px] font-bold tracking-[-0.04em] leading-[1.05] text-(--text)">
                    Prakash Choudhary
                  </h1>
                  <p className="mt-2 text-[15px] sm:text-[17px] text-(--text-2) font-mono">
                    JavaScript • TypeScript • React • Express.js
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Main Headline */}
            <Reveal delay={200} duration={700}>
              <h2 className="mt-10 text-[32px] sm:text-[46px] md:text-[56px] lg:text-[62px] font-semibold leading-[1.1] tracking-[-0.03em] text-(--text)">
                Crafting scalable web systems &amp; clean, resilient software.
              </h2>
            </Reveal>

            {/* Sub-headline */}
            <Reveal delay={280} duration={700}>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-(--text-2) md:text-[19px]">
                With over 7 years across production systems, I design and ship
                applications that balance buttery-smooth frontend experiences in{" "}
                <strong className="text-(--text) font-medium">React</strong> and{" "}
                <strong className="text-(--text) font-medium">Next.js</strong> with
                fault-tolerant, high-throughput backend services in{" "}
                <strong className="text-(--text) font-medium">Express.js</strong> and{" "}
                <strong className="text-(--text) font-medium">TypeScript</strong>.
              </p>
            </Reveal>

            {/* Minimalist CTA Buttons */}
            <Reveal delay={360} duration={700}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-(--text) px-6 text-[13px] font-medium text-(--bg) transition-opacity hover:opacity-90"
                >
                  View Selected Work ↓
                </a>
                <Link
                  href="/blog"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-(--border) bg-(--bg) px-6 text-[13px] font-medium text-(--text) hover:border-(--text) transition-colors"
                >
                  Read Technical Blog →
                </Link>
                <a
                  href="https://github.com/PrakashSinghChoudhary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-(--border) bg-(--bg) px-5 text-[13px] font-mono text-(--text-2) hover:text-(--text) hover:border-(--border-strong) transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            </Reveal>
          </div>

          {/* Minimalist Metrics Grid */}
          <Reveal delay={440} duration={700}>
            <div className="mt-16 grid grid-cols-2 gap-4 border-t pt-10 sm:grid-cols-4 border-(--border)">
              <div className="border-l-2 border-(--text) pl-4">
                <div className="text-[30px] font-semibold tracking-tight text-(--text) md:text-[36px]">
                  7+
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.08em] text-(--text-3)">
                  YEARS EXPERIENCE
                </div>
              </div>
              <div className="border-l-2 border-(--border-strong) pl-4">
                <div className="text-[30px] font-semibold tracking-tight text-(--text) md:text-[36px]">
                  React &amp; TS
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.08em] text-(--text-3)">
                  PRIMARY SPECIALTY
                </div>
              </div>
              <div className="border-l-2 border-(--border-strong) pl-4">
                <div className="text-[30px] font-semibold tracking-tight text-(--text) md:text-[36px]">
                  Express.js
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.08em] text-(--text-3)">
                  API ARCHITECTURE
                </div>
              </div>
              <div className="border-l-2 border-(--border-strong) pl-4">
                <div className="text-[30px] font-semibold tracking-tight text-(--text) md:text-[36px]">
                  99.9%
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.08em] text-(--text-3)">
                  UPTIME MINDSET
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CORE CAPABILITIES & STACK */}
        <section className="border-b py-16 md:py-20 border-(--border)">
          <Reveal delay={0}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] tracking-[0.14em] text-(--text-3) font-semibold uppercase">
                  ENGINEERING PROFILE
                </span>
                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] md:text-[34px]">
                  Technical Capabilities
                </h2>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-(--text-2)">
                From designing high-throughput API gateways and distributed queue pipelines to architecting resilient React design systems.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Frontend */}
            <Reveal delay={60} className="flex flex-col h-full">
              <div className="tech-pill rounded-xl p-6 flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-[11px] opacity-60 font-medium tracking-wider">
                    01 / INTERFACE
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-tight mt-1">
                    Frontend Architecture
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed opacity-70">
                    Component systems, state machines, server components, and responsive design systems with performance-first principles.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t pt-4 border-current/15">
                  {["React 19", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "State Architecture"].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border px-2.5 py-1 font-mono text-[11px] border-current/20 bg-current/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Backend */}
            <Reveal delay={140} className="flex flex-col h-full">
              <div className="tech-pill rounded-xl p-6 flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-[11px] opacity-60 font-medium tracking-wider">
                    02 / SERVICES
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-tight mt-1">
                    Backend APIs &amp; Microservices
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed opacity-70">
                    High-concurrency microservices, JWT/RBAC security, streaming WebSockets, and resilient API reverse proxies.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t pt-4 border-current/15">
                  {["Express.js", "Node.js", "RESTful APIs", "WebSockets", "Auth & JWT", "Rate Limiting"].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border px-2.5 py-1 font-mono text-[11px] border-current/20 bg-current/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Infrastructure */}
            <Reveal delay={220} className="flex flex-col h-full">
              <div className="tech-pill rounded-xl p-6 flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-[11px] opacity-60 font-medium tracking-wider">
                    03 / INFRASTRUCTURE
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-tight mt-1">
                    Databases &amp; Distributed Systems
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed opacity-70">
                    Data modeling, indexing, Redis caching, Docker containerization, and AWS infrastructure engineering.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t pt-4 border-current/15">
                  {["PostgreSQL", "MongoDB", "Redis Caching", "Docker", "AWS (EC2, S3)", "Load Balancing"].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border px-2.5 py-1 font-mono text-[11px] border-current/20 bg-current/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PORTFOLIO / SELECTED PROJECTS */}
        <section id="projects" className="scroll-mt-20 border-b py-16 md:py-24 border-(--border)">
          <Reveal delay={0}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-(--text-3) font-semibold">
                  <span>PORTFOLIO</span>
                  <span>/</span>
                  <span>SELECTED WORK</span>
                </div>
                <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.03em] md:text-[40px]">
                  Featured Projects
                </h2>
                <p className="mt-2 text-[15px] text-(--text-2) max-w-[50ch]">
                  Production web applications, cross-platform mobile tools, and backend concurrency systems built with Go, React 19, and TypeScript.
                </p>
              </div>

              {/* Minimalist Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {["All", "Frontend", "Mobile", "Backend"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-colors cursor-pointer ${selectedCategory === cat
                      ? "bg-(--text) text-(--bg) border-(--text)"
                      : "bg-(--bg) text-(--text-2) border-(--border) hover:text-(--text) hover:border-(--border-strong)"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Project Cards */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 80} className="flex flex-col h-full">
                <div
                  className="group rounded-2xl border bg-(--bg) p-6 transition-all hover:border-(--text) shadow-xs flex flex-col justify-between border-(--border) h-full"
                >
                  <div>
                    {/* Visual Media Preview Banner */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/preview relative block overflow-hidden rounded-xl border bg-(--bg-2) border-(--border) transition-all hover:border-(--border-strong)"
                    >
                      {/* Window Bar */}
                      <div className="flex items-center justify-between border-b px-4 py-2.5 border-(--border) bg-(--bg)/70 backdrop-blur-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-(--border-strong)" />
                          <span className="h-2 w-2 rounded-full bg-(--border-strong)" />
                          <span className="h-2 w-2 rounded-full bg-(--border-strong)" />
                        </div>
                        <span className="font-mono text-[10px] text-(--text-3)">
                          {project.displayUrl}
                        </span>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-(--border-strong) bg-(--bg) text-(--text-2)">
                          {project.badge}
                        </span>
                      </div>

                      {/* Media Container */}
                      <div className="relative h-[240px] sm:h-[270px] w-full overflow-hidden bg-(--bg-2) flex items-center justify-center p-3">
                        {project.previewType === "web" ? (
                          <div className="relative h-full w-full overflow-hidden rounded-lg border border-(--border) bg-black">
                            {project.image && (
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                unoptimized
                                className="object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.02]"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-end p-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono text-[10px] font-semibold text-black shadow-md">
                                Play Live Game ↗
                              </span>
                            </div>
                          </div>
                        ) : project.previewType === "mobile" ? (
                          <div className="relative h-full w-full overflow-hidden rounded-lg border border-(--border) bg-(--bg) flex items-center justify-center gap-3 sm:gap-4 p-2">
                            {/* Left Phone: Reminders & Countdown Timer */}
                            {project.image && (
                              <div className="relative h-[200px] sm:h-[230px] w-[95px] sm:w-[105px] shrink-0 rounded-2xl border-2 border-(--text) bg-black shadow-lg overflow-hidden transition-transform duration-500 group-hover/preview:-translate-y-1">
                                <Image
                                  src={project.image}
                                  alt="Docket Active Timer Screen"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                            )}

                            {/* Right Phone: Daily Tasks & Calendar */}
                            {project.secondaryImage && (
                              <div className="relative h-[200px] sm:h-[230px] w-[95px] sm:w-[105px] shrink-0 rounded-2xl border-2 border-(--border-strong) bg-black shadow-md overflow-hidden transition-transform duration-500 group-hover/preview:translate-y-1">
                                <Image
                                  src={project.secondaryImage}
                                  alt="Docket Daily Tasks Screen"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                            )}

                            {/* App Icon Pill Badge */}
                            {project.icon && (
                              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-(--border) bg-(--bg)/90 px-2 py-0.5 backdrop-blur-md shadow-xs">
                                <Image
                                  src={project.icon}
                                  alt="Docket App Icon"
                                  width={14}
                                  height={14}
                                  className="rounded-xs"
                                />
                                <span className="font-mono text-[9px] text-(--text-2) font-medium">
                                  Expo SDK 58
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Terminal / Go Concurrency Preview */
                          <div className="relative h-full w-full overflow-hidden rounded-lg border border-(--border) bg-(--bg) p-3 text-left font-mono text-[10.5px] leading-[1.6] flex flex-col justify-between shadow-xs">
                            {/* Code Header Bar */}
                            <div className="flex items-center justify-between border-b pb-1.5 text-[10px] border-(--border) text-(--text-3)">
                              <span className="text-(--text-2) font-medium truncate max-w-[190px]">
                                11. Goroutines / channels.go
                              </span>
                              <span className="rounded border px-1.5 py-0.2 text-[9px] font-semibold border-(--border-strong) bg-(--bg-2) text-(--text)">
                                Go 1.24
                              </span>
                            </div>

                            {/* Code Block Snippet */}
                            <div className="py-1.5 space-y-0.5 text-[10px] sm:text-[11px] overflow-hidden text-(--text-2)">
                              <div>
                                <span className="text-(--text-3)">package</span>{" "}
                                <span className="text-(--text) font-semibold">main</span>
                              </div>
                              <div>
                                <span className="text-(--text-3)">func</span>{" "}
                                <span className="text-(--text) font-semibold">prepareDrink</span>(ch{" "}
                                <span className="text-(--text-3)">chan</span> string) &#123;
                              </div>
                              <div className="pl-3.5 text-(--text-3)">
                                ch &lt;- &quot;Latte ready&quot;
                              </div>
                              <div>&#125;</div>
                              <div className="pt-0.5">
                                <span className="text-(--text-3)">func</span>{" "}
                                <span className="text-(--text) font-semibold">main</span>() &#123;
                              </div>
                              <div className="pl-3.5">
                                ch := <span className="text-(--text-3)">make</span>(
                                <span className="text-(--text-3)">chan</span> string)
                              </div>
                              <div className="pl-3.5 text-(--text)">
                                <span className="text-(--text-3)">go</span> prepareDrink(ch)
                              </div>
                              <div className="pl-3.5">
                                order := &lt;-ch
                              </div>
                              <div>&#125;</div>
                            </div>

                            {/* Bottom Chapter Bar */}
                            <div className="border-t pt-1.5 flex items-center justify-between text-[9.5px] border-(--border) text-(--text-3)">
                              <span>11 Chapters • 40+ Labs</span>
                              <span className="text-(--text) group-hover/preview:underline font-medium">
                                Inspect Code ↗
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </a>

                    {/* Project Title with Linkable Link */}
                    <div className="mt-6 flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-(--text-3)">
                          {project.category}
                        </span>
                        <h3 className="text-[20px] font-semibold tracking-tight text-(--text) mt-0.5">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1.5"
                          >
                            {project.title}
                            <span className="text-[13px] text-(--text-3) transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--text)">
                              ↗
                            </span>
                          </a>
                        </h3>
                        <p className="mt-1 text-[13px] font-medium text-(--text-2)">
                          {project.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-[14px] leading-relaxed text-(--text-2)">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer with Minimalist Tags & Actions */}
                  <div className="mt-6 border-t pt-5 border-(--border)">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border bg-(--bg-2) px-2.5 py-0.5 font-mono text-[10px] text-(--text-2) border-(--border)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-(--text) hover:underline underline-offset-4 flex items-center gap-1 font-medium"
                      >
                        {project.ctaText ?? "View Live Project ↗"}
                      </a>
                      <span className="text-(--border-strong)">•</span>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-(--text-3) hover:text-(--text) transition-colors"
                      >
                        Source Code ↗
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TECHNICAL WRITING / BLOG SECTION */}
        <section className="border-b py-16 md:py-24 border-(--border)">
          <Reveal delay={0}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-(--text-3) font-semibold">
                  <span>TECHNICAL WRITING</span>
                  <span>/</span>
                  <span>NOTES &amp; ESSAYS</span>
                </div>
                <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.03em] md:text-[40px]">
                  System Design &amp; Architecture Notes
                </h2>
                <p className="mt-2 text-[15px] text-(--text-2) max-w-[52ch]">
                  In-depth technical breakdowns of distributed systems, design patterns, and full-stack software architecture.
                </p>
              </div>
              <Link
                href="/blog"
                className="font-mono text-[12px] text-(--text) hover:underline underline-offset-4 transition-colors flex items-center gap-1"
              >
                Browse all articles →
              </Link>
            </div>
          </Reveal>

          {/* Minimalist Category Quick Links */}
          <Reveal delay={60}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Link
                href="/blog/system-design/general/load-balancer"
                className="group rounded-lg border bg-(--bg-2) p-3 text-left border-(--border) hover:border-(--text) transition-colors"
              >
                <div className="font-mono text-[10px] text-(--text-3) group-hover:text-(--text) transition-colors">CATEGORY</div>
                <div className="text-[13px] font-semibold mt-0.5 text-(--text)">Networking &amp; Scale</div>
              </Link>
              <Link
                href="/blog/system-design/database/cap-theorem"
                className="group rounded-lg border bg-(--bg-2) p-3 text-left border-(--border) hover:border-(--text) transition-colors"
              >
                <div className="font-mono text-[10px] text-(--text-3) group-hover:text-(--text) transition-colors">CATEGORY</div>
                <div className="text-[13px] font-semibold mt-0.5 text-(--text)">Distributed Databases</div>
              </Link>
              <Link
                href="/blog/system-design/creational-patterns/singleton"
                className="group rounded-lg border bg-(--bg-2) p-3 text-left border-(--border) hover:border-(--text) transition-colors"
              >
                <div className="font-mono text-[10px] text-(--text-3) group-hover:text-(--text) transition-colors">CATEGORY</div>
                <div className="text-[13px] font-semibold mt-0.5 text-(--text)">Design Patterns</div>
              </Link>
              <Link
                href="/blog/system-design/object-oriented-programming/introduction-to-object-oriented-programming"
                className="group rounded-lg border bg-(--bg-2) p-3 text-left border-(--border) hover:border-(--text) transition-colors"
              >
                <div className="font-mono text-[10px] text-(--text-3) group-hover:text-(--text) transition-colors">CATEGORY</div>
                <div className="text-[13px] font-semibold mt-0.5 text-(--text)">Object-Oriented Design</div>
              </Link>
            </div>
          </Reveal>

          {/* Article List */}
          <div className="mt-10 divide-y border-y border-(--border)">
            {ARTICLES.map((article, idx) => (
              <Reveal key={article.href} delay={idx * 40}>
                <Link
                  href={article.href}
                  className="group flex flex-col justify-between py-6 transition-colors hover:bg-(--bg-2)/60 sm:flex-row sm:items-baseline sm:gap-6 -mx-3 px-3 rounded-lg"
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2.5 font-mono text-[11px] text-(--text-3)">
                      <span className="text-(--text-2)">{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="mt-1.5 text-[18px] font-semibold tracking-[-0.01em] text-(--text) group-hover:underline underline-offset-4 transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-(--text-2)">
                      {article.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 font-mono text-[11px] text-(--text-3) sm:mt-0 shrink-0 group-hover:text-(--text) transition-colors">
                    <span>{article.date}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MINIMALIST LET'S CONNECT / CTA SECTION */}
        <section className="py-16 md:py-24">
          <Reveal delay={0}>
            <div className="rounded-2xl border bg-(--bg-2) p-8 md:p-12 border-(--border) flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <span className="font-mono text-[11px] tracking-[0.14em] text-(--text-3) font-semibold uppercase">
                  COLLABORATION &amp; INQUIRIES
                </span>
                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] md:text-[34px] text-(--text)">
                  Building something ambitious? Let&apos;s talk.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-(--text-2)">
                  With 7+ years of hands-on experience across React, TypeScript, and Express.js backends,
                  I help teams take ambitious software from concept to production-grade reliability.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[13px]">
                  <span className="text-(--text-3)">Email:</span>
                  <a
                    href="mailto:singhprakashchoudhary@gmail.com"
                    className="font-medium text-(--text) underline decoration-(--border-strong) underline-offset-4 hover:decoration-(--text) transition-colors"
                  >
                    singhprakashchoudhary@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <a
                  href="mailto:singhprakashchoudhary@gmail.com"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-(--text) px-6 text-[13px] font-medium text-(--bg) transition-opacity hover:opacity-90 text-center"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Email Me</span>
                </a>
                <a
                  href="https://github.com/PrakashSinghChoudhary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-(--border) bg-(--bg) px-5 text-[13px] font-medium text-(--text) hover:border-(--border-strong) transition-colors text-center"
                >
                  GitHub Profile ↗
                </a>
                <Link
                  href="/about"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-(--border) bg-(--bg) px-5 text-[13px] font-medium text-(--text) hover:border-(--border-strong) transition-colors text-center"
                >
                  About Me
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
