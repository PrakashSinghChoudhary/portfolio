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
  calloutInterfaceNilGotcha,
  calloutNoImplicitCasting,
  calloutZeroValues,
  date,
  interfacesAnyCode,
  mapsCode,
  pointersEscapeCode,
  primitivesCode,
  slicesCode,
  stringsRunesCode,
  structsMemoryCode,
  tableOfContent,
  zeroValuesCode,
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

export default function DataTypesInGolangPage() {
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
              text="Golang • Type System"
              timeToRead="14 MINS"
            />
            <ArticleTitle title="Data Types in Golang" />
            <ArticleDescription
              content="Master the foundations of Go&apos;s type system. From primitives and UTF-8 string headers to slice capacity mechanics, struct padding, escape analysis, and the subtle nil interface trap."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["Golang", "Types", "Pointers", "Memory", "Backend"]}
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
              In dynamically typed languages like JavaScript or Python, types exist as
              ephemeral runtime metadata tagged onto values. You can reassign a number to a
              string, pass arbitrary objects into functions, and hope runtime test coverage
              catches missing properties before production traffic does.
            </p>
            <p className="main-content">
              <strong>Go takes the opposite stance</strong>: every variable, parameter, and
              expression has a known, unalterable type established at compile time. But unlike
              C or C++, Go avoids convoluted type gymnastics, header files, and manual memory
              arithmetic.
            </p>
            <p className="main-content">
              Understanding Go&apos;s data types is not just about memorizing names like{" "}
              <Code code="int32" /> or <Code code="float64" />. It is about understanding how
              the compiler arranges bytes in memory, how zero values eliminate uninitialized state,
              how slices avoid memory copies, and why Go refuses to perform implicit type
              coercion.
            </p>
          </div>

          <Callout data={calloutNoImplicitCasting} />

          {/* Section 01: Philosophy of Go Types */}
          <Pointer {...tableOfContent[0]} />
          <p className="content">
            The design of Go&apos;s type system is driven by three foundational tenets:
            <strong> clarity, predictability, and memory efficiency</strong>.
          </p>

          <BulletList
            title="Core Pillars of Go's Type Philosophy"
            list={[
              <>
                <strong>Compile-Time Soundness:</strong> Type mismatches are caught before a
                single byte of binary is emitted. There is no concept of dynamic type mutation.
              </>,
              <>
                <strong>No Implicit Casting:</strong> Adding an <Code code="int16" /> to an{" "}
                <Code code="int32" /> is a compilation error. You must explicitly write{" "}
                <Code code="int32(val16) + val32" />. The language refuses to guess your intentions.
              </>,
              <>
                <strong>No Uninitialized Memory:</strong> Variables are immediately initialized to
                deterministic zero values upon declaration. Dangling wild pointers and garbage memory
                are physically impossible in safe Go code.
              </>,
              <>
                <strong>Value Semantics by Default:</strong> Unless explicitly referenced through a
                pointer (<Code code="*T" />), passing data to a function creates an independent copy,
                isolating caller state from side-effects.
              </>,
            ]}
          />

          <Blockquote
            name="Ken Thompson — Co-creator of Go, Unix & B"
            content="You don't need dozens of overlapping type features. If you get the primitives, structs, slices, and interfaces right, you can build any software system on Earth."
          />

          {/* Section 02: Primitive Types & Zero Values */}
          <Pointer {...tableOfContent[1]} />
          <p className="content">
            Go provides a concise set of basic primitive types categorized into booleans,
            integers, floating-point numbers, and complex numbers:
          </p>

          <CodeBlock
            filename="primitives.go"
            code={primitivesCode}
            langLabel="Go"
          />

          <NumberedList
            heading="Primitive Type Classifications"
            list={[
              <>
                <strong>Booleans (<Code code="bool" />):</strong> Either <Code code="true" /> or{" "}
                <Code code="false" />. Booleans cannot be cast to integers (unlike C/C++ where 0 is false and 1 is true).
              </>,
              <>
                <strong>Architecture-Independent Integers:</strong> Fixed-width types:{" "}
                <Code code="int8" />, <Code code="int16" />, <Code code="int32" />, <Code code="int64" />, and their
                unsigned counterparts <Code code="uint8" />, <Code code="uint16" />, <Code code="uint32" />, <Code code="uint64" />.
              </>,
              <>
                <strong>Platform-Dependent Integers:</strong> <Code code="int" /> and <Code code="uint" />{" "}
                match the target CPU architecture: 32 bits on 32-bit platforms, 64 bits on 64-bit systems.
              </>,
              <>
                <strong>Floating-Point (<Code code="float32" />, <Code code="float64" />):</strong> IEEE-754
                floating point numbers. In standard Go code, <Code code="float64" /> is almost universally preferred
                because math package functions expect it.
              </>,
            ]}
          />

          <p className="content mt-8">
            Whenever a variable is allocated without an initial expression, Go guarantees it
            is populated with its type&apos;s zero value:
          </p>

          <CodeBlock
            filename="zero_values.go"
            code={zeroValuesCode}
            langLabel="Go"
          />

          <Callout data={calloutZeroValues} />

          {/* Section 03: Strings, Bytes & Runes */}
          <Pointer {...tableOfContent[2]} />
          <p className="content">
            Strings in Go often surprise engineers coming from Python or JavaScript. In Go,
            a <strong>string</strong> is an <em>immutable sequence of arbitrary bytes</em>,
            encoded by convention as UTF-8.
          </p>
          <p className="content">
            A string does not store characters; it stores bytes. A string header in memory
            consists of two words (16 bytes on 64-bit platforms): a pointer to the backing
            byte array, and an integer length.
          </p>

          <CodeBlock
            filename="strings_runes.go"
            code={stringsRunesCode}
            langLabel="Go"
          />

          <Note note="Because Go strings are UTF-8, len(s) returns the number of raw bytes, not visual characters. The string 'Hello, 世界' is 13 bytes long because each Chinese ideograph requires 3 UTF-8 bytes." />

          <BulletList
            title="Bytes vs. Runes in Go"
            list={[
              <>
                <strong>byte (uint8 alias):</strong> Represents a single raw 8-bit octet. Used for
                raw network packets, binary files, and ASCII characters.
              </>,
              <>
                <strong>rune (int32 alias):</strong> Represents an individual Unicode Code Point.
                When you range over a string (<Code code="for idx, r := range str" />), Go automatically
                decodes UTF-8 byte sequences into 32-bit runes.
              </>,
              <>
                <strong>Immutability:</strong> You cannot mutate string indices directly (<Code code="s[0] = 'h'" /> will not compile).
                To mutate, convert the string to a byte slice (<Code code="[]byte(s)" />) or rune slice (<Code code="[]rune(s)" />), modify it,
                and convert back.
              </>,
            ]}
          />

          {/* Section 04: Arrays vs. Slices */}
          <Pointer {...tableOfContent[3]} />
          <p className="content">
            Many languages blur the line between arrays and lists. Go draws a strict, critical distinction
            between <strong>Arrays</strong> and <strong>Slices</strong>.
          </p>
          <p className="content">
            An <strong>Array</strong> has a fixed length compiled directly into its type signature.
            The type <Code code="[3]int" /> and <Code code="[4]int" /> are completely incompatible types.
            Furthermore, assigning or passing an array makes an entire copy of its elements.
          </p>
          <p className="content">
            A <strong>Slice</strong> is a lightweight window over an underlying array. Its header is only
            24 bytes (Pointer, Length, Capacity):
          </p>

          <CodeBlock
            filename="slices.go"
            code={slicesCode}
            langLabel="Go"
          />

          <NumberedList
            heading="Anatomy of a Slice Header (24 Bytes on 64-bit)"
            list={[
              <>
                <strong>Pointer (8 bytes):</strong> Memory address of the first reachable element in the backing array.
              </>,
              <>
                <strong>Length (8 bytes):</strong> The number of elements currently accessible through the slice (<Code code="len(s)" />).
              </>,
              <>
                <strong>Capacity (8 bytes):</strong> The total number of elements in the backing array counting from the slice pointer (<Code code="cap(s)" />).
              </>,
              <>
                <strong>Growth Semantics:</strong> When <Code code="append" /> exceeds capacity, Go allocates a new backing array,
                copies the elements, and doubles capacity for small slices (or grows by ~1.25x for large slices).
              </>,
            ]}
          />

          {/* Section 05: Maps & Comma-Ok Idiom */}
          <Pointer {...tableOfContent[4]} />
          <p className="content">
            A <strong>Map</strong> is Go&apos;s built-in hash table data structure, providing O(1)
            average-time key lookups, insertions, and deletions.
          </p>
          <p className="content">
            Maps are reference types. An uninitialized map has a value of <Code code="nil" />. Reading
            from a nil map is safe and returns the value type&apos;s zero value; however, writing to a nil
            map triggers a fatal runtime panic!
          </p>

          <CodeBlock
            filename="maps.go"
            code={mapsCode}
            langLabel="Go"
          />

          <BulletList
            title="Critical Map Rules in Production Go"
            list={[
              <>
                <strong>Always Initialize with make:</strong> Allocate maps with <Code code="make(map[KeyType]ValueType, initialCapacity)" /> to avoid nil map write panics.
              </>,
              <>
                <strong>The Comma-Ok Pattern:</strong> Since reading a missing key returns 0 or &quot;&quot;, you cannot distinguish between a missing key and an existing key with a zero value. Always use <Code code="val, ok := m[key]" /> to check existence.
              </>,
              <>
                <strong>Not Concurrency-Safe:</strong> Simultaneous unsynchronized concurrent writes to a standard Go map will trigger a fatal, uncatchable runtime crash (<Code code="fatal error: concurrent map writes" />). Use <Code code="sync.RWMutex" /> or <Code code="sync.Map" /> in multi-goroutine systems.
              </>,
            ]}
          />

          {/* Section 06: Structs & Memory Alignment */}
          <Pointer {...tableOfContent[5]} />
          <p className="content">
            A <strong>Struct</strong> is a collection of fields packaged into a single contiguous block
            of memory. Structs are the cornerstone of domain data modeling in Go.
          </p>
          <p className="content">
            Because modern CPUs fetch data in 8-byte (64-bit) word boundaries, the order in which you
            declare fields inside a struct directly affects its total size due to <strong>padding bytes</strong>:
          </p>

          <CodeBlock
            filename="struct_alignment.go"
            code={structsMemoryCode}
            langLabel="Go"
          />

          <Note note="In the example above, UnalignedUser occupies 32 bytes because of padding between boolean and 64-bit fields. By simply reordering fields from largest to smallest, AlignedUser drops to 24 bytes—a 25% memory savings across large in-memory caches!" />

          <p className="content mt-8">
            Go also allows defining <strong>Custom Named Types</strong> (e.g. <Code code="type TenantID int64" />).
            Even though <Code code="TenantID" /> and <Code code="CustomerID" /> share the exact underlying type,
            they cannot be assigned to one another without an explicit cast, preventing accidental cross-domain ID mixups.
          </p>

          {/* Section 07: Pointers & Escape Analysis */}
          <Pointer {...tableOfContent[6]} />
          <p className="content">
            In Go, a <strong>Pointer</strong> (<Code code="*T" />) stores the memory address of a value.
            Unlike C, Go does not permit pointer arithmetic. You cannot write <Code code="ptr++" /> to jump to the
            next memory address.
          </p>
          <p className="content">
            When you declare a variable inside a function, where does it live? In traditional systems, local
            variables live on the fast CPU stack and are erased when the function returns. But what if a function
            returns a pointer to a local variable?
          </p>

          <CodeBlock
            filename="pointers_escape.go"
            code={pointersEscapeCode}
            langLabel="Go"
          />

          <NumberedList
            heading="How the Go Compiler Handles Memory Allocation"
            list={[
              <>
                <strong>Stack Allocation:</strong> Fast, automatic allocation and cleanup. No garbage collection overhead.
                Used when the compiler proves a variable does not outlive its declaring stack frame.
              </>,
              <>
                <strong>Escape Analysis:</strong> The compiler traces the lifecycle of every variable. If a reference to a
                variable escapes the function boundary (e.g. returning <Code code="&sess" />), the compiler moves that allocation
                to the <strong>Heap</strong>.
              </>,
              <>
                <strong>Heap Allocation:</strong> Managed by Go&apos;s concurrent garbage collector. Slightly slower allocation,
                but guarantees memory remains valid as long as references persist.
              </>,
            ]}
          />

          {/* Section 08: Interfaces & The any Type */}
          <Pointer {...tableOfContent[7]} />
          <p className="content">
            An <strong>Interface</strong> defines a set of method signatures. In Go, interfaces are two-word
            structures in memory: one word stores the type descriptor (metadata about the concrete type), and the
            second word points to the actual data.
          </p>
          <p className="content">
            Since Go 1.18, <Code code="any" /> is an alias for the empty interface <Code code="interface{}" />.
            An <Code code="any" /> can hold any value in the language.
          </p>

          <CodeBlock
            filename="interfaces_any.go"
            code={interfacesAnyCode}
            langLabel="Go"
          />

          <Callout data={calloutInterfaceNilGotcha} />

          <p className="content">
            In the code above, <Code code="parser == nil" /> evaluates to <Code code="false" />! Even though the underlying
            pointer is nil, the interface&apos;s type descriptor holds <Code code="*JSONParser" />. A nil interface check
            only passes if <strong>both type and value</strong> are nil.
          </p>

          {/* Section 09: Best Practices & Summary */}
          <Pointer {...tableOfContent[8]} />
          <p className="content">
            Mastering Go data types is the foundation for writing high-throughput, low-latency production software:
          </p>

          <Checklist
            list={[
              "Embrace zero values: design structs so their default zero state is immediately valid and usable without complex initialization.",
              "Pre-allocate slices and maps with make(..., size) when the capacity is known ahead of time to eliminate reallocation churn.",
              "Order struct fields from largest to smallest to minimize alignment padding and shrink memory footprint.",
              "Use pointer receivers (*T) when mutating state or passing large structs (>64 bytes); use value receivers for small, immutable types.",
              "Always check the comma-ok idiom (val, ok := m[key]) when reading from maps to verify key presence.",
              "Beware of the interface nil trap: never store a typed nil pointer into an interface expecting it to equal nil.",
              "Favor concrete types for parameters and small, consumer-defined interfaces for return values and boundaries.",
            ]}
          />

          <p className="content mt-8">
            Go&apos;s type system is not about fighting the compiler; it is about writing unambiguous, mechanical,
            and reliable systems that perform with blistering speed on modern multi-core servers.
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
