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
  appendGrowthCode,
  arraysVsSlicesCode,
  breadcrumbs,
  calloutArrayValueType,
  calloutMemoryRetentionLeak,
  calloutSharedBackingTrap,
  copyAndLeakCode,
  creatingSlicesCode,
  date,
  modernSlicesPkgCode,
  sliceHeaderCode,
  subSliceThreeIndexCode,
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

export default function ArraysAndSlicesPage() {
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
              text="Golang • Memory & Performance"
              timeToRead="11 MINS"
            />
            <ArticleTitle title="Arrays and Slices in Go: Internals, Capacity & Memory Leaks" />
            <ArticleDescription
              content="A simple, visual guide to Go slices. Learn how the 3-word slice header works, how append grows capacity, how to use the 3-index slice expression, and how to avoid shared backing array bugs."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["Golang", "Slices", "Arrays", "Memory", "Performance", "Internals"]}
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
              In languages like Python or JavaScript, lists and arrays are dynamic objects that resize
              automatically. You append items, extract sub-lists, and rarely have to think about memory.
            </p>
            <p className="main-content">
              In Go, <strong>arrays</strong> and <strong>slices</strong> look similar on the surface, but
              they work very differently under the hood. An array is a fixed block of memory, while a slice
              is a lightweight 3-word window looking into an array.
            </p>
            <p className="main-content">
              Understanding how slices share memory, how <Code code="append()" /> allocates new arrays, and
              how sub-slices can cause accidental memory leaks is essential for writing fast, bug-free Go code.
            </p>
          </div>

          <Callout data={calloutArrayValueType} />

          {/* Section 01: Arrays vs. Slices */}
          <Pointer {...tableOfContent[0]} />
          <p className="content">
            Let&apos;s start with the fundamental difference: arrays have a fixed size that is part of their type,
            while slices have a dynamic size.
          </p>

          <CodeBlock
            filename="arrays_vs_slices.go"
            code={arraysVsSlicesCode}
            langLabel="Go"
          />

          <BulletList
            title="Key Differences at a Glance"
            list={[
              <>
                <strong>Arrays are Fixed:</strong> <Code code="[3]int" /> and <Code code="[4]int" /> are completely
                different types. You cannot change an array&apos;s size after declaring it.
              </>,
              <>
                <strong>Arrays Copy by Value:</strong> Passing an array to a function copies every element.
                Modifying the array inside the function has no effect on the caller.
              </>,
              <>
                <strong>Slices are Dynamic Views:</strong> <Code code="[]int" /> is a slice. Passing a slice copies
                only its small 3-word header, so both the caller and the function share the same underlying data.
              </>,
            ]}
          />

          <Blockquote
            name="Rob Pike — Co-creator of Go"
            content="An array has its place — they are a useful building block for memory allocation — but for almost all Go code, slices do all the work."
          />

          {/* Section 02: The 3-Word Slice Header */}
          <Pointer {...tableOfContent[1]} />
          <p className="content">
            A slice is not an array itself. At runtime on 64-bit platforms, a slice is just a{" "}
            <strong>24-byte struct</strong> made of three fields:
          </p>

          <NumberedList
            heading="The 3 Fields in Every Slice Header"
            list={[
              <>
                <strong>Pointer (8 bytes):</strong> Points to the first element in the backing array.
              </>,
              <>
                <strong>Length (8 bytes):</strong> How many elements are in the slice (<Code code="len(s)" />).
              </>,
              <>
                <strong>Capacity (8 bytes):</strong> The total number of elements available in the backing array
                from the start of the slice (<Code code="cap(s)" />).
              </>,
            ]}
          />

          <p className="content mt-8">
            When you pass a slice to a function, Go copies this 24-byte header. If the function appends to the slice,
            it updates its own local header length, leaving the caller&apos;s length unchanged:
          </p>

          <CodeBlock
            filename="slice_header.go"
            code={sliceHeaderCode}
            langLabel="Go"
          />

          <Note note="In the example above, tryAppend updated its local length to 4. The caller still had length 3, but the 4th slot in the shared backing array was indeed updated with 999!" />

          {/* Section 03: Creating Slices */}
          <Pointer {...tableOfContent[2]} />
          <p className="content">
            There are three common ways to create a slice in Go. Notice the subtle difference between a{" "}
            <Code code="nil" /> slice and an empty slice:
          </p>

          <CodeBlock
            filename="creating_slices.go"
            code={creatingSlicesCode}
            langLabel="Go"
          />

          <BulletList
            title="Nil vs. Empty Slice Rules"
            list={[
              <>
                <strong>Nil Slice (<Code code="var s []string" />):</strong> Pointer is <Code code="nil" />,
                length is 0, and capacity is 0. Allocates zero memory on the heap.
              </>,
              <>
                <strong>Empty Slice (<Code code="[]string{}" /> or <Code code="make([]string, 0)" />):</strong> Holds a
                non-nil pointer to empty storage, length 0, capacity 0.
              </>,
              <>
                <strong>JSON Difference:</strong> A <Code code="nil" /> slice serializes to JSON as <Code code="null" />.
                An empty slice serializes to <Code code="[]" />. Use empty slices when building JSON API endpoints.
              </>,
              <>
                <strong>Pre-allocation:</strong> When you know how many items you will add, always use{" "}
                <Code code="make([]T, 0, capacity)" />. This avoids expensive reallocations as elements are appended.
              </>,
            ]}
          />

          {/* Section 04: How append Works & Capacity Growth */}
          <Pointer {...tableOfContent[3]} />
          <p className="content">
            When you call <Code code="append(s, item)" />, Go checks if there is still room in the backing array:
          </p>

          <NumberedList
            heading="How append() Decides What to Do"
            list={[
              <>
                <strong>If len &lt; cap:</strong> The element fits in the existing backing array. Go writes the item
                and increments length by 1. No new memory allocation occurs.
              </>,
              <>
                <strong>If len == cap:</strong> The backing array is full! Go allocates a new, larger array on the
                heap, copies all elements over, and updates the pointer.
              </>,
            ]}
          />

          <p className="content mt-8">
            You can see the capacity grow in the output below:
          </p>

          <CodeBlock
            filename="append_growth.go"
            code={appendGrowthCode}
            langLabel="Go"
          />

          <Note note="Notice how capacity jumps: 0 -> 1 -> 2 -> 4 -> 8. Go doubles the capacity for small slices so that future appends don't trigger constant allocations." />

          {/* Section 05: Shared Storage & The 3-Index Slice */}
          <Pointer {...tableOfContent[4]} />
          <p className="content">
            When you create a sub-slice using <Code code="s[1:3]" />, Go does <em>not</em> copy the data.
            Both slices point to the exact same elements in memory:
          </p>

          <Callout data={calloutSharedBackingTrap} />

          <p className="content">
            To protect the original slice from accidental mutation when appending to a sub-slice, Go provides
            the <strong>3-index slice expression</strong>: <Code code="slice[low:high:max]" />.
          </p>

          <CodeBlock
            filename="sub_slice_three_index.go"
            code={subSliceThreeIndexCode}
            langLabel="Go"
          />

          <NumberedList
            heading="The 3-Index Slice Expression: s[low:high:max]"
            list={[
              <>
                <strong>low:</strong> Start index.
              </>,
              <>
                <strong>high:</strong> End index (length = high - low).
              </>,
              <>
                <strong>max:</strong> Capacity limit (capacity = max - low).
              </>,
            ]}
          />

          <p className="content mt-8">
            By setting <Code code="max = high" /> (e.g. <Code code="s[1:3:3]" />), the sub-slice has capacity 2.
            The very next <Code code="append()" /> is forced to allocate a new backing array, leaving the original
            slice completely untouched.
          </p>

          {/* Section 06: copy() & Preventing Memory Leaks */}
          <Pointer {...tableOfContent[5]} />
          <p className="content">
            Because a slice holds a reference to its entire backing array, holding a small 4-byte slice from
            a 1MB file keeps all 1MB in memory, preventing the garbage collector from reclaiming it.
          </p>

          <Callout data={calloutMemoryRetentionLeak} />

          <p className="content">
            To safely decouple a small slice from a large buffer, use the built-in <Code code="copy()" /> function:
          </p>

          <CodeBlock
            filename="copy_and_leak.go"
            code={copyAndLeakCode}
            langLabel="Go"
          />

          <BulletList
            title="Important Rules for copy(dst, src)"
            list={[
              <>
                <strong>Destination Length Matters:</strong> <Code code="copy()" /> copies{" "}
                <Code code="min(len(dst), len(src))" /> items. If your destination has length 0, it copies 0 elements!
                Always make the destination with the desired length: <Code code="make([]T, count)" />.
              </>,
              <>
                <strong>Completely Independent:</strong> The copied data lives in a separate memory allocation,
                allowing the original large buffer to be garbage collected immediately.
              </>,
            ]}
          />

          {/* Section 07: Go 1.21+ slices Package */}
          <Pointer {...tableOfContent[6]} />
          <p className="content">
            Go 1.21 introduced the standard <Code code="slices" /> package, providing clean generic functions
            for common tasks without manual loops:
          </p>

          <CodeBlock
            filename="modern_slices.go"
            code={modernSlicesPkgCode}
            langLabel="Go"
          />

          <BulletList
            title="Top slices Package Helpers"
            list={[
              <>
                <strong>slices.Contains(s, target):</strong> Checks if an element exists.
              </>,
              <>
                <strong>slices.Sort(s):</strong> In-place sorting.
              </>,
              <>
                <strong>slices.Clone(s):</strong> Creates a shallow copy with separate backing storage.
              </>,
              <>
                <strong>slices.Equal(a, b):</strong> Checks if two slices contain identical elements.
              </>,
              <>
                <strong>slices.Compact(s):</strong> Removes consecutive duplicates from a sorted slice.
              </>,
              <>
                <strong>slices.Delete(s, i, j):</strong> Deletes an index range.
              </>,
            ]}
          />

          {/* Section 08: Production Best Practices */}
          <Pointer {...tableOfContent[7]} />
          <p className="content">
            Keep these simple rules in mind when working with slices in production Go applications:
          </p>

          <Checklist
            list={[
              "Pre-allocate capacity with make([]T, 0, capacity) when the count is known to avoid reallocation overhead.",
              "Use var s []T for unallocated slices; use []T{} or make([]T, 0) when JSON output requires [] instead of null.",
              "Always reassign append: s = append(s, val), because append might allocate a new backing array.",
              "Use the 3-index slice s[low:high:max] when sub-slicing to protect the parent slice from append overwrites.",
              "Avoid GC retention leaks: use copy() or slices.Clone() when keeping a small slice of a large buffer.",
              "Remember copy(dst, src) copies min(len(dst), len(src)); make sure len(dst) is non-zero.",
              "Use the standard slices package (slices.Contains, slices.Sort, slices.Clone) instead of writing custom helper loops.",
            ]}
          />

          <p className="content mt-8">
            By keeping the 3-word slice header model in mind, you can write Go code that is both clean and
            extremely memory-efficient.
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
