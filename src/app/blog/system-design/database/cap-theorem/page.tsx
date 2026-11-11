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
  calloutAP,
  calloutCP,
  date,
  realLifeExamples,
  tableOfContent,
} from "./data";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";
import Checklist from "@/components/Checklist";
import NumberedList from "@/components/NumberedList";
import Image from "next/image";
import Blockquote from "@/components/Blockquote";
import Code from "@/components/Code";
import Note from "@/components/Note";
import Callout from "@/components/Callout";

export default function CAPTheoremPage() {
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
            <ArticleMeta date={date} text="Database" timeToRead="09 MINS" />
            <ArticleTitle title="CAP Theorem" />
            <ArticleDescription content="When your databases can't talk to each other, someone has to compromise. CAP Theorem explains who gets sacrificed: consistency or availability." />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["System Design", "Backend"]}
          />
        </div>
      </section>

      <div className="grid grid-cols-12 gap-0">
        <main
          ref={contentRef}
          className="col-span-12 lg:col-span-8 lg:border-r lg:pr-10 pb-16 border-(--border)"
        >
          <div className="prose max-w-none pt-8">
            <p className="main-content">
              A distributed system is a network that stores data on more than
              one node (physical or virtual machines) at the same time. Because
              all cloud applications are distributed systems, it’s essential to
              understand the CAP theorem when designing a cloud app so that you
              can choose a data management system that delivers the
              characteristics your application needs most.
            </p>
            <p className="main-content">
              The CAP Theorem proposed by Eric Brewer in 2000, and proved by
              Gilbert and Lynch in 2002. It says: a distributed data system can
              only provide two out of these three guarantees at the same time.
            </p>
            <p className="main-content">
              It is a fundamental concept in distributed systems. It explains
              the trade-offs a distributed database must make when network
              failures occur.
            </p>
            <Image
              src="/images/cap-theorem-introduction.jpg"
              alt="CAP Theorem"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 800px"
              className="image"
            />
          </div>
          <Pointer {...tableOfContent[0]} />
          <p className="content mt-12!">CAP stands for</p>
          <Checklist
            list={[
              "C - Consistency",
              "A - Availability",
              "P - Partition Tolerance",
            ]}
          />
          <Blockquote
            name="- The CAP theorem"
            content="A distributed system cannot guarantee all three properties ( Consistency, Availability, and Partition Tolerance ) simultaneously when a network partition occurs. It must choose between Consistency and Availability."
          />
          <Pointer {...tableOfContent[1]} />
          <Image
            src="/images/cap-consistency.jpg"
            alt="CAP Consistency"
            width={1280}
            height={720}
            sizes="(max-width: 768px) 100vw, 800px"
            className="image"
          />
          <p className="content mt-12!">
            Consistency means that all clients see the same data at the same
            time, no matter which node they connect to. For this to happen,
            whenever data is written to one node, it must be instantly forwarded
            or replicated to all the other nodes in the system before the write
            is deemed "successful".
          </p>
          <BulletList
            title="Every read receives the most recent write or an error. There is no
            stale read."
            list={[
              <>
                In practice it means all nodes see the same data at the same
                time. It behaves like there is a single copy.
              </>,
              <>
                If a write succeeds on one node but hasn't replicated, other
                nodes must block or error, not return old data.
              </>,
              <>
                Strong consistency costs latency — you wait for replicas to
                agree.
              </>,
              <>
                Use it when you cannot afford conflicts: locks, leader election,
                inventory counts, financial ledgers.
              </>,
            ]}
          />
          <Pointer {...tableOfContent[2]} />
          <Image
            src="/images/cap-availability.jpg"
            alt="CAP Availability"
            width={1280}
            height={720}
            sizes="(max-width: 768px) 100vw, 800px"
            className="image"
          />
          <p className="content mt-12!">
            Availability means that any client making a request for data gets a
            response, even if one or more nodes are down. Another way to state
            this—all working nodes in the distributed system return a valid
            response for any request, without exception.
          </p>
          <BulletList
            title="Every non-failing node returns a response, even if it is not the latest."
            list={[
              <>
                The system stays up for reads and writes. No request ends with
                "try again later" because of a partition.
              </>,
              <>
                During a network split, nodes on both sides keep serving from
                their local state.
              </>,
              <>
                The trade-off is you might read stale data that will be
                reconciled later.
              </>,
              <>
                Use it when uptime matters more than immediate agreement:
                session data, shopping carts, social feeds, DNS.
              </>,
            ]}
          />
          <Pointer {...tableOfContent[3]} />
          <Image
            src="/images/cap-partition-tolerance.jpg"
            alt="CAP Partition Tolerance"
            width={1280}
            height={720}
            sizes="(max-width: 768px) 100vw, 800px"
            className="image"
          />
          <p className="content mt-12!">
            A partition is a communications break within a distributed system—a
            lost or temporarily delayed connection between two nodes. Partition
            tolerance means that the cluster must continue to work despite any
            number of communication breakdowns between nodes in the system.
          </p>
          <BulletList
            title="The system continues to operate despite network partitions."
            list={[
              <>
                A partition is when messages are lost or delayed between nodes —
                cable cut, switch failure, region isolation.
              </>,
              <>
                You don't get to choose P in the real world. Partitions will
                happen, so your system must handle them.
              </>,
              <>
                When a partition happens, you must choose: stay consistent and
                block (CP) or stay available and serve stale data (AP).
              </>,
              <>
                This is why CAP is really "on a partition, C or A?" - not "pick
                2 of 3 forever".
              </>,
            ]}
          />
          <Pointer {...tableOfContent[4]} />
          <p className="content">
            How does a network failure force us to choose between Consistency
            and Availability?
          </p>
          <p className="content">
            To understand this, let's first understand what a network partition
            actually means.
          </p>
          <p className="content">
            In a distributed system, we often have multiple servers or database
            replicas running in different geographical locations. These replicas
            communicate with each other over a network to exchange data and keep
            themselves synchronized.
          </p>
          <BulletList
            title="For example, imagine we have two database replicas:"
            list={[
              <>
                <strong>Database A:</strong> Located in Mumbai.
              </>,
              <>
                <strong>Database B:</strong> Located in Pune.
              </>,
            ]}
          />
          <p className="content">
            Both databases maintain a copy of the same user data. Whenever a
            user updates something in Database A, that update needs to be
            replicated to Database B so that both databases have the latest
            information. Now, imagine that a network failure occurs between
            these two databases. It could be anything: a network cable gets
            disconnected, a router stops working, a switch fails, or an entire
            availability zone becomes unreachable. As a result, Database A and
            Database B can no longer communicate with each other. This situation
            is called a <strong>Network Partition</strong>.
          </p>
          <p className="content">
            Why can't we simply choose Partition Tolerance?
          </p>
          <p className="content">
            Here's something important to understand: you don't really get to
            choose whether network partitions happen. In a distributed system,
            network failures are inevitable. Servers can crash, cables can get
            disconnected, network routes can fail, and entire data centers can
            become unreachable. You can build systems that reduce the likelihood
            of these failures, but you cannot guarantee that they will never
            happen. Therefore, a distributed system must be designed to tolerate
            network partitions. The real question isn't whether you want
            Partition Tolerance. The real question is:
          </p>
          <p className="content">
            When a network partition occurs, do you prioritize Consistency or
            Availability?
          </p>
          <Pointer {...tableOfContent[5]} />
          <p className="content">
            This is where CAP Theorem becomes interesting. Imagine you have two
            database replicas, A and B, and a network partition occurs between
            them.
          </p>

          <BulletList
            title="A user updates their account balance
            through Database A."
            list={[
              <>Database A updates the balance to ₹2,000.</>,
              <>Database B is disconnected and still has ₹1,000.</>,
              <>Another user sends a read request to Database B.</>,
            ]}
          />

          <p className="content">
            What should Database B do? It has two choices:
          </p>

          <p className="small-title">Option 1: Choose Consistency (CP)</p>
          <p className="main-content -mb-4.5!">
            Database B refuses to serve the read request because it cannot
            guarantee that its data is up to date.
          </p>
          <BulletList
            title=""
            list={[
              <>Consistency is maintained.</>,
              <>Availability is sacrificed for affected requests.</>,
              <>
                The system waits until communication is restored or consistency
                can otherwise be guaranteed.
              </>,
            ]}
          />

          <div className="mb-12">
            <Callout data={calloutCP} />
          </div>

          <p className="small-title">Option 2: Choose Availability (AP)</p>
          <p className="main-content">
            Database B responds to the read request using its existing data,
            even though it might be outdated.
          </p>
          <BulletList
            title=""
            list={[
              <>Availability is maintained.</>,
              <>Strong consistency is sacrificed.</>,
              <>The user might receive the old balance of ₹1,000.</>,
            ]}
          />

          <Callout data={calloutAP} />

          <div className="mt-14 border-t pt-6 border-(--border)"></div>

          <BulletList
            title="When the network is healthy, both Database A and Database B can talk. No trade-off
            with Availability. Both nodes are up. But you still have a choice on
            every write:"
            list={[
              <>
                <strong>Option C — Be consistent and slow:</strong> Client
                writes something to to Database A. Database A says "wait, let me
                make sure Database B also got it before I tell the client it's
                done." It does a round-trip to Pune, waits for an ack, then
                replies. Latency is higher, maybe 50ms instead of 5ms, but any
                subsequent read from Database B will see latest write.
              </>,
              <>
                <strong>Option L — Be fast and eventually consistent: </strong>
                Client writes to Database A. Database A writes locally and
                immediately tells the client "done". It replicates to Database B
                in the background. Latency is very low. But for the next few
                milliseconds, a read from Database B will still return stale
                data.
              </>,
            ]}
          />
          <BulletList
            title="So even with no failure, you are trading:"
            list={[
              <>
                <strong>Consistency:</strong>Wait for quorum / all replicas to
                confirm. Every read sees the latest write.
              </>,
              <>
                <strong>Latency: </strong>Ack fast from one replica. Reads may
                be stale for a short window.
              </>,
            ]}
          />
          <Note note="When there is no network partition, the trade off is not about availability anymore. It becomes a trade off between consistency and latency." />

          <Pointer {...tableOfContent[6]} />

          <Checklist list={realLifeExamples} />
          <p className="content">
            These are simplified classifications. Actual behavior depends on
            configuration, replication, read/write consistency levels, and
            failure scenarios.
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
