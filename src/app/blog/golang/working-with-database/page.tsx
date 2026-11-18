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
  calloutPgxNative,
  calloutSqlInjection,
  calloutWhySqlc,
  crudMainCode,
  date,
  generatedModelsCode,
  poolConfigCode,
  querySqlCode,
  schemaSqlCode,
  sqlcGenerateCommand,
  sqlcYamlCode,
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

export default function WorkingWithDatabasePage() {
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
              text="Golang • PostgreSQL & sqlc"
              timeToRead="10 MINS"
            />
            <ArticleTitle title="Working with Databases in Go: PostgreSQL, pgx & sqlc" />
            <ArticleDescription
              content="The modern, pragmatic stack for Go databases. Learn how to build clean, compile-time type-safe CRUD applications using PostgreSQL, pgxpool, and sqlc—without manual row scans or heavy ORM baggage."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["Golang", "PostgreSQL", "pgx", "sqlc", "Database", "Backend"]}
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
              Connecting to a database in Go often presents a frustrating dilemma. On one hand,
              the standard <Code code="database/sql" /> package forces you to write endless, repetitive
              boilerplate: declaring destination variables, manually listing column scans like{" "}
              <Code code="rows.Scan(&u.ID, &u.Name, &u.Email)" />, and tracking row errors.
            </p>
            <p className="main-content">
              On the other hand, traditional Object-Relational Mappers (ORMs) bring heavy runtime reflection,
              mysterious query generators, and subtle N+1 performance traps that run counter to Go&apos;s
              philosophy of simplicity and mechanical sympathy.
            </p>
            <p className="main-content">
              Today, the Go community has converged on a clean, modern standard:{" "}
              <strong>PostgreSQL + pgx + sqlc</strong>. You write clean, standard SQL. A CLI tool compiles
              your queries into 100% type-safe Go code. You get blazing fast, compile-time verified CRUD with
              zero boilerplate.
            </p>
          </div>

          <Callout data={calloutWhySqlc} />

          {/* Section 01: Why PostgreSQL, pgx & sqlc? */}
          <Pointer {...tableOfContent[0]} />
          <p className="content">
            This three-tier combination gives you the best of all worlds:
          </p>

          <BulletList
            title="The Three Pillars of the Modern Go DB Stack"
            list={[
              <>
                <strong>PostgreSQL:</strong> The industry-standard open-source relational database, offering
                robust ACID compliance, concurrency, and rich native data types.
              </>,
              <>
                <strong>pgx (jackc/pgx/v5):</strong> The fastest native PostgreSQL driver and toolkit for Go.
                It speaks PostgreSQL&apos;s binary wire protocol directly, supports native connection pooling
                via <Code code="pgxpool" />, and outperforms generic database/sql drivers.
              </>,
              <>
                <strong>sqlc:</strong> An ahead-of-time compiler. You give it your table schema (<Code code="schema.sql" />)
                and your CRUD queries (<Code code="query.sql" />). It parses the SQL, validates column names and types,
                and generates idiomatic, fully type-safe Go structs and methods.
              </>,
            ]}
          />

          <Callout data={calloutPgxNative} />

          <Blockquote
            name="The sqlc Philosophy"
            content="SQL is already a complete, expressive programming language for data. Don't hide it behind an ORM. Write SQL, and let the compiler generate the Go boilerplate for you."
          />

          {/* Section 02: Step 1: Database Schema */}
          <Pointer {...tableOfContent[1]} />
          <p className="content">
            Everything starts with standard SQL. Create a file named <Code code="schema.sql" /> representing
            your database tables:
          </p>

          <CodeBlock
            filename="schema.sql"
            code={schemaSqlCode}
            langLabel="SQL"
          />

          <p className="content">
            This table contains an auto-incrementing 64-bit primary key (<Code code="id" />), required text fields
            (<Code code="name" />, <Code code="email" />), an optional nullable text field (<Code code="bio" />),
            and a timestamp default (<Code code="created_at" />).
          </p>

          {/* Section 03: Step 2: CRUD Queries */}
          <Pointer {...tableOfContent[2]} />
          <p className="content">
            Next, create a file named <Code code="query.sql" />. Here you write the exact SQL statements you want
            to run. Precede each query with a simple annotation comment indicating the generated Go function name
            and the expected result cardinality:
          </p>

          <NumberedList
            heading="sqlc Query Annotations"
            list={[
              <>
                <strong>:one</strong> — Expects exactly one row (e.g. single-row lookup or insert with <Code code="RETURNING" />).
                Generates a function returning <Code code="(User, error)" />.
              </>,
              <>
                <strong>:many</strong> — Expects multiple rows (e.g. filtered list).
                Generates a function returning <Code code="([]User, error)" />.
              </>,
              <>
                <strong>:exec</strong> — Executes a command with no rows returned (e.g. simple delete).
                Generates a function returning <Code code="error" />.
              </>,
            ]}
          />

          <CodeBlock
            filename="query.sql"
            code={querySqlCode}
            langLabel="SQL"
          />

          <Callout data={calloutSqlInjection} />

          {/* Section 04: Step 3: sqlc Configuration & Generation */}
          <Pointer {...tableOfContent[3]} />
          <p className="content">
            Configure <Code code="sqlc" /> with a single configuration file named <Code code="sqlc.yaml" /> in your project root:
          </p>

          <CodeBlock
            filename="sqlc.yaml"
            code={sqlcYamlCode}
            langLabel="YAML"
          />

          <p className="content">
            Now run the generator command in your terminal:
          </p>

          <CodeBlock
            filename="terminal"
            code={sqlcGenerateCommand}
            langLabel="Terminal"
          />

          <p className="content">
            <Code code="sqlc" /> instantly inspects your SQL, verifies that all column names match the schema, and generates
            pure, dependency-free Go code inside the <Code code="db" /> package:
          </p>

          <CodeBlock
            filename="db/models.go"
            code={generatedModelsCode}
            langLabel="Go"
          />

          <Note note="Notice how sqlc automatically maps the nullable bio TEXT column to pgtype.Text. No manual handling of sql.NullString or pointer boilerplate needed!" />

          {/* Section 05: Step 4: Connecting with pgxpool */}
          <Pointer {...tableOfContent[4]} />
          <p className="content">
            In Go web servers and background workers, you manage database connections using a thread-safe connection pool.
            With <Code code="pgx/v5" />, this is provided by <Code code="pgxpool.Pool" />:
          </p>

          <CodeBlock
            filename="pool.go"
            code={poolConfigCode}
            langLabel="Go"
          />

          <BulletList
            title="Essential Connection Pool Settings"
            list={[
              <>
                <strong>MaxConns (e.g. 25):</strong> Caps the total number of simultaneous connections to prevent
                overwhelming the PostgreSQL server under traffic spikes.
              </>,
              <>
                <strong>MinConns (e.g. 5):</strong> Keeps warm connections ready to handle incoming queries without
                the latency penalty of a TCP and TLS handshake.
              </>,
              <>
                <strong>MaxConnLifetime & MaxConnIdleTime:</strong> Periodically recycles old connections to cooperate
                smoothly with cloud load balancers and database failovers.
              </>,
            ]}
          />

          {/* Section 06: Step 5: Executing CRUD in Go */}
          <Pointer {...tableOfContent[5]} />
          <p className="content">
            With the pool established and the queries compiled, performing CRUD operations in your Go application
            is straightforward, readable, and 100% type-safe:
          </p>

          <CodeBlock
            filename="main.go"
            code={crudMainCode}
            langLabel="Go"
          />

          <NumberedList
            heading="What Happens in main.go"
            list={[
              <>
                <strong>Initialize:</strong> Wrap the <Code code="pgxpool.Pool" /> with <Code code="db.New(pool)" /> to create a queries client.
              </>,
              <>
                <strong>Create:</strong> Pass typed parameters (<Code code="db.CreateUserParams" />) to <Code code="CreateUser" />.
                The generated ID and timestamp are returned directly.
              </>,
              <>
                <strong>Read:</strong> Call <Code code="GetUserByID" /> with a typed <Code code="int64" /> ID, or <Code code="ListUsers" /> to fetch a slice.
              </>,
              <>
                <strong>Update:</strong> Execute <Code code="UpdateUserBio" /> with the user ID and updated text.
              </>,
              <>
                <strong>Delete:</strong> Call <Code code="DeleteUser" /> to permanently remove the record.
              </>,
            ]}
          />

          {/* Section 07: Key Takeaways & Best Practices */}
          <Pointer {...tableOfContent[6]} />
          <p className="content">
            The PostgreSQL + pgx + sqlc combination eliminates the friction of working with relational databases in Go:
          </p>

          <Checklist
            list={[
              "Write plain SQL in schema.sql and query.sql — let sqlc generate all Go boilerplate.",
              "Get compile-time verification: typos and schema mismatches fail your build before code ever touches production.",
              "Zero reflection overhead: sqlc methods execute with raw Go function call performance.",
              "Use pgxpool for native PostgreSQL binary protocol speed and concurrent connection pooling.",
              "Always pass context.Context to respect query timeouts and HTTP request cancellation.",
              "Keep queries organized, observable, and easy to index without deciphering complex ORM abstractions.",
            ]}
          />

          <p className="content mt-8">
            By letting SQL do what it does best (querying and defining data) and letting Go do what it does best
            (type safety, concurrent execution, and predictable performance), you achieve a simple, clean, and
            unbreakable database foundation.
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
