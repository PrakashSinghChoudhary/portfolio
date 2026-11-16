"use client";
import ArticleAside from "@/components/ArticleAside";
import ArticleDescription from "@/components/ArticleDescription";
import ArticleTitle from "@/components/ArticleTitle";
import Aside from "@/components/Aside";
import Author from "@/components/Author";
import BulletList from "@/components/BulletList";
import Pointer from "@/components/Pointer";
import { useEffect, useState, useRef } from "react";
import {
  breadcrumbs,
  calloutAntiPattern,
  calloutSingleton,
  classicSingletonCode,
  configManagerCode,
  date,
  diContainerCode,
  esModuleCode,
  loggerCode,
  tableOfContent,
} from "./data";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";
import Checklist from "@/components/Checklist";
import Blockquote from "@/components/Blockquote";
import Code from "@/components/Code";
import Note from "@/components/Note";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";

export default function SingletonPatternPage() {
  const [activeId, setActiveId] = useState(tableOfContent[0]?.id);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 },
    );

    const headings = contentRef.current.querySelectorAll("h2[id]");
    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
      <section className="border-b pb-10 pt-8 md:pb-14 md:pt-10 lg:pt-12 border-(--border)">
        <Breadcrumb data={breadcrumbs} />
        <div className="mt-8 grid grid-cols-12 gap-0">
          <div className="col-span-12 lg:col-span-8">
            <ArticleMeta
              date={date}
              text="Creational Patterns"
              timeToRead="10 MINS"
            />
            <ArticleTitle title="Singleton Pattern" />
            <ArticleDescription
              content="There can only be one. Learn why the Singleton is the most loved and hated creational design pattern in software engineering, how to implement it cleanly in TypeScript, and how to avoid turning it into a global-state nightmare."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["Creational Patterns", "TypeScript", "OOP", "Architecture"]}
          />
        </div>
      </section>

      <div className="grid grid-cols-12 gap-0">
        <main
          ref={contentRef}
          className="col-span-12 lg:col-span-8 lg:border-r lg:pr-10 pb-16 border-(--border)"
        >
          {/* Introductory Section */}
          <div className="prose max-w-none pt-8">
            <p className="main-content">
              In software development, some components should exist in only one
              place at any given time. Whether it is a connection pool to your
              primary PostgreSQL database, an in-memory cache, an application
              configuration store, or a background telemetry reporter, spawning
              multiple competing instances leads to chaos, memory leaks, and
              inconsistent state.
            </p>
            <p className="main-content">
              The <strong>Singleton Pattern</strong> is one of the original
              creational patterns formalized by the Gang of Four (GoF). Its
              mandate is straightforward: guarantee that a class has only one
              instance throughout the entire lifecycle of an application, and
              provide a single, controlled global point of access to it.
            </p>
            <p className="main-content">
              While deceptively simple to write in modern TypeScript, the
              Singleton is also one of the most frequently abused patterns in
              software engineering. Implemented without discipline, it creates
              hidden dependencies, ruins unit test isolation, and transforms your
              architecture into a tangled web of global mutable state.
            </p>

            {/* Visual Blueprint Diagram */}
            <div className="mt-12 rounded-xl border bg-(--bg-2) p-6 border-(--border)">
              <div className="text-[11px] font-mono tracking-[0.1em] text-(--text-3) uppercase">
                Architecture Blueprint • The Singleton Lifecycle
              </div>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Consumers */}
                <div className="flex flex-col gap-2 w-full md:w-44">
                  <div className="rounded-md border bg-(--bg) px-3 py-1.5 text-center font-mono text-[11px] text-(--text) border-(--border)">
                    AuthService.ts
                  </div>
                  <div className="rounded-md border bg-(--bg) px-3 py-1.5 text-center font-mono text-[11px] text-(--text) border-(--border)">
                    PaymentService.ts
                  </div>
                  <div className="rounded-md border bg-(--bg) px-3 py-1.5 text-center font-mono text-[11px] text-(--text) border-(--border)">
                    OrderService.ts
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center font-mono text-[12px] text-(--text-3)">
                  getInstance()
                  <div className="text-[14px]">────►</div>
                </div>

                {/* Singleton Instance */}
                <div className="w-full md:w-64 rounded-lg border-2 border-(--text) bg-(--bg) p-4 text-center shadow-xs">
                  <div className="text-[10px] font-mono tracking-[0.1em] text-(--text-3)">
                    SINGLETON INSTANCE
                  </div>
                  <div className="text-[14px] font-semibold text-(--text) mt-1">
                    DatabaseConnectionPool
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Exact Same Memory Ref (0x7ffe)
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t pt-3 border-(--border) text-center text-[11px] font-mono text-(--text-3)">
                Every caller receives the identical instance created upon first
                invocation.
              </div>
            </div>
          </div>

          {/* Section 01: What is the Singleton Pattern? */}
          <Pointer {...tableOfContent[0]} />
          <p className="content mt-12!">
            At its core, the Singleton pattern solves two problems simultaneously,
            though this dual responsibility is why it frequently draws scrutiny:
          </p>

          <BulletList
            title="The Dual Mandate of a Singleton:"
            list={[
              <>
                <strong className="text-(--text)">
                  1. Enforcing Single Instantiation
                </strong>{" "}
                — Preventing external code from invoking <Code code="new MyClass()" />{" "}
                arbitrarily. If an instance already exists, that existing
                instance is returned instead of allocating a fresh one.
              </>,
              <>
                <strong className="text-(--text)">
                  2. Providing a Global Access Point
                </strong>{" "}
                — Exposing a well-known, static method (traditionally{" "}
                <Code code="getInstance()" />) so any module across the system can
                safely access the resource without having to pass it through
                dozens of constructor parameters.
              </>,
            ]}
          />

          <div className="mt-8">
            <Callout data={calloutSingleton} />
          </div>

          <p className="content">
            To make a class a Singleton in an object-oriented language like
            TypeScript, you must implement three mechanical rules:
          </p>
          <Checklist
            list={[
              "Make the default constructor private so external callers cannot invoke new.",
              "Store the solitary instance in a private static variable inside the class.",
              "Provide a public static accessor method (getInstance()) that instantiates the class on first call and caches the reference.",
            ]}
          />

          {/* Section 02: Why and When to Use It */}
          <Pointer {...tableOfContent[1]} />
          <p className="content mt-12!">
            Why would you ever want to limit an object to a single instance?
            Because certain computational resources are inherently singletons by
            virtue of the real world or hardware boundaries.
          </p>
          <p className="content">
            Imagine an application with 50 microservice route handlers. If each
            handler instantiated its own database pool of 20 connections, your
            application would suddenly request 1,000 simultaneous connections to
            your database server. PostgreSQL would instantly run out of
            file descriptors, crash with connection limits exceeded, and bring down
            the entire platform.
          </p>

          <BulletList
            title="Canonical Use Cases for Singletons:"
            list={[
              <>
                <strong className="text-(--text)">Database Connection Pools:</strong>{" "}
                Managing a centralized pool of connections, distributing sockets
                to incoming queries, and recycling them efficiently.
              </>,
              <>
                <strong className="text-(--text)">Application Configuration:</strong>{" "}
                Reading environment variables and YAML/JSON configurations once
                at startup, validating them, and providing read-only settings
                across all application modules.
              </>,
              <>
                <strong className="text-(--text)">Logging and Telemetry:</strong>{" "}
                Coordinating log buffers and background batch flushes to
                monitoring services like Datadog, Prometheus, or CloudWatch.
              </>,
              <>
                <strong className="text-(--text)">In-Memory Caches:</strong> A
                shared cache layer (such as an LRU cache or Redis client handle)
                where separate instances would defeat the entire purpose of
                caching.
              </>,
            ]}
          />

          {/* Section 03: Idiomatic TypeScript Implementation */}
          <Pointer {...tableOfContent[2]} />
          <p className="content mt-12!">
            TypeScript provides first-class support for access modifiers like{" "}
            <Code code="private" />, <Code code="static" />, and{" "}
            <Code code="readonly" />. This allows us to enforce the Singleton
            pattern at compile time with 100% type safety.
          </p>

          <p className="content">
            Here is the classic, production-grade implementation of a
            thread-safe, lazily initialized database connection pool:
          </p>

          <CodeBlock
            filename="database-pool.singleton.ts"
            code={classicSingletonCode}
            langLabel="TypeScript"
          />

          <p className="content">
            Trying to call <Code code="new DatabaseConnectionPool()" /> directly
            triggers a TypeScript compiler error:{" "}
            <em>Constructor of class is private and only accessible within the class declaration.</em>{" "}
            The compiler itself defends your architectural boundary.
          </p>

          <Note note="Lazy vs Eager Initialization: In the code above, the instance is created only when getInstance() is called for the first time (Lazy). If initialization takes heavy CPU time or memory, you avoid spending those resources until they are genuinely needed." />

          {/* Section 04: Real-World Examples in Production */}
          <Pointer {...tableOfContent[3]} />
          <p className="content mt-12!">
            Let{"'"}s examine two concrete, production-grade examples you will
            encounter in real enterprise backends.
          </p>

          <p className="small-title">Real-World Example 1: Type-Safe Configuration Manager</p>
          <p className="content">
            In Node.js backends, repeatedly parsing <Code code="process.env" /> in
            every file is slow, error-prone, and lacks type safety. A Singleton
            parses, validates, and freezes the configuration once at boot:
          </p>

          <CodeBlock
            filename="config.manager.ts"
            code={configManagerCode}
            langLabel="TypeScript"
          />

          <p className="small-title">Real-World Example 2: Batched Telemetry Logger</p>
          <p className="content">
            If every service created its own logger instance, you would spawn
            dozens of competing <Code code="setInterval" /> timers flushing
            individual logs over the network. A Singleton logger aggregates all
            incoming log entries into a single shared queue and flushes them in
            efficient batches:
          </p>

          <CodeBlock
            filename="telemetry.logger.ts"
            code={loggerCode}
            langLabel="TypeScript"
          />

          {/* Section 05: The JavaScript Twist: ES Modules */}
          <Pointer {...tableOfContent[4]} />
          <p className="content mt-12!">
            Here is a nuance unique to JavaScript and TypeScript: in modern
            environments (Node.js and modern browsers),{" "}
            <strong>ES Modules are evaluated once and cached</strong>.
          </p>
          <p className="content">
            When file A imports an exported object from <Code code="./config" />{" "}
            and file B imports from the same path, the module runtime executes
            the file once and returns the exact same cached reference to both.
          </p>

          <CodeBlock
            filename="settings.module.ts"
            code={esModuleCode}
            langLabel="TypeScript"
          />

          <BulletList
            title="Module Singleton vs Class Singleton: Which should you use?"
            list={[
              <>
                <strong className="text-(--text)">ES Module Export:</strong> Much
                simpler and more idiomatic in pure TypeScript / Node.js projects.
                Less boilerplate.
              </>,
              <>
                <strong className="text-(--text)">Class Singleton:</strong>{" "}
                Mandatory if you need lazy evaluation, initialization
                parameters, or when writing libraries consumed in mixed
                environments where bundlers or duplicate <Code code="node_modules" />{" "}
                versions might evaluate the module more than once.
              </>,
            ]}
          />

          {/* Section 06: The Dark Side: Why Developers Hate It */}
          <Pointer {...tableOfContent[5]} />
          <p className="content mt-12!">
            Despite its utility, many senior software engineers and architects
            consider the traditional Singleton an <strong>anti-pattern</strong>.
            Why does it receive such strong pushback?
          </p>

          <div className="mt-8">
            <Callout data={calloutAntiPattern} />
          </div>

          <BulletList
            title="The Three Major Architectural Flaws of Singletons:"
            list={[
              <>
                <strong className="text-(--text)">1. Tight Coupling & Hidden Dependencies:</strong>{" "}
                When a function reaches directly into{" "}
                <Code code="ConfigurationManager.getInstance()" />, its signature
                lies about its dependencies. You can no longer look at the
                constructor parameters to know what the class needs to run.
              </>,
              <>
                <strong className="text-(--text)">2. Unit Testing Nightmare (State Pollution):</strong>{" "}
                Because singletons live across the entire test runner process,
                test #1 might mutate state inside the singleton. When test #47
                runs, it randomly fails because of leftover state from test #1.
                Mocking static methods like <Code code="getInstance()" /> is
                notoriously awkward in Jest and Vitest.
              </>,
              <>
                <strong className="text-(--text)">3. Violation of Single Responsibility Principle:</strong>{" "}
                A class should focus on its business logic (querying data,
                formatting logs), not on managing its own lifecycle and counting
                how many times it has been instantiated.
              </>,
            ]}
          />

          {/* Section 07: Refactoring: Singleton via DI */}
          <Pointer {...tableOfContent[6]} />
          <p className="content mt-12!">
            How do modern production systems resolve this tension? They decouple
            the <strong>lifetime</strong> of the instance from the{" "}
            <strong>class definition</strong> by using{" "}
            <strong>Dependency Injection (DI)</strong>.
          </p>
          <p className="content">
            Frameworks like NestJS, TSyringe, InversifyJS, and Angular manage
            singletons at the container level. The class itself is written as a
            standard class with a public constructor, while the DI container
            guarantees that only one instance is created in production.
          </p>

          <CodeBlock
            filename="cache.di.ts"
            code={diContainerCode}
            langLabel="TypeScript"
          />

          <Blockquote
            name="— Modern Architectural Consensus"
            content="Use the Singleton lifecycle, not the Singleton pattern. Let your Dependency Injection container manage the single-instance guarantee so your code remains decoupled, mockable, and testable."
          />

          {/* Section 08: Advantages and Disadvantages */}
          <Pointer {...tableOfContent[7]} />
          <p className="small-title">Advantages</p>
          <Checklist
            list={[
              "Guaranteed single instance avoids resource starvation (database connection exhaustion).",
              "Controlled global access without declaring dangerous global variables on globalThis or window.",
              "Lazy initialization defers expensive memory allocation until the resource is first requested.",
              "Strict compile-time protection in TypeScript prevents illegal instantiation.",
            ]}
          />

          <p className="small-title">Disadvantages</p>
          <Checklist
            list={[
              "Violates the Single Responsibility Principle by managing both business logic and lifecycle.",
              "Causes test pollution in automated test suites due to persistent mutable state.",
              "Hides dependencies inside method bodies rather than exposing them through constructor injection.",
              "Requires deliberate refactoring to adapt if business requirements ever demand multiple instances.",
            ]}
          />
        </main>

        <Aside
          tableOfContent={tableOfContent}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>
    </div>
  );
}
