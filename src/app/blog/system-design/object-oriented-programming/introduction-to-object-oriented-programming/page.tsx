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
  calloutComposition,
  calloutFourPillars,
  date,
  tableOfContent,
} from "./data";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";
import Checklist from "@/components/Checklist";
import NumberedList from "@/components/NumberedList";
import Blockquote from "@/components/Blockquote";
import Code from "@/components/Code";
import Note from "@/components/Note";
import Callout from "@/components/Callout";

export default function ObjectOrientedProgrammingPage() {
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
              text="Software Engineering"
              timeToRead="14 MINS"
            />
            <ArticleTitle title="Object Oriented Programming" />
            <ArticleDescription
              content="Before everything became microservices and pure functions, humanity tried to model the universe with classes, objects, and state. Here is a practical, modern guide to Object-Oriented Programming and its core pillars in TypeScript."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["OOP", "TypeScript", "Software Design", "Architecture"]}
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
              Every software program in existence fundamentally does two things:
              it stores data, and it executes instructions that transform that
              data. For decades, computer scientists and working developers have
              debated the cleanest way to organize those two primitives so that
              systems do not collapse under their own complexity as they scale.
            </p>
            <p className="main-content">
              <strong>Object-Oriented Programming (OOP)</strong> is an
              architectural paradigm built on a profound insight: instead of
              treating data structures and operating functions as completely
              separate entities, we should bind them together into cohesive,
              self-contained units called <em>Objects</em>.
            </p>
            <p className="main-content">
              An object holds its own private state, enforces its own business
              rules, and exposes a clean public interface to the rest of the
              world. While functional programming has surged in popularity, OOP
              remains the foundational paradigm powering everything from web
              application frameworks and game engines to operating system
              kernels and enterprise distributed architectures.
            </p>

            {/* Visual Blueprint Diagram */}
            <div className="mt-12 rounded-xl border bg-(--bg-2) p-6 border-(--border)">
              <div className="text-[11px] font-mono tracking-[0.1em] text-(--text-3) uppercase">
                Architecture Blueprint • Class Blueprint to Living Instances
              </div>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Class Blueprint */}
                <div className="w-full md:w-56 rounded-lg border-2 border-(--text) bg-(--bg) p-4 text-center shadow-xs">
                  <div className="text-[10px] font-mono tracking-[0.1em] text-(--text-3)">
                    BLUEPRINT DEFINITION
                  </div>
                  <div className="text-[14px] font-semibold text-(--text) mt-1">
                    class BankAccount
                  </div>
                  <div className="mt-3 text-left space-y-1 font-mono text-[10px] text-(--text-2) border-t pt-2 border-(--border)">
                    <div>- balance: number</div>
                    <div>- accountNumber: string</div>
                    <div className="text-(--text)">+ deposit(amount)</div>
                    <div className="text-(--text)">+ withdraw(amount)</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center font-mono text-[12px] text-(--text-3)">
                  new BankAccount()
                  <div className="text-[14px]">────►</div>
                </div>

                {/* Instantiated Objects */}
                <div className="flex flex-col gap-3 w-full md:w-52">
                  <div className="rounded-md border bg-(--bg) p-3 border-(--border)">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-(--text)">
                        instanceA (0x4a12)
                      </span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-(--text-3)">
                      owner: &quot;Alice&quot; • balance: $5,200
                    </div>
                  </div>
                  <div className="rounded-md border bg-(--bg) p-3 border-(--border)">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-(--text)">
                        instanceB (0x9b34)
                      </span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-(--text-3)">
                      owner: &quot;Bob&quot; • balance: $1,400
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t pt-3 border-(--border) text-center text-[11px] font-mono text-(--text-3)">
                The class encapsulates logic and invariants; instances maintain
                independent runtime states.
              </div>
            </div>
          </div>

          {/* Section 01: From Procedures to Objects */}
          <Pointer {...tableOfContent[0]} />
          <p className="content mt-12!">
            To appreciate why Object-Oriented Programming exists, you have to
            understand the paradigm it arrived to rescue:{" "}
            <strong>Procedural Programming</strong>.
          </p>
          <p className="content">
            In procedural languages (like C, Pascal, or early BASIC), an
            application is structured around a sequence of procedures or functions
            operating on raw data structures. You define a data struct representing
            a user, and then dozens of loosely related functions across twenty
            files accept that struct as an argument:
          </p>

          <BulletList
            title="The Procedural Architecture Dilemma:"
            list={[
              <>
                <strong className="text-(--text)">Global Vulnerability:</strong>{" "}
                Any function anywhere in the codebase can reach into a struct and
                arbitrarily mutate its fields. A shopping cart{"'"}s total can be
                set to a negative number by a buggy reporting script.
              </>,
              <>
                <strong className="text-(--text)">Lack of Ownership:</strong>{" "}
                Who is responsible for ensuring that an account cannot withdraw
                more money than it holds? In procedural code, that validation check
                must be manually copy-pasted into every single routine that touches
                the balance.
              </>,
              <>
                <strong className="text-(--text)">Cognitive Overload:</strong> As
                the system scales to hundreds of thousands of lines of code,
                reasoning about state becomes impossible because state transitions
                are scattered across the entire repository.
              </>,
            ]}
          />

          <p className="content">
            Object-Oriented Programming solved this by introducing the concept of{" "}
            <strong>invariants</strong>. An object owns its data. Outside code is
            forbidden from mutating internal fields directly; instead, callers
            must ask the object to perform an action via public methods. The object
            inspects the request, validates its internal rules, and safely updates
            itself.
          </p>

          <Blockquote
            name="— Alan Kay, Pioneer of Object-Oriented Programming"
            content="OOP to me means only messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things."
          />

          {/* Section 02: The Four Pillars of OOP */}
          <Pointer {...tableOfContent[1]} />
          <p className="content mt-12!">
            Almost every discussion of Object-Oriented Programming revolves
            around four fundamental concepts known as{" "}
            <strong>The Four Pillars of OOP</strong>.
          </p>

          <div className="mt-8">
            <Callout data={calloutFourPillars} />
          </div>

          <p className="content">
            These four pillars work in concert to manage software complexity:
          </p>

          <NumberedList
            heading="The Four Architectural Pillars:"
            list={[
              <>
                <strong className="text-(--text)">Encapsulation:</strong>{" "}
                Shields internal state from unauthorized external manipulation
                and bundles data with the operations that act upon it.
              </>,
              <>
                <strong className="text-(--text)">Abstraction:</strong> Conceals
                messy mechanical details, exposing only clean, high-level
                interfaces to callers.
              </>,
              <>
                <strong className="text-(--text)">Inheritance:</strong> Allows
                specialized classes to inherit data fields and behavior from
                generic base classes.
              </>,
              <>
                <strong className="text-(--text)">Polymorphism:</strong> Enables
                different concrete types to be handled through a single uniform
                interface, with the exact behavior resolved at runtime.
              </>,
            ]}
          />

          {/* Section 03: Encapsulation: Protecting State */}
          <Pointer {...tableOfContent[2]} />
          <p className="content mt-12!">
            Encapsulation is the practice of keeping fields within a class
            private, providing access to them only through public methods. It
            draws a clear boundary between an object{"'"}s <em>implementation</em>{" "}
            and its <em>interface</em>.
          </p>
          <p className="content">
            Consider a financial bank account. If external code can execute{" "}
            <Code code="account.balance = -500" />, your domain integrity is
            shattered. With encapsulation, the balance variable is declared as{" "}
            <Code code="private" />. The only way to interact with the balance is
            through <Code code="deposit()" /> and <Code code="withdraw()" />{" "}
            methods that enforce strict business logic.
          </p>
          <p className="content">
            This architectural boundary guarantees that the constructor rejects
            negative starting balances, deposit routines prevent adding zero or
            negative amounts, and withdrawal methods refuse to overdraft. The
            internal state cannot be corrupted regardless of how caller code
            interacts with the object.
          </p>

          <Note note="Access Modifiers: 'private' restricts access to the containing class. 'protected' allows access within the class and its subclasses. 'public' allows universal access. In modern JavaScript/TypeScript, the # prefix (#balance) enforces runtime privacy at the engine level." />

          {/* Section 04: Abstraction: Hiding Complexity */}
          <Pointer {...tableOfContent[3]} />
          <p className="content mt-12!">
            Abstraction means displaying only essential information while hiding
            the background implementation details.
          </p>
          <p className="content">
            Think of driving a modern automobile. You press the accelerator pedal,
            turn the steering wheel, and check the speedometer. You do not
            manually meter oxygen intake, compute fuel injection timing, or
            balance transmission hydraulic valves. The dashboard provides an{" "}
            <em>abstraction</em> that allows you to operate the vehicle without
            holding a mechanical engineering degree.
          </p>
          <p className="content">
            In modern software engineering, abstraction is implemented using{" "}
            <strong>Interfaces</strong> and <strong>Abstract Classes</strong>. An
            abstraction establishes an explicit contract for caller components
            while delegating concrete implementation details to specialized
            providers beneath that contract.
          </p>

          <BulletList
            title="Interface vs Abstract Class: When to use which?"
            list={[
              <>
                <strong className="text-(--text)">TypeScript Interface:</strong> A
                pure compile-time contract with zero runtime weight. Does not
                generate JavaScript output. Cannot contain executable code or
                default implementations. Ideal for defining data shapes and API
                boundaries.
              </>,
              <>
                <strong className="text-(--text)">Abstract Class:</strong> A true
                class that cannot be directly instantiated with{" "}
                <Code code="new" />. It compiles to runtime code and can contain
                shared helper methods, constructors, and default business logic
                alongside abstract method signatures.
              </>,
            ]}
          />

          {/* Section 05: Inheritance vs Composition */}
          <Pointer {...tableOfContent[4]} />
          <p className="content mt-12!">
            Inheritance is the mechanism by which one class acquires the
            properties and behaviors of a parent class using the{" "}
            <Code code="extends" /> keyword. It represents an <em>&quot;is-a&quot;</em>{" "}
            relationship (e.g., a <Code code="Dog" /> is an <Code code="Animal" />
            ).
          </p>
          <p className="content">
            While inheritance is celebrated in university textbooks, it is also
            the most hazardous pillar of OOP in production backends. Deep
            inheritance hierarchies suffer from the{" "}
            <strong>Fragile Base Class problem</strong>: modifying a single method
            in a top-level parent class can inadvertently break dozens of
            subclasses five levels down.
          </p>

          <div className="mt-8">
            <Callout data={calloutComposition} />
          </div>

          <p className="content">
            Instead of building massive hierarchical trees, modern architecture
            favors <strong>Composition</strong>: assembling complex behavior by
            combining independent, interchangeable objects that represent a{" "}
            <em>&quot;has-a&quot;</em> relationship (e.g., an{" "}
            <Code code="OrderService" /> <em>has a</em> <Code code="Logger" /> and{" "}
            <em>has a</em> <Code code="PaymentProcessor" />).
          </p>

          <Note note="Design Axiom: Favor object composition over class inheritance. Inheritance couples classes tightly at compile-time; composition keeps components loosely coupled and easily swappable at runtime or in test suites." />

          {/* Section 06: Polymorphism: Many Forms */}
          <Pointer {...tableOfContent[5]} />
          <p className="content mt-12!">
            Polymorphism comes from the Greek words <em>poly</em> (many) and{" "}
            <em>morph</em> (form). In programming, it describes the ability of
            different classes to respond to the same method invocation in their
            own specialized ways.
          </p>
          <p className="content">
            Polymorphism comes in two primary flavors:
          </p>

          <BulletList
            title="The Two Forms of Polymorphism:"
            list={[
              <>
                <strong className="text-(--text)">Static Polymorphism (Compile-Time / Overloading):</strong>{" "}
                Defining multiple method signatures with different parameter types
                under the same method name.
              </>,
              <>
                <strong className="text-(--text)">Dynamic Polymorphism (Runtime / Overriding):</strong>{" "}
                Subclasses implement an interface method in their own distinct
                manner. Caller code interacts purely with the generic interface,
                and the runtime dispatches the call to the appropriate concrete
                instance.
              </>,
            ]}
          />

          <p className="content">
            Dynamic polymorphism enables open/closed architecture: high-level
            orchestrators can process diverse polymorphic entities through a
            shared interface without having to know their underlying concrete types
            or branching across multiple conditional type checks.
          </p>

          {/* Section 07: Concepts of Object-Oriented Programming */}
          <Pointer {...tableOfContent[6]} />
          <p className="content mt-12!">
            In addition to the governing principles of OOP (the Four Pillars),
            there are several foundational concepts that define how systems are
            structured, instantiated, and evaluated:
          </p>

          {/* 1. Structural Primitives Grid */}
          <div className="mt-8">
            <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-(--text)">
              1. The Structural Building Blocks
            </h3>
            <p className="content mt-2!">
              The concrete mechanics of how classes define domain schema and
              generate living entities in memory:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Class */}
              <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border) flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                      01 / Blueprint
                    </span>
                    <span className="rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase border-(--border-strong) bg-(--bg) text-(--text-2)">
                      Template
                    </span>
                  </div>
                  <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-(--text)">
                    Class
                  </h4>
                  <p className="mt-2 text-[13px] leading-[1.65] text-(--text-2)">
                    A Class is like a blueprint or a template for creating
                    objects. It defines what data the object can hold (its
                    properties) as well as the actions that the object can
                    perform (its methods).
                  </p>
                </div>
              </div>

              {/* Object */}
              <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border) flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                      02 / Instance
                    </span>
                    <span className="rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase border-(--border-strong) bg-(--bg) text-(--text-2)">
                      Runtime
                    </span>
                  </div>
                  <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-(--text)">
                    Object
                  </h4>
                  <p className="mt-2 text-[13px] leading-[1.65] text-(--text-2)">
                    An object is an instance of a class that holds its own
                    distinct set of data and behavior. It represents a
                    real-world entity and interacts with other objects through
                    message passing.
                  </p>
                </div>
              </div>

              {/* Constructor */}
              <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border) flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                      03 / Lifecycle
                    </span>
                    <span className="rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase border-(--border-strong) bg-(--bg) text-(--text-2)">
                      Initialization
                    </span>
                  </div>
                  <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-(--text)">
                    Constructor
                  </h4>
                  <p className="mt-2 text-[13px] leading-[1.65] text-(--text-2)">
                    A constructor is a special method automatically called when
                    an object is created, allowing the object to be initialized
                    with specific values and ensuring invariant integrity from
                    day zero.
                  </p>
                </div>
              </div>

              {/* Method */}
              <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border) flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                      04 / Behavior
                    </span>
                    <span className="rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase border-(--border-strong) bg-(--bg) text-(--text-2)">
                      Operation
                    </span>
                  </div>
                  <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-(--text)">
                    Method
                  </h4>
                  <p className="mt-2 text-[13px] leading-[1.65] text-(--text-2)">
                    A method is a function defined within a class that defines
                    the behavior of the object. It can inspect and modify the
                    object&apos;s internal data or perform business operations
                    on it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Communication Contract */}
          <div className="mt-10">
            <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-(--text)">
              2. Interaction Contracts
            </h3>
            <div className="mt-4 rounded-xl border bg-(--bg-2) p-5 border-(--border)">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                  Contractual Boundary
                </span>
                <span className="rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase border-(--border-strong) bg-(--bg) text-(--text-2)">
                  Protocol
                </span>
              </div>
              <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-(--text)">
                Interface
              </h4>
              <p className="mt-2 text-[13px] leading-[1.65] text-(--text-2)">
                An interface is a set of methods defined for an object, which
                allows other objects to interact with it. It defines how other
                objects can interact with an object while maintaining complete
                insulation from internal implementation details.
              </p>
            </div>
          </div>

          {/* 3. Architectural Design Metrics */}
          <div className="mt-10">
            <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-(--text)">
              3. Architectural Quality Metrics: Coupling vs. Cohesion
            </h3>
            <p className="content mt-2!">
              Good object-oriented design is not evaluated by class count, but
              by how cleanly concerns are separated and how dependencies are
              managed:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {/* Cohesion */}
              <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border)">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                    Internal Focus
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-(--text)">
                    High Cohesion ↑
                  </span>
                </div>
                <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-(--text)">
                  Cohesion
                </h4>
                <p className="mt-2 text-[13px] leading-[1.65] text-(--text-2)">
                  Cohesion in OOP refers to how closely connected the components
                  of a module are to one another. It evaluates how closely the
                  module and the data are related. It emphasizes the purpose of
                  a specific module or class. Better object-oriented design
                  results from a higher module or class coherence.
                </p>
              </div>

              {/* Coupling */}
              <div className="rounded-xl border bg-(--bg-2) p-5 border-(--border)">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-(--text-3) uppercase">
                    Concern Separation
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-(--text)">
                    Loose Coupling ↓
                  </span>
                </div>
                <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-(--text)">
                  Coupling
                </h4>
                <p className="mt-2 text-[13px] leading-[1.65] text-(--text-2)">
                  Coupling is the term used to describe concern separation in
                  programming. This implies that an object cannot directly alter
                  the state or conduct of other items. It identifies the degree
                  of a connection between two items.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Note note="The Golden Rule of OOP Architecture: Aim for High Cohesion and Loose Coupling. High cohesion ensures that each class has a singular, unambiguous responsibility; loose coupling ensures that objects collaborate through interfaces without intimate dependencies on each other's internal state." />
            </div>
          </div>

          {/* Section 08: OOP in Modern TypeScript */}
          <Pointer {...tableOfContent[7]} />
          <p className="content mt-12!">
            JavaScript was originally designed without classes; it relies on a{" "}
            <strong>Prototypal Inheritance</strong> model where objects inherit
            directly from other objects via a hidden <Code code="[[Prototype]]" />{" "}
            pointer.
          </p>
          <p className="content">
            The ES6 <Code code="class" /> syntax introduced in 2015 is largely
            syntactic sugar over prototypes, but TypeScript elevates this model
            into a world-class object-oriented environment.
          </p>

          <BulletList
            title="How TypeScript Enhances Object-Oriented Development:"
            list={[
              <>
                <strong className="text-(--text)">Structural Typing (Duck Typing):</strong>{" "}
                Unlike Java or C#, which use nominal typing (where an object must
                explicitly declare <Code code="implements Interface" /> to match),
                TypeScript uses structural typing. If an object has the required
                properties and method shapes, TypeScript considers it a valid
                implementation.
              </>,
              <>
                <strong className="text-(--text)">Compile-Time Access Control:</strong>{" "}
                Modifiers like <Code code="private" /> and <Code code="readonly" />{" "}
                protect your domain logic during development without incurring
                runtime overhead in production bundles.
              </>,
              <>
                <strong className="text-(--text)">Pragmatic Multi-Paradigm Synergy:</strong>{" "}
                Modern TypeScript backends do not treat OOP and Functional
                Programming as mortal enemies. Production systems often use
                classes for domain models, stateful services, and Dependency
                Injection, while using pure functional transformations for data
                pipelines and array manipulation.
              </>,
            ]}
          />

          {/* Section 09: Advantages and Disadvantages */}
          <Pointer {...tableOfContent[8]} />
          <p className="small-title">Advantages</p>
          <Checklist
            list={[
              "Intuitive real-world modeling: translates complex business domains into clear, bounded entities.",
              "Strict state protection: encapsulation prevents accidental corruption of critical data invariants.",
              "Extensibility and maintainability: polymorphism allows adding new behavior without altering existing code.",
              "Modular organization: cleanly decouples public contracts from private implementation details.",
            ]}
          />

          <p className="small-title">Disadvantages</p>
          <Checklist
            list={[
              "Boilerplate verbosity: setting up class hierarchies and accessors requires more upfront code than simple closures.",
              "Risk of over-abstraction: junior teams often construct labyrinthine inheritance trees for simple logic.",
              "Object-Relational Impedance Mismatch: bridging rich object models with relational SQL tables requires complex ORMs.",
              "Memory overhead: class instances with bound methods consume more memory than flat data records.",
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
