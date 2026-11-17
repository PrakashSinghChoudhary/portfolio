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
  calloutConcurrency,
  calloutPhilosophy,
  concurrencyCode,
  date,
  errorHandlingCode,
  helloWorldCode,
  interfacesCode,
  pointersCode,
  slicesMemoryCode,
  structsAndMethodsCode,
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
import CodeBlock from "@/components/CodeBlock";

export default function IntroductionToGolangPage() {
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
              text="Systems Programming • Concurrency"
              timeToRead="12 MINS"
            />
            <ArticleTitle title="Introduction to Golang" />
            <ArticleDescription
              content="A modern, high-performance programming language engineered for scale, cloud infrastructure, and distributed backends. Explore Go&apos;s deliberate minimalism, pointers without pointer arithmetic, interface polymorphism, and native concurrency with goroutines and channels."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["Golang", "Concurrency", "Systems", "Backend", "Cloud"]}
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
              In 2007, computer systems underwent a fundamental shift. Single-core
              processor speeds hit thermal ceilings, forcing hardware architectures
              to scale horizontally through multi-core processors. At the same time,
              software shifted toward massive networked server fleets, microservices,
              and distributed cloud systems.
            </p>
            <p className="main-content">
              Yet the tools engineers relied upon—predominantly C++, Java, and
              Python—were conceived in an era of single-core computing and separate
              threading libraries. C++ offered unmatched speed but suffered from
              glacial compile times, manual memory bugs, and cognitive overload.
              Python was fast to write but slow to run and bottlenecked by the
              Global Interpreter Lock. Java was powerful but bogged down by verbose
              class hierarchies and heavy runtime memory overhead.
            </p>
            <p className="main-content">
              <strong>Go (or Golang)</strong> was created at Google by Robert
              Griesemer, Rob Pike, and Ken Thompson to solve real-world engineering
              problems at scale. Their mission was clear: combine the raw execution
              efficiency and type safety of a compiled systems language with the
              development velocity and expressive simplicity of a dynamic scripting
              language.
            </p>
          </div>

          <Callout data={calloutPhilosophy} />

          {/* Section 01: Why Go Exists */}
          <Pointer {...tableOfContent[0]} />
          <p className="content">
            Go is defined as much by what it deliberately left out as by what it
            included. While most programming languages continuously add features
            over time until nobody can hold the full grammar in their head, Go chose
            radical restraint.
          </p>
          <p className="content">
            The creators evaluated every language concept through a ruthless
            question: <em>Does the complexity of this feature earn its keep across
              millions of lines of code and hundreds of engineers?</em>
          </p>

          <BulletList
            title="What Go Left Out to Stay Fast and Clean"
            list={[
              <>
                <strong>No Class Hierarchies or Inheritance:</strong> Prevents brittle
                base classes and opaque object polymorphism.
              </>,
              <>
                <strong>No Pointer Arithmetic:</strong> You can pass memory addresses
                directly for zero-copy efficiency, but you cannot perform dangerous
                pointer arithmetic like in C.
              </>,
              <>
                <strong>No Exceptions or Try-Catch Blocks:</strong> Errors are regular
                values that must be inspected and handled explicitly where they occur.
              </>,
              <>
                <strong>No Function or Operator Overloading:</strong> Every function has
                a single, unambiguous implementation and parameter signature.
              </>,
              <>
                <strong>No Implicit Type Coercions:</strong> Every type conversion must
                be explicit at compile time.
              </>,
            ]}
          />

          <Blockquote
            name="Rob Pike — Co-designer of Go"
            content="Simplicity is complicated: although the language is small, the result is expressive, fast, and easy to understand. You can learn the entire specification in an afternoon."
          />

          {/* Section 02: Packages and Toolchain */}
          <Pointer {...tableOfContent[1]} />
          <p className="content">
            One of Go&apos;s greatest strengths is its unified, production-grade
            toolchain. There is no need for external bundlers, linters, test runners,
            or package managers—everything is integrated directly into the standard
            <Code code="go" /> CLI.
          </p>
          <p className="content">
            Every Go source file begins with a <Code code="package" /> declaration.
            Executable applications use <Code code="package main" /> with an
            entrypoint function <Code code="func main()" />:
          </p>

          <CodeBlock
            filename="main.go"
            code={helloWorldCode}
            langLabel="Go"
          />

          <p className="content">
            Notice how Go handles visibility and access control. Instead of keywords
            like <Code code="public" /> and <Code code="private" />, Go uses
            casing:
          </p>

          <NumberedList
            heading="Go Visibility and Export Rules"
            list={[
              <>
                <strong>Uppercase Identifiers (Exported):</strong> Any function, struct,
                or field starting with a capital letter (e.g. <Code code="CalculateTax" /> or <Code code="User.Email" />)
                is public and accessible to other packages.
              </>,
              <>
                <strong>Lowercase Identifiers (Unexported):</strong> Any identifier starting
                with a lowercase letter (e.g. <Code code="validateToken" /> or <Code code="session.id" />)
                is strictly private to the declaring package.
              </>,
              <>
                <strong>Single Standalone Binaries:</strong> Running <Code code="go build" /> statically
                links your entire application and its runtime into a single standalone binary with zero
                external dependencies.
              </>,
            ]}
          />

          <Note note="A compiled Go binary contains its own lightweight runtime, garbage collector, and scheduler. You can copy the binary into a scratch Docker container or bare-metal Linux server and run it instantly." />

          {/* Section 03: Type System & Pointers */}
          <Pointer {...tableOfContent[2]} />
          <p className="content">
            Go is a statically typed language where types are verified at compile
            time. However, inside function bodies, Go provides short variable
            declarations using <Code code=":=" />, allowing the compiler to infer the
            type cleanly without redundant noise.
          </p>
          <p className="content">
            Unlike Java or JavaScript where objects are passed by reference and
            primitives are passed by value, Go gives you full, explicit control over
            memory layout through pointers:
          </p>

          <CodeBlock
            filename="pointers.go"
            code={pointersCode}
            langLabel="Go"
          />

          <p className="content">
            In the example above, <Code code="updatePortByValue" /> receives a shallow
            copy of the <Code code="ServerConfig" /> struct. Modifying it has zero effect
            on the original caller. By prefixing the parameter with <Code code="*ServerConfig" />,
            <Code code="updatePortByPointer" /> receives the exact memory address,
            enabling zero-copy mutations across function boundaries.
          </p>

          {/* Section 04: Structs and Composition */}
          <Pointer {...tableOfContent[3]} />
          <p className="content">
            Traditional Object-Oriented languages construct software using class
            hierarchies and inheritance. Go intentionally rejects classes in favor of{" "}
            <strong>Structs</strong> and <strong>Composition</strong>.
          </p>
          <p className="content">
            A struct defines the shape of state. Methods are defined independently and
            bound to the struct via a <em>Receiver</em>:
          </p>

          <CodeBlock
            filename="gateway.go"
            code={structsAndMethodsCode}
            langLabel="Go"
          />

          <Callout data={calloutComposition} />

          <p className="content">
            Notice how <Code code="APIGateway" /> embeds <Code code="RateLimiter" />. This
            is called <strong>struct embedding</strong>. The fields and methods of
            <Code code="RateLimiter" /> are directly promoted to <Code code="APIGateway" />,
            enabling seamless code reuse without creating fragile compile-time parent-child
            bonds.
          </p>

          {/* Section 05: Implicit Interfaces */}
          <Pointer {...tableOfContent[4]} />
          <p className="content">
            In TypeScript, Java, or C#, classes must explicitly declare that they implement
            an interface using the <Code code="implements" /> keyword. In Go, interfaces
            are satisfied <strong>implicitly</strong>.
          </p>
          <p className="content">
            If a concrete type defines all the methods that an interface declares, that
            type automatically implements the interface. There is zero coupling between
            the consumer and the implementer:
          </p>

          <CodeBlock
            filename="notifier.go"
            code={interfacesCode}
            langLabel="Go"
          />

          <BulletList
            title="Why Implicit Interfaces are an Architectural Superpower"
            list={[
              <>
                <strong>Zero Coupling:</strong> The package implementing the service does
                not need to know which interfaces will consume it.
              </>,
              <>
                <strong>Consumer-Defined Abstractions:</strong> Consumers define tiny,
                1-to-2 method interfaces specifying exactly what they need, rather than
                importing bloated vendor interfaces.
              </>,
              <>
                <strong>Effortless Mocking:</strong> Unit testing requires no complex mocking
                frameworks—simply declare a test struct that implements the method signature.
              </>,
            ]}
          />

          {/* Section 06: Explicit Error Handling */}
          <Pointer {...tableOfContent[5]} />
          <p className="content">
            Most languages rely on try-catch exception handling. The issue with exceptions
            is that they create invisible control-flow jumps. A function call might throw
            an exception five stack frames down, bypassing cleanup routines and crashing
            the entire thread.
          </p>
          <p className="content">
            In Go, errors are <strong>first-class values</strong>. Functions that can fail
            return an error as their final return value alongside their result:
          </p>

          <CodeBlock
            filename="store.go"
            code={errorHandlingCode}
            langLabel="Go"
          />

          <p className="content">
            The idiomatic <Code code="if err != nil" /> pattern makes failure modes
            immediately visible during code review. You cannot accidentally ignore a
            failing database query or corrupted network socket because the compiler forces
            you to receive the error variable.
          </p>

          <Note note="For truly irrecoverable crashes (e.g. out of memory or nil pointer dereference), Go provides panic and recover. However, panic is strictly reserved for fatal programmer bugs, never for expected runtime domain errors." />

          {/* Section 07: Concurrency: Goroutines & Channels */}
          <Pointer {...tableOfContent[6]} />
          <p className="content">
            Concurrency is where Go truly dominates modern backend engineering. In traditional
            languages, creating a thread allocates an OS-level thread with 1MB to 2MB of stack
            memory. Running 10,000 OS threads will rapidly exhaust system RAM and degrade CPU
            performance through context-switching overhead.
          </p>
          <p className="content">
            In Go, concurrency is powered by <strong>Goroutines</strong>. A goroutine is a
            lightweight green thread managed entirely in user space by the Go runtime scheduler.
            A goroutine starts with only <strong>2 KB</strong> of stack memory and dynamically
            grows or shrinks as needed. A standard laptop can easily run hundreds of thousands
            of concurrent goroutines simultaneously.
          </p>

          <Callout data={calloutConcurrency} />

          <p className="content">
            Goroutines coordinate work through <strong>Channels</strong>—typed conduits that
            permit thread-safe message passing and synchronization:
          </p>

          <CodeBlock
            filename="worker_pool.go"
            code={concurrencyCode}
            langLabel="Go"
          />

          <NumberedList
            heading="How the Concurrent Worker Pool Operates"
            list={[
              <>
                <strong>Spawning Workers:</strong> The <Code code="go worker(...)" /> keyword
                launches each worker as an independent concurrent goroutine.
              </>,
              <>
                <strong>Job Distribution:</strong> Jobs are pushed into a buffered channel. The
                first available worker dequeues the job without race conditions.
              </>,
              <>
                <strong>Synchronization via WaitGroup:</strong> A <Code code="sync.WaitGroup" /> tracks
                the completion of all workers before the main routine shuts down.
              </>,
              <>
                <strong>Graceful Channel Closure:</strong> The channel is closed once all items
                are queued, signaling to workers that no more work remains.
              </>,
            ]}
          />

          {/* Section 08: Slices & Memory Model */}
          <Pointer {...tableOfContent[7]} />
          <p className="content">
            Understanding Go&apos;s memory model is essential for writing zero-allocation,
            high-throughput backend applications. The most frequently used data structure
            in Go is the <strong>Slice</strong>.
          </p>
          <p className="content">
            A slice is not an array; it is a 24-byte header containing three fields: a pointer
            to an underlying contiguous array in memory, a length (<Code code="len" />), and
            a capacity (<Code code="cap" />).
          </p>

          <CodeBlock
            filename="slices.go"
            code={slicesMemoryCode}
            langLabel="Go"
          />

          <BulletList
            title="Key Memory Characteristics of Go Slices"
            list={[
              <>
                <strong>Shared Backing Arrays:</strong> Sub-slicing a slice (<Code code="base[1:3]" />)
                does not copy elements. Both slices point to the identical underlying memory, making slicing
                an instantaneous O(1) operation.
              </>,
              <>
                <strong>Capacity Doubling:</strong> When an <Code code="append" /> exceeds the current
                capacity, Go allocates a new, larger backing array, copies the existing items, and points
                the slice to the new location.
              </>,
              <>
                <strong>Pre-allocation Optimization:</strong> Using <Code code="make([]T, 0, expectedSize)" /> avoids
                costly repeated memory allocations and garbage collection cycles in hot loops.
              </>,
            ]}
          />

          {/* Section 09: When to Choose Go */}
          <Pointer {...tableOfContent[8]} />
          <p className="content">
            No single programming language is the ideal tool for every problem. Go was
            engineered specifically for large-scale networked services, distributed infrastructure,
            and developer productivity.
          </p>

          <Checklist
            list={[
              "Ideal for microservices, HTTP REST APIs, and gRPC backend communication fleets.",
              "The undisputed industry standard for cloud infrastructure, containers, and orchestration (Docker, Kubernetes, Terraform, Helm).",
              "Superb choice for high-throughput network proxies, load balancers, and distributed storage engines.",
              "Fast developer onboarding: a junior engineer can read and contribute to production Go code within days.",
              "Sub-millisecond garbage collection pauses engineered specifically for low-latency web services.",
              "Compiles directly to native machine code in seconds, with zero runtime virtual machine overhead.",
            ]}
          />

          <p className="content mt-8">
            Whether you are building high-traffic API gateways, streaming telemetry pipelines,
            or distributed storage systems, Go gives you the performance of low-level systems
            code with the simplicity and joy of high-level engineering.
          </p>
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
