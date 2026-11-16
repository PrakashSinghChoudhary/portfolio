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
  accessModifiersCode,
  breadcrumbs,
  calloutEncapsulation,
  calloutLeakyAbstraction,
  date,
  defensiveCopyCode,
  orderLifecycleCode,
  rateLimiterCode,
  tableOfContent,
  tellDontAskCode,
} from "./data";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";
import Checklist from "@/components/Checklist";
import NumberedList from "@/components/NumberedList";
import Blockquote from "@/components/Blockquote";
import Code from "@/components/Code";
import Note from "@/components/Note";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";

export default function EncapsulationPage() {
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
              text="Object Oriented Programming"
              timeToRead="12 MINS"
            />
            <ArticleTitle title="Encapsulation" />
            <ArticleDescription
              content="Why bundling data with methods is only the starting point. Discover how encapsulation enforces state invariants, shields mission-critical business logic, and guards domain entities against leaky abstractions in TypeScript."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["OOP", "TypeScript", "Encapsulation", "Software Architecture"]}
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
              In software engineering, bugs rarely happen because a computer
              calculated <Code code="2 + 2 = 5" />. They happen because an
              unauthorized component in file A directly reached into the internal
              state of an entity in file B, bypassed every validation check, and
              left the system in an illegal, corrupted state.
            </p>
            <p className="main-content">
              <strong>Encapsulation</strong> is the foundational armor of
              Object-Oriented Programming. At its simplest, it is described as
              bundling data and the methods that operate on that data into a
              cohesive unit. But in production systems, encapsulation is
              something far more powerful:{" "}
              <strong>it is the deliberate construction of an infallible boundary</strong>.
            </p>
            <p className="main-content">
              An encapsulated object does not merely hide fields; it acts as an
              autonomous guardian of its own internal rules. It ensures that no
              matter how buggy, careless, or malicious outside callers might be,
              the object{"'"}s internal invariants can never be violated.
            </p>

            {/* Visual Architectural Diagram */}
            <div className="mt-12 rounded-xl border bg-(--bg-2) p-6 border-(--border)">
              <div className="text-[11px] font-mono tracking-[0.1em] text-(--text-3) uppercase">
                Architecture Blueprint • The Encapsulation Fortress
              </div>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* External Callers */}
                <div className="w-full md:w-52 rounded-lg border bg-(--bg) p-4 text-center border-(--border)">
                  <div className="text-[10px] font-mono tracking-[0.1em] text-(--text-3)">
                    EXTERNAL CALLERS
                  </div>
                  <div className="mt-2 space-y-1 font-mono text-[11px] text-(--text-2)">
                    <div>Controllers</div>
                    <div>API Handlers</div>
                    <div>Event Listeners</div>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-rose-500 border-t pt-2 border-(--border)">
                    Direct State Access Blocked
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center font-mono text-[11px] text-(--text-3)">
                  Public API Protocol
                  <div className="text-[16px] text-(--text)">───►</div>
                </div>

                {/* Encapsulated Boundary */}
                <div className="w-full md:w-64 rounded-xl border-2 border-(--text) bg-(--bg) p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3)">
                      ENCAPSULATED ENTITY
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="mt-2 text-[14px] font-semibold text-(--text)">
                    TokenBucketRateLimiter
                  </div>
                  <div className="mt-3 space-y-1 font-mono text-[10px] text-(--text-2) border-t pt-2 border-(--border)">
                    <div className="text-(--text) font-medium">+ consume(tokens)</div>
                    <div className="text-(--text) font-medium">+ availableTokens</div>
                    <div className="text-(--text-3)">- #tokens: number</div>
                    <div className="text-(--text-3)">- #lastRefill: number</div>
                    <div className="text-(--text-3)">- #refill(): void</div>
                  </div>
                  <div className="mt-3 rounded border border-(--border-strong) bg-(--bg-2) p-2 text-[9px] font-mono text-(--text-2) text-center">
                    Guarded Invariants: 0 &le; tokens &le; capacity
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t pt-3 border-(--border) text-center text-[11px] font-mono text-(--text-3)">
                Callers communicate strictly via message contracts; internal state mutations are validated internally.
              </div>
            </div>
          </div>

          {/* Section 01: What is Encapsulation? */}
          <Pointer {...tableOfContent[0]} />
          <p className="content mt-12!">
            To truly understand encapsulation, we must look beyond academic
            definitions. Encapsulation is fundamentally about{" "}
            <strong>cohesion</strong> and <strong>boundary enforcement</strong>.
          </p>
          <p className="content">
            In procedural architectures, data structures (records, structs, plain
            JSON objects) travel naked throughout a codebase. Dozens of separate
            functions across different modules read and manipulate those fields.
            If a business rule requires that a customer{"'"}s credit balance cannot
            drop below zero, every single function modifying that balance must
            remember to execute that check. The moment one junior engineer
            forgets, the data is corrupted.
          </p>
          <p className="content">
            Encapsulation binds the data structure together with the operations
            that act upon it. The fields are sealed off from direct external
            reach. Outside code can no longer command:{" "}
            <Code code="account.balance -= 100" />. Instead, it must ask:{" "}
            <Code code="account.debit(100)" />. The object inspects its internal
            rules, confirms validity, and executes the transition itself.
          </p>

          <div className="mt-8">
            <Callout data={calloutEncapsulation} />
          </div>

          <Blockquote
            name="— Grady Booch, Object-Oriented Analysis and Design"
            content="Encapsulation is the process of compartmentalizing the elements of an abstraction that constitute its structure and behavior; encapsulation serves to separate the contractual interface of an abstraction and its implementation."
          />

          {/* Section 02: Data Hiding vs. Encapsulation */}
          <Pointer {...tableOfContent[1]} />
          <p className="content mt-12!">
            A pervasive misconception among developers is that{" "}
            <em>data hiding</em> and <em>encapsulation</em> are identical synonyms.
            They are not: data hiding is a mechanism; encapsulation is an architectural outcome.
          </p>

          <NumberedList
            heading="The Critical Distinction:"
            list={[
              <>
                <strong className="text-(--text)">Data Hiding (The Mechanism):</strong>{" "}
                Using language keywords like <Code code="private" /> or{" "}
                <Code code="#field" /> to make variables invisible outside of a
                class scope. Data hiding prevents arbitrary external reads and writes.
              </>,
              <>
                <strong className="text-(--text)">Encapsulation (The Architecture):</strong>{" "}
                Combining data with behavior to construct an authoritative domain
                boundary. Encapsulation guarantees that every state transition
                preserves the validity of business rules.
              </>,
            ]}
          />

          <p className="content">
            To see why this distinction matters, consider the common antipattern
            of marking a field <Code code="private" /> and immediately generating
            a public getter and setter:
          </p>

          <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border) my-6">
            <div className="text-[11px] font-mono tracking-[0.1em] text-rose-500 uppercase">
              The Illusion of Encapsulation (Antipattern)
            </div>
            <pre className="mt-3 font-mono text-[12px] leading-relaxed text-(--text-2) overflow-x-auto">
              <code>{`class User {
  private age: number;
  public getAge(): number { return this.age; }
  public setAge(newAge: number): void { this.age = newAge; }
}`}</code>
            </pre>
            <p className="mt-3 text-[12px] text-(--text-3) font-mono">
              This class employs data hiding, but zero encapsulation. Any caller
              can execute <Code code="user.setAge(-50)" /> and corrupt the domain.
            </p>
          </div>

          <p className="content">
            True encapsulation requires that the class enforces rules. If setting
            age requires being between 0 and 150, or if age should be calculated
            dynamically from a verified birthdate, the class must protect that
            invariant internally.
          </p>

          {/* Section 03: Invariants: Protecting Domain Integrity */}
          <Pointer {...tableOfContent[2]} />
          <p className="content mt-12!">
            An <strong>invariant</strong> is a condition or business rule that must
            always evaluate to <Code code="true" /> throughout the lifetime of an
            object.
          </p>
          <p className="content">
            Consider a production <strong>Token Bucket Rate Limiter</strong>. In
            distributed networking, a token bucket must satisfy several critical
            invariants:
          </p>

          <BulletList
            title="Rate Limiter Invariants:"
            list={[
              <>
                <strong className="text-(--text)">Token Boundaries:</strong> The
                number of available tokens can never be negative, and can never
                exceed the bucket{"'"}s maximum capacity.
              </>,
              <>
                <strong className="text-(--text)">Monotonic Time Refill:</strong>{" "}
                Tokens must refill continuously based on elapsed wall-clock time
                multiplied by the refill rate.
              </>,
              <>
                <strong className="text-(--text)">Atomic Consumption:</strong> A
                consumer cannot consume tokens if insufficient tokens remain.
              </>,
            ]}
          />

          <p className="content">
            Here is how encapsulation guarantees those invariants in TypeScript:
          </p>

          <CodeBlock
            filename="TokenBucketRateLimiter.ts"
            code={rateLimiterCode}
            langLabel="TypeScript"
          />

          <p className="content">
            Notice how encapsulation protects the system:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] leading-[1.7] text-(--text-2) marker:text-(--text-3)">
            <li>
              The constructor rejects non-positive capacities or refill rates,
              preventing the instantiation of an invalid entity.
            </li>
            <li>
              The <Code code="refill()" /> calculation is strictly private;
              outside callers cannot inject arbitrary token counts.
            </li>
            <li>
              The <Code code="consume()" /> method handles state changes
              atomically and checks boundary limits before granting access.
            </li>
          </ul>

          {/* Section 04: Access Control in TypeScript: Compile vs. Runtime */}
          <Pointer {...tableOfContent[3]} />
          <p className="content mt-12!">
            TypeScript offers a unique duality when it comes to access control:
            compile-time modifiers versus ECMAScript runtime private fields.
            Understanding the difference is critical for production reliability.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border)">
              <div className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                Approach A • Compile-Time
              </div>
              <h4 className="mt-1 text-[16px] font-semibold text-(--text)">
                TypeScript &apos;private&apos; Keyword
              </h4>
              <p className="mt-2 text-[13px] leading-relaxed text-(--text-2)">
                Checked purely during compilation by the TypeScript compiler. In
                the emitted JavaScript, the field becomes a standard public
                property. Callers can bypass it using{" "}
                <Code code="(instance as any).secret" />.
              </p>
            </div>

            <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border)">
              <div className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                Approach B • Runtime-Engine
              </div>
              <h4 className="mt-1 text-[16px] font-semibold text-(--text)">
                ECMAScript &apos;#&apos; Private Identifier
              </h4>
              <p className="mt-2 text-[13px] leading-relaxed text-(--text-2)">
                Enforced by the JavaScript V8 engine at runtime. Stored in internal
                engine slots. Cannot be accessed, inspected, or overridden via
                reflection, <Code code="any" />, or Object keys.
              </p>
            </div>
          </div>

          <p className="content">
            Here is a practical code demonstration illustrating both mechanisms:
          </p>

          <CodeBlock
            filename="access-modifiers.ts"
            code={accessModifiersCode}
            langLabel="TypeScript"
          />

          <Note note="Architectural Recommendation: Use TypeScript's 'private' keyword for standard internal application architecture where compilation checks suffice. Use ECMAScript '#privateField' syntax when authoring security boundaries, multi-tenant SDKs, or libraries distributed to external consumers." />

          {/* Section 05: Getters, Setters & 'Tell, Don't Ask' */}
          <Pointer {...tableOfContent[4]} />
          <p className="content mt-12!">
            One of the most valuable software design guidelines in object-oriented
            architecture is the{" "}
            <strong>&quot;Tell, Don&apos;t Ask&quot; principle</strong>, coined by
            Alec Sharp and popularized by Andy Hunt and Dave Thomas in{" "}
            <em>The Pragmatic Programmer</em>.
          </p>
          <p className="content">
            The principle states: rather than asking an object for its internal
            state, performing calculations outside the object, and writing the
            result back, you should simply <strong>tell the object what to do</strong>.
          </p>

          <div className="grid gap-4 md:grid-cols-2 my-8">
            <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border)">
              <div className="text-[10px] font-mono tracking-[0.1em] text-rose-500 uppercase">
                Bad: Asking &amp; Mutating Externally
              </div>
              <pre className="mt-3 font-mono text-[11px] leading-relaxed text-(--text-2) overflow-x-auto">
                <code>{`if (wallet.getBalance() >= charge) {
  const newBal = wallet.getBalance() - charge;
  wallet.setBalance(newBal);
}`}</code>
              </pre>
              <p className="mt-2 text-[12px] text-(--text-3)">
                Logic is duplicated across callers; race conditions occur if two
                callers check balance simultaneously.
              </p>
            </div>

            <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border)">
              <div className="text-[10px] font-mono tracking-[0.1em] text-emerald-500 uppercase">
                Good: Telling the Object to Act
              </div>
              <pre className="mt-3 font-mono text-[11px] leading-relaxed text-(--text-2) overflow-x-auto">
                <code>{`const success = wallet.debit(charge);
if (!success) {
  handleInsufficientFunds();
}`}</code>
              </pre>
              <p className="mt-2 text-[12px] text-(--text-3)">
                The wallet controls its own balance invariants, atomic checks,
                and validation internally.
              </p>
            </div>
          </div>

          <p className="content">
            Here is the complete implementation of the encapsulated{" "}
            <Code code="WalletAccount" />:
          </p>

          <CodeBlock
            filename="WalletAccount.ts"
            code={tellDontAskCode}
            langLabel="TypeScript"
          />

          {/* Section 06: Real-World Architecture: State Machine */}
          <Pointer {...tableOfContent[5]} />
          <p className="content mt-12!">
            In enterprise systems, encapsulation shines brightest when managing{" "}
            <strong>Domain Aggregates</strong> and <strong>State Machines</strong>.
          </p>
          <p className="content">
            Consider an e-commerce order lifecycle. An order cannot transition
            arbitrarily:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[14px] leading-relaxed text-(--text-2) marker:text-(--text-3)">
            <li>It begins in <Code code="PENDING" /> status.</li>
            <li>Items can only be added while in <Code code="PENDING" />.</li>
            <li>It cannot transition to <Code code="PAID" /> if it has zero items.</li>
            <li>It cannot transition to <Code code="SHIPPED" /> without first being <Code code="PAID" />.</li>
            <li>It cannot be cancelled once it is already shipped or delivered.</li>
          </ul>

          <p className="content">
            If external callers had direct access to <Code code="order.status" />{" "}
            or <Code code="order.items" />, these rules would disintegrate. By
            encapsulating state transitions behind domain methods, the Order
            aggregate maintains 100% integrity:
          </p>

          <CodeBlock
            filename="OrderAggregate.ts"
            code={orderLifecycleCode}
            langLabel="TypeScript"
          />

          {/* Section 07: Leaky Encapsulation & Defensive Copying */}
          <Pointer {...tableOfContent[6]} />
          <p className="content mt-12!">
            Even experienced senior engineers frequently fall into the trap of{" "}
            <strong>leaky encapsulation</strong> when working with reference
            types (arrays, objects, Maps, Sets).
          </p>
          <p className="content">
            In JavaScript and TypeScript, primitives (strings, numbers, booleans)
            are passed by value. But objects and arrays are passed by reference.
            If your class has a private array and your getter returns that array
            directly, external code can mutate your private state without your
            class ever knowing:
          </p>

          <div className="mt-6 mb-8">
            <Callout data={calloutLeakyAbstraction} />
          </div>

          <p className="content">
            To prevent leaky encapsulation, employ{" "}
            <strong>Defensive Copying</strong> or{" "}
            <strong>Readonly Wrappers</strong>:
          </p>

          <CodeBlock
            filename="ConfigurationRegistry.ts"
            code={defensiveCopyCode}
            langLabel="TypeScript"
          />

          <BulletList
            title="Three Strategies to Prevent Leaky Encapsulation:"
            list={[
              <>
                <strong className="text-(--text)">Defensive Copying:</strong> Return
                a fresh clone of internal collections (<Code code="[...this.items]" />{" "}
                or <Code code="new Map(this.map)" />). Outside modifications
                operate strictly on the copy.
              </>,
              <>
                <strong className="text-(--text)">TypeScript Readonly Types:</strong>{" "}
                Type getters with <Code code="readonly T[]" /> or{" "}
                <Code code="ReadonlyMap<K, V>" />. The compiler will block
                accidental <Code code=".push()" /> or <Code code=".set()" /> calls.
              </>,
              <>
                <strong className="text-(--text)">Object.freeze():</strong> For
                deeply nested domain payloads, apply <Code code="Object.freeze()" />{" "}
                to prevent runtime additions or deletions of property keys.
              </>,
            ]}
          />

          {/* Section 08: Advantages and Trade-Offs */}
          <Pointer {...tableOfContent[7]} />
          <p className="small-title">Advantages</p>
          <Checklist
            list={[
              "Eliminates state corruption: objects guarantee invariant integrity across every point in their lifecycle.",
              "Enables fearless refactoring: internal storage mechanisms can be completely restructured without changing public API signatures.",
              "Reduces cognitive load: callers only need to understand the public interface contract, not the inner machinery.",
              "Prevents temporal coupling: ensures methods are executed in valid, logical sequences (e.g. state machines).",
              "Simplifies unit testing: private logic can be thoroughly exercised through deterministic public input/output methods.",
            ]}
          />

          <p className="small-title">Trade-Offs</p>
          <Checklist
            list={[
              "Boilerplate overhead: requires authoring explicit methods and constructor validations rather than accessing properties directly.",
              "Allocation costs from defensive copies: cloning large arrays or Maps to prevent reference leakage consumes memory in high-throughput loops.",
              "Risk of over-engineering: wrapping trivial data-transfer objects (DTOs) in complex class methods when a simple interface suffices.",
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

