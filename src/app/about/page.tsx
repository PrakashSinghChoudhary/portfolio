import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="flex items-center gap-4 mb-40">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="dark:hidden"
          />
          <Image
            src="/logo-white-transparent.png"
            alt="Logo"
            width={80}
            height={80}
            className="hidden dark:block"
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight font-sans">
              About me
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Developer · Writer · Learner
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-4xl font-medium mb-12">
              Hey, I'm Prakash — a full-stack developer.
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              I work primarily with{" "}
              <span className="font-mono font-medium text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                JavaScript / TypeScript
              </span>{" "}
              across the stack — from crafting clean, responsive UIs in React
              and Next.js to building robust APIs with Express.js and MongoDB.
            </p>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              I love the full loop: design, code, ship, and iterate. Right now
              I&apos;m focused on building fast, accessible web apps that feel
              simple on the surface but are well-engineered underneath.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h3 className="font-medium mb-3">What I work with</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "Express.js",
                  "React",
                  "Node.js",
                  "Tailwind",
                  "MongoDB",
                  "PostgreSQL",
                  "AWS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-mono px-2.5 py-1 rounded-full tech-pill"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h3 className="font-medium mb-3">What I&apos;m exploring</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 list-disc list-inside">
                <li>Scalable architecture & distributed systems</li>
                <li>API design, caching & database scaling</li>
                <li>System design for real-world reliability</li>
              </ul>
            </div>
          </div>

          <section className="space-y-4 mb-20">
            <h2 className="text-2xl font-medium">Why this site exists</h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              This site is my little corner of the internet. It&apos;s three
              things at once:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl tech-pill">
                <div className="text-sm font-mono text-zinc-400 mb-2">
                  01 / Resume
                </div>
                <p className="font-medium">Where I&apos;ve been</p>
                <p className="text-sm opacity-70 mt-1">
                  My experience, education, and the teams I&apos;ve worked with.
                </p>
              </div>
              <div className="p-5 rounded-xl tech-pill">
                <div className="text-sm font-mono text-zinc-400 mb-2">
                  02 / Portfolio
                </div>
                <p className="font-medium">What I&apos;ve built</p>
                <p className="text-sm opacity-70 mt-1">
                  Selected projects, experiments, and open-source work.
                </p>
              </div>
              <div className="p-5 rounded-xl tech-pill">
                <div className="text-sm font-mono opacity-60 mb-2">
                  03 / Blog
                </div>
                <p className="font-medium">What I&apos;ve learned</p>
                <p className="text-sm opacity-70 mt-1">
                  Notes on Javascript, System Design, and things I wish I knew
                  earlier.
                </p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              If something here helps you fix a bug, ship faster, or think
              clearer — then this site has done its job. I believe in sharing
              knowledge as I go, not after I&apos;ve become an expert.
            </p>
          </section>

          <section className="rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-8 md:p-10 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h3 className="text-xl font-medium">Let&apos;s connect</h3>
              <p className="text-zinc-400 dark:text-zinc-500 mt-2 max-w-md">
                I&apos;m always open to interesting projects, collaborations, or
                just a good tech discussion.
              </p>
            </div>
            <div className="flex gap-3 h-fit">
              <a
                href="https://github.com/PrakashSinghChoudhary"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-black dark:bg-black dark:text-white font-medium text-sm"
              >
                GitHub
              </a>
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full border border-zinc-700 dark:border-zinc-300 font-medium text-sm"
              >
                Read Blog
              </Link>
            </div>
          </section>

          <p className="text-sm font-mono text-zinc-400 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            This site was built with Next.js 16, TypeScript, and Tailwind.
          </p>
        </div>
      </div>
    </main>
  );
}
