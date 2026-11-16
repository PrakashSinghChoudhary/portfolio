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
  calloutComparison,
  calloutFactoryMethod,
  date,
  notificationFactoryCode,
  paymentGatewayCode,
  registryFactoryCode,
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

export default function FactoryMethodPage() {
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
              timeToRead="12 MINS"
            />
            <ArticleTitle title="Factory Method Pattern" />
            <ArticleDescription
              content="Stop hardcoding 'new' across your codebase. Learn how the Factory Method pattern decouples object creation from business logic in TypeScript, letting your architecture embrace change without breaking."
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
              Object creation looks harmless in tutorial projects. Whenever you
              need an instance of a service, you type{" "}
              <Code code="const gateway = new StripeGateway()" /> and move on.
              In production architectures, however, scattered direct
              instantiation is a silent killer of maintainability.
            </p>
            <p className="main-content">
              When business logic is directly coupled to concrete class
              constructors, your codebase becomes brittle. The moment you need
              to introduce PayPal, Razorpay, or a mock gateway for local
              testing, you are forced to hunt through dozens of service files,
              modifying existing code and littering controllers with fragile{" "}
              <Code code="switch" /> statements.
            </p>
            <p className="main-content">
              The <strong>Factory Method Pattern</strong> addresses this
              coupling at its root. By delegating the creation of objects to
              specialized methods and subclasses, your core business logic
              operates purely against clean interfaces, completely oblivious to
              the concrete classes running underneath.
            </p>

            {/* Visual Blueprint Diagram */}
            <div className="mt-12 rounded-xl border bg-(--bg-2) p-6 border-(--border)">
              <div className="text-[11px] font-mono tracking-[0.1em] text-(--text-3) uppercase">
                Architecture Blueprint • Creator & Product Hierarchy
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Creator Side */}
                <div className="rounded-lg border border-(--border) bg-(--bg) p-4">
                  <div className="text-[10px] font-mono tracking-[0.08em] text-(--text-3)">
                    CREATOR HIERARCHY
                  </div>
                  <div className="mt-2 rounded-md border border-dashed border-(--border-strong) bg-(--bg-2) p-2.5 text-center">
                    <span className="font-mono text-[12px] font-semibold text-(--text)">
                      abstract PaymentProcessor
                    </span>
                    <div className="mt-1 text-[10px] font-mono text-(--text-2)">
                      + processOrder() • # createGateway()
                    </div>
                  </div>
                  <div className="my-2 text-center text-(--text-3) text-[11px]">
                    ▲ extends
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded border bg-(--bg-2) p-2 text-center font-mono text-[11px] text-(--text-2) border-(--border)">
                      StripeProcessor
                    </div>
                    <div className="rounded border bg-(--bg-2) p-2 text-center font-mono text-[11px] text-(--text-2) border-(--border)">
                      PayPalProcessor
                    </div>
                  </div>
                </div>

                {/* Product Side */}
                <div className="rounded-lg border border-(--border) bg-(--bg) p-4">
                  <div className="text-[10px] font-mono tracking-[0.08em] text-(--text-3)">
                    PRODUCT HIERARCHY
                  </div>
                  <div className="mt-2 rounded-md border border-dashed border-(--border-strong) bg-(--bg-2) p-2.5 text-center">
                    <span className="font-mono text-[12px] font-semibold text-(--text)">
                      interface PaymentGateway
                    </span>
                    <div className="mt-1 text-[10px] font-mono text-(--text-2)">
                      + charge() • + refund()
                    </div>
                  </div>
                  <div className="my-2 text-center text-(--text-3) text-[11px]">
                    ▲ implements
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded border bg-(--bg-2) p-2 text-center font-mono text-[11px] text-(--text-2) border-(--border)">
                      StripeGateway
                    </div>
                    <div className="rounded border bg-(--bg-2) p-2 text-center font-mono text-[11px] text-(--text-2) border-(--border)">
                      PayPalGateway
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t pt-3 border-(--border) text-center text-[11px] font-mono text-(--text-3)">
                The abstract creator relies on the product interface; subclasses
                supply the concrete implementation.
              </div>
            </div>
          </div>

          {/* Section 01: The Problem with Hardcoding 'new' */}
          <Pointer {...tableOfContent[0]} />
          <p className="content mt-12!">
            To understand why the Factory Method exists, let{"'"}s examine what
            happens when we build without it. Imagine an e-commerce platform
            where an <Code code="OrderService" /> handles customer checkouts.
          </p>
          <p className="content">
            Initially, the business only accepts credit card payments through
            Stripe. You write code like this inside your order processing method:
          </p>

          <div className="my-4 rounded-lg border bg-(--bg-2) p-4 font-mono text-[12px] text-(--text-2) border-(--border)">
            const gateway = new StripeGateway(process.env.STRIPE_SECRET_KEY);
            <br />
            await gateway.charge(order.total, &quot;USD&quot;);
          </div>

          <p className="content">
            Six months later, your company expands to Europe and Latin America.
            Product managers demand PayPal for German users and Mercado Pago for
            Brazilian users. Suddenly, every controller and background worker
            that interacts with payments grows into an unmanageable conditional:
          </p>

          <BulletList
            title="The Consequences of Hardcoded Instantiation:"
            list={[
              <>
                <strong className="text-(--text)">
                  Violation of Open/Closed Principle (OCP):
                </strong>{" "}
                Every time a new payment provider is supported, you must open and
                modify existing, tested business logic.
              </>,
              <>
                <strong className="text-(--text)">Constructor Leaks:</strong> If{" "}
                <Code code="PayPalGateway" /> requires three configuration
                tokens and an OAuth redirect handler while{" "}
                <Code code="StripeGateway" /> requires only an API key, the
                calling service must know how to construct every single
                variant.
              </>,
              <>
                <strong className="text-(--text)">Rigid Testing:</strong> In
                automated unit tests, you cannot easily substitute a lightweight
                in-memory mock gateway because the service invokes{" "}
                <Code code="new StripeGateway()" /> internally.
              </>,
            ]}
          />

          {/* Section 02: What is the Factory Method Pattern? */}
          <Pointer {...tableOfContent[1]} />
          <p className="content mt-12!">
            The Gang of Four formalized the <strong>Factory Method</strong> to
            solve this exact architectural dilemma.
          </p>

          <div className="mt-8">
            <Callout data={calloutFactoryMethod} />
          </div>

          <p className="content">
            The core idea is straightforward: instead of calling{" "}
            <Code code="new ConcreteProduct()" /> directly in your business logic,
            you call a dedicated method (the <em>factory method</em>) to create
            the object for you.
          </p>
          <p className="content">
            The base class defines the overall workflow (such as validating the
            cart, calculating tax, charging the customer, and sending a receipt)
            while declaring the factory method as <Code code="abstract" />.
            Concrete subclasses override that factory method to instantiate and
            return the specific gateway needed for that runtime scenario.
          </p>

          <Blockquote
            name="— Design Pattern Core Philosophy"
            content="Separate the code that uses an object from the code that creates it. Let the workflow operate on abstract contracts, and delegate the decision of which class to instantiate to subclasses."
          />

          {/* Section 03: Simple Factory vs Factory Method vs Abstract Factory */}
          <Pointer {...tableOfContent[2]} />
          <p className="content mt-12!">
            Few design concepts cause as much confusion as the term &quot;Factory&quot;.
            Developers often lump three distinct concepts into one basket:
          </p>

          <div className="mt-8">
            <Callout data={calloutComparison} />
          </div>

          <BulletList
            title="When to distinguish between them:"
            list={[
              <>
                <strong className="text-(--text)">Simple Factory:</strong> A
                standalone helper function with a <Code code="switch" />{" "}
                statement. Useful for small utility scripts, but requires
                modifying the function every time a new subclass is introduced.
              </>,
              <>
                <strong className="text-(--text)">Factory Method:</strong> Built
                on inheritance and polymorphism. You extend a base creator and
                override one method. Highly extensible because new products
                require only a new subclass, never modifying existing creators.
              </>,
              <>
                <strong className="text-(--text)">Abstract Factory:</strong>{" "}
                A factory of factories. Used when you must produce whole suites
                of complementary objects that must match (e.g., MacButton +
                MacCheckbox vs WindowsButton + WindowsCheckbox).
              </>,
            ]}
          />

          {/* Section 04: Real-World Example 1: Multi-Provider Payment Gateway */}
          <Pointer {...tableOfContent[3]} />
          <p className="content mt-12!">
            Let{"'"}s see the Factory Method in action using real-world,
            production-grade TypeScript. We will construct a complete payment
            processing engine that processes orders identically regardless of
            whether the underlying provider is Stripe or PayPal.
          </p>

          <CodeBlock
            filename="payment.factory.ts"
            code={paymentGatewayCode}
            langLabel="TypeScript"
          />

          <p className="content">
            Notice the architectural elegance: the method{" "}
            <Code code="processOrder()" /> in <Code code="PaymentProcessor" />{" "}
            contains 100% of the domain logic (logging order IDs, handling
            success outcomes, checking flags). It never mentions{" "}
            <Code code="StripeGateway" /> or <Code code="PayPalGateway" />. It
            interacts strictly with the <Code code="PaymentGateway" /> interface
            returned by its own internal factory method.
          </p>

          {/* Section 05: Real-World Example 2: Multi-Channel Notification Engine */}
          <Pointer {...tableOfContent[4]} />
          <p className="content mt-12!">
            Another ubiquitous production challenge is multi-channel user
            alerting. Your system needs to notify users across multiple distinct
            transports:
          </p>

          <Checklist
            list={[
              "Transactional Emails via SendGrid or AWS Simple Email Service (SES).",
              "SMS Alerts via Twilio for time-critical two-factor authentication codes.",
              "Push Notifications via Firebase Cloud Messaging (FCM) for active mobile apps.",
            ]}
          />

          <p className="content">
            Each delivery channel requires distinct credentials, headers, and
            payload structures. Using the Factory Method, we encapsulate
            channel creation cleanly:
          </p>

          <CodeBlock
            filename="notification.factory.ts"
            code={notificationFactoryCode}
            langLabel="TypeScript"
          />

          <Note note="Notice how adding a Slack or WhatsApp notification channel tomorrow requires zero edits to NotificationDispatcher. You simply create a new SlackChannel product and a SlackDispatcher creator. The Open/Closed Principle in its purest form." />

          {/* Section 06: Modern TypeScript Variant: The Registry Factory */}
          <Pointer {...tableOfContent[5]} />
          <p className="content mt-12!">
            In traditional Java or C++, subclassing is the default idiom. In
            modern TypeScript, however, creating a new subclass for every single
            product can occasionally feel heavy and verbose.
          </p>
          <p className="content">
            Modern TypeScript architectures frequently leverage the{" "}
            <strong>Registry Factory</strong> (also known as a Parameterized
            Type-Safe Factory). Instead of subclassing, concrete constructors
            are registered in a type-safe registry map at application boot:
          </p>

          <CodeBlock
            filename="registry.factory.ts"
            code={registryFactoryCode}
            langLabel="TypeScript"
          />

          <BulletList
            title="Benefits of the TypeScript Registry Pattern:"
            list={[
              <>
                <strong className="text-(--text)">Dynamic Extensibility:</strong>{" "}
                Plugins or secondary packages can register their own providers
                at runtime without touching core files.
              </>,
              <>
                <strong className="text-(--text)">Compile-Time Type Safety:</strong>{" "}
                TypeScript union types guarantee that typos like{" "}
                <Code code="create('strip')" /> fail at compile time.
              </>,
              <>
                <strong className="text-(--text)">No Class Explosion:</strong>{" "}
                Avoids having to maintain dozens of boilerplate subclasses when
                only the product instantiation differs.
              </>,
            ]}
          />

          {/* Section 07: When to Use and When to Avoid */}
          <Pointer {...tableOfContent[6]} />
          <p className="content mt-12!">
            Like all patterns, the Factory Method is a tool designed for
            specific architectural pressures. It is not a default requirement
            for every object in your system.
          </p>

          <BulletList
            title="When to Reach for the Factory Method:"
            list={[
              <>
                <strong className="text-(--text)">Unknown Product Types:</strong>{" "}
                When you do not know beforehand the exact types and dependencies
                of the objects your code will need to work with.
              </>,
              <>
                <strong className="text-(--text)">Library or Framework Design:</strong>{" "}
                When you want to allow consumers of your library or framework to
                extend its internal components by supplying their own custom
                classes.
              </>,
              <>
                <strong className="text-(--text)">Consolidating Allocation Logic:</strong>{" "}
                When object construction involves complex steps, environment
                lookups, or caching that shouldn{"'"}t pollute caller code.
              </>,
            ]}
          />

          <BulletList
            title="When to Avoid It:"
            list={[
              <>
                <strong className="text-(--text)">Simple Domain Objects:</strong>{" "}
                If you have a <Code code="User" /> or <Code code="Invoice" />{" "}
                data model whose constructor simply assigns properties, adding
                a factory method is pure over-engineering.
              </>,
              <>
                <strong className="text-(--text)">Stable Dependencies:</strong>{" "}
                If an algorithm will only ever use one concrete class and that
                class will never change, a direct constructor call is completely
                acceptable.
              </>,
            ]}
          />

          {/* Section 08: Advantages and Disadvantages */}
          <Pointer {...tableOfContent[7]} />
          <p className="small-title">Advantages</p>
          <Checklist
            list={[
              "Decouples creator classes from concrete product implementations.",
              "Upholds the Open/Closed Principle: you can introduce new products without breaking existing code.",
              "Enforces the Single Responsibility Principle: moves object creation to a dedicated location.",
              "Drastically simplifies automated unit testing by allowing easy injection of mock products.",
            ]}
          />

          <p className="small-title">Disadvantages</p>
          <Checklist
            list={[
              "Increases architectural complexity by introducing extra interfaces, abstract classes, and subclasses.",
              "Can lead to class explosion if every minor variation requires its own concrete creator subclass.",
              "Requires upfront planning: retrofitting existing tightly coupled code into a factory hierarchy takes effort.",
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
