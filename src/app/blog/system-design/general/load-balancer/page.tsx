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
  calloutActivePassive,
  calloutL4,
  calloutL7,
  date,
  nginxConfig,
  popularSolutions,
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

export default function LoadBalancerPage() {
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
              text="System Design"
              timeToRead="13 MINS"
            />
            <ArticleTitle title="Load Balancer" />
            <ArticleDescription
              content="A single server is a hero until real-world traffic arrives. Learn how load balancers orchestrate incoming requests across server fleets so your users never see a dreaded 502 Bad Gateway."
            />
            <Author date={date} />
          </div>
          <ArticleAside
            tableOfContent={tableOfContent}
            tags={["System Design", "Networking", "Architecture"]}
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
              In a distributed system, a Load Balancer acts as an intelligent
              traffic controller sitting between incoming client requests and
              your backend infrastructure. When thousands of users visit your
              application simultaneously, the load balancer accepts those
              connections and evenly distributes the workload across multiple
              healthy backend servers.
            </p>
            <p className="main-content">
              Modern applications can rarely survive on a single server. A
              single machine has rigid physical constraints: CPU cores, memory
              limits, network card bandwidth, and open socket limits. More
              critically, relying on one machine introduces a single point of
              failure. If that server crashes, undergoes maintenance, or runs
              out of memory, your entire application goes dark.
            </p>
            <p className="main-content">
              Load balancing is the cornerstone of horizontal scaling and high
              availability. It enables a system to seamlessly add or remove
              computing nodes on demand while presenting a single, unified entry
              point to the outside world.
            </p>

            {/* Architecture Overview Diagram */}
            <div className="mt-12 rounded-xl border bg-(--bg-2) p-6 border-(--border)">
              <div className="text-[11px] font-mono tracking-[0.1em] text-(--text-3) uppercase">
                Architecture Blueprint • Client to Server Pool
              </div>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Clients */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <span className="rounded-md border bg-(--bg) px-3 py-1.5 font-mono text-[11px] text-(--text-2) border-(--border)">
                      Mobile App
                    </span>
                    <span className="rounded-md border bg-(--bg) px-3 py-1.5 font-mono text-[11px] text-(--text-2) border-(--border)">
                      Web Browser
                    </span>
                  </div>
                  <span className="text-[12px] font-medium text-(--text-3)">
                    Incoming Traffic
                  </span>
                </div>

                {/* Arrow */}
                <div className="text-(--text-3) font-mono text-[14px]">
                  ───►
                </div>

                {/* Load Balancer Box */}
                <div className="w-full md:w-56 rounded-lg border-2 border-(--text) bg-(--bg) p-3 text-center shadow-xs">
                  <div className="text-[10px] font-mono tracking-[0.1em] text-(--text-3)">
                    REVERSE PROXY
                  </div>
                  <div className="text-[14px] font-semibold text-(--text) mt-0.5">
                    Load Balancer
                  </div>
                  <div className="mt-2 flex justify-center gap-1.5">
                    <span className="inline-flex items-center rounded bg-(--bg-2) px-1.5 py-0.5 text-[9px] font-mono text-(--text-2)">
                      Health Checks
                    </span>
                    <span className="inline-flex items-center rounded bg-(--bg-2) px-1.5 py-0.5 text-[9px] font-mono text-(--text-2)">
                      TLS Offload
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-(--text-3) font-mono text-[14px]">
                  ───►
                </div>

                {/* Backend Pool */}
                <div className="flex flex-col gap-2 w-full md:w-44">
                  <div className="flex items-center justify-between rounded-md border bg-(--bg) px-3 py-1.5 border-(--border)">
                    <span className="font-mono text-[11px] text-(--text)">
                      Server 01
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-md border bg-(--bg) px-3 py-1.5 border-(--border)">
                    <span className="font-mono text-[11px] text-(--text)">
                      Server 02
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-md border bg-(--bg) px-3 py-1.5 border-(--border)">
                    <span className="font-mono text-[11px] text-(--text-3)">
                      Server 03
                    </span>
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t pt-3 border-(--border) text-center text-[11px] font-mono text-(--text-3)">
                Traffic is routed exclusively to healthy instances; failing
                nodes are bypassed automatically.
              </div>
            </div>
          </div>

          {/* Section 01: The Need for Load Balancing */}
          <Pointer {...tableOfContent[0]} />
          <p className="content mt-12!">
            Every software application starts simply: a client connects directly
            to a single server that runs the web service and queries the
            database. This architecture is cheap and straightforward to deploy.
            However, as user adoption grows, that solitary server begins to
            creak under the weight of concurrent TCP connections, memory
            allocation, and CPU context switches.
          </p>
          <p className="content">
            When scaling that infrastructure, you have two fundamental choices:
          </p>
          <BulletList
            title="Vertical Scaling vs Horizontal Scaling"
            list={[
              <>
                <strong className="text-(--text)">Vertical Scaling (Scale Up)</strong>{" "}
                — Upgrading your existing server with more CPU cores, faster
                NVMe storage, and additional RAM. While simple, it has strict
                physical ceilings and exhibits rapidly diminishing financial
                returns. Crucially, it does not solve downtime: when the box
                reboots, the service dies.
              </>,
              <>
                <strong className="text-(--text)">Horizontal Scaling (Scale Out)</strong>{" "}
                — Adding more standard machines in parallel. Instead of buying
                one gigantic, prohibitively expensive 128-core mainframe, you
                run sixteen 8-core commodity instances.
              </>,
            ]}
          />
          <p className="content">
            Horizontal scaling is the industry standard for resilient systems,
            but it introduces an immediate question:{" "}
            <strong>
              How do external clients know which of those sixteen servers to
              talk to?
            </strong>
          </p>
          <p className="content">
            You cannot expose sixteen separate public IP addresses to client
            applications. If clients were hardcoded to contact specific
            servers, an outage on one node would break the app for that slice of
            users, and scaling up would require a mobile app update.
          </p>
          <p className="content">
            A load balancer sits as a public reverse proxy in front of the server
            fleet. It advertises a single stable IP address (or DNS hostname) to
            clients, accepts all incoming traffic, and transparently routes each
            request to the best backend instance.
          </p>

          <Blockquote
            name="— Architectural Axiom"
            content="A load balancer abstracts a fluctuating fleet of physical servers into a single dependable endpoint, giving backends the freedom to fail, restart, and scale without client disruption."
          />

          {/* Section 02: Layer 4 vs Layer 7 Load Balancing */}
          <Pointer {...tableOfContent[1]} />
          <p className="content mt-12!">
            Load balancers are categorized primarily by the layer of the Open
            Systems Interconnection (OSI) network model at which they operate.
            The two dominant types are <strong>Layer 4 (Transport Layer)</strong>{" "}
            and <strong>Layer 7 (Application Layer)</strong> load balancers.
          </p>
          <p className="content">
            Understanding the distinction between these two layers is critical
            because it dictates routing flexibility, CPU consumption, and
            architectural latency.
          </p>

          <div className="mt-8">
            <Callout data={calloutL4} />
          </div>

          <p className="content">
            A Layer 4 load balancer operates strictly at the transport protocol
            level (TCP and UDP). It reads the source IP, destination IP, source
            port, and destination port from the packet header. It does{" "}
            <strong>not</strong> decrypt or inspect the packet payload.
          </p>
          <BulletList
            title="Key Characteristics of Layer 4 Balancing:"
            list={[
              <>
                <strong className="text-(--text)">Packet-Level Forwarding</strong>{" "}
                — Uses Network Address Translation (NAT) or Direct Server Return
                (DSR) to forward packets with negligible latency overhead.
              </>,
              <>
                <strong className="text-(--text)">Protocol Agnostic</strong> —
                Because it never parses application data, it can balance
                virtually any protocol: raw TCP streams, database connections
                (PostgreSQL, MySQL), SMTP, VoIP, and UDP gaming traffic.
              </>,
              <>
                <strong className="text-(--text)">TLS Passthrough</strong> —
                Encrypted SSL/TLS traffic passes straight through to backend
                nodes without being decrypted at the load balancer, preserving
                end-to-end zero-trust encryption.
              </>,
              <>
                <strong className="text-(--text)">Limited Intelligence</strong>{" "}
                — Because it cannot read HTTP headers, cookies, or URLs, it
                cannot perform path-based routing or cookie-based session
                affinity.
              </>,
            ]}
          />

          <div className="mt-10">
            <Callout data={calloutL7} />
          </div>

          <p className="content">
            A Layer 7 load balancer operates at the application layer. It
            terminates the incoming TCP connection, decrypts the TLS certificate
            (SSL termination), and inspects the HTTP/HTTPS request in full: the
            request method, URL path, query parameters, HTTP headers, cookies,
            and JSON payload.
          </p>
          <BulletList
            title="Key Capabilities of Layer 7 Balancing:"
            list={[
              <>
                <strong className="text-(--text)">Content-Based Routing</strong>{" "}
                — Route requests based on URL prefixes. For instance,{" "}
                <Code code="/api/v1/checkout/*" /> can be directed to the
                Checkout Service, while <Code code="/static/*" /> routes to
                an object storage cluster.
              </>,
              <>
                <strong className="text-(--text)">SSL/TLS Termination</strong> —
                Decrypts traffic once at the load balancer. Backend servers can
                communicate over lightweight plaintext HTTP within a private
                virtual network (VPC), saving backend CPU cycles.
              </>,
              <>
                <strong className="text-(--text)">Cookie & Sticky Sessions</strong>{" "}
                — Injects or reads session cookies to pin a client to a specific
                backend node when stateful compatibility is required.
              </>,
              <>
                <strong className="text-(--text)">DDoS & Header Inspection</strong>{" "}
                — Filters malicious query patterns, drops malformed HTTP
                headers, and applies rate limits before traffic touches
                application code.
              </>,
            ]}
          />

          <Note note="Rule of Thumb: Choose Layer 4 when raw throughput, ultra-low latency, or non-HTTP protocols (gaming, streaming, databases) are required. Choose Layer 7 when you need intelligent path routing, SSL termination, or microservice dispatching." />

          {/* Section 03: Load Balancing Algorithms */}
          <Pointer {...tableOfContent[2]} />
          <p className="content mt-12!">
            How does the load balancer choose which server receives the next
            request? The decision relies on load balancing algorithms. These
            algorithms are broadly grouped into <strong>static</strong> (stateless,
            no knowledge of current server utilization) and <strong>dynamic</strong>{" "}
            (stateful, considering real-time server load).
          </p>

          <p className="small-title">1. Round Robin</p>
          <p className="content">
            The simplest and most widely used algorithm. Requests are
            distributed sequentially in a circular order: Server 1, Server 2,
            Server 3, and back to Server 1.
          </p>
          <BulletList
            title="When Round Robin works (and when it fails):"
            list={[
              <>
                <strong className="text-(--text)">Best used when:</strong> All
                backend servers have identical hardware specifications, and
                incoming requests take approximately equal time to process.
              </>,
              <>
                <strong className="text-(--text)">The pitfall:</strong> In
                practice, some requests take 5ms (reading a cache) while others
                take 3 seconds (generating a complex PDF report). If Server 1
                happens to receive three heavy jobs in a row, it becomes bogged
                down while adjacent servers sit completely idle.
              </>,
            ]}
          />

          <p className="small-title">2. Weighted Round Robin</p>
          <p className="content">
            Each server is assigned an integer weight proportional to its
            processing capacity. A server with a weight of 3 receives three
            requests for every one request delivered to a server with a weight of
            1.
          </p>
          <p className="content">
            This is particularly useful when migrating between server
            generations (e.g., mixing legacy 4-core servers with newly
            provisioned 16-core instances in the same cluster).
          </p>

          <p className="small-title">3. Least Connections</p>
          <p className="content">
            A dynamic algorithm that tracks the active connection count on every
            backend server. When a new request arrives, it is dispatched to the
            server that currently has the fewest open connections.
          </p>
          <p className="content">
            This algorithm excels in workloads where requests have wildly
            different durations, such as WebSockets, server-sent events, file
            uploads, or long-running database queries.
          </p>

          <p className="small-title">4. Weighted Least Connections</p>
          <p className="content">
            Combines connection counting with capacity weighting. The load
            balancer computes active connections relative to assigned weight,
            ensuring powerful servers absorb more concurrent long-lived streams
            before smaller servers are tapped.
          </p>

          <p className="small-title">5. IP Hash</p>
          <p className="content">
            Computes a cryptographic or mathematical hash of the client{"'"}s IP
            address, modulo the number of servers:
          </p>
          <div className="my-4 rounded-lg border bg-(--bg-2) p-3 font-mono text-[13px] text-(--text) border-(--border)">
            Target Server = Hash(Client_IP) % Number_Of_Servers
          </div>
          <p className="content">
            This guarantees that a given client always reaches the same backend
            node, preserving in-memory sessions or local caches. However, it
            suffers from two major vulnerabilities:
          </p>
          <Checklist
            list={[
              "NAT Gateway Skew: Thousands of enterprise users behind a single corporate proxy or NAT gateway share one public IP, sending all their traffic to a single overwhelmed server.",
              "Cluster Reshuffling: Adding or removing a single server alters the modulo divisor, immediately invalidating almost 100% of existing client-server assignments.",
            ]}
          />

          <p className="small-title">6. Consistent Hashing</p>
          <p className="content">
            To prevent the catastrophic cache wipeout caused by naive modulo
            hashing, distributed systems rely on <strong>Consistent Hashing</strong>.
          </p>
          <p className="content">
            Instead of modulo arithmetic, server identifiers and request keys are
            mapped to points on an abstract 360-degree circular ring (from 0 to{" "}
            <Code code="2^32 - 1" />). A request is routed by hashing its key
            and walking clockwise around the ring until it hits the first server.
          </p>
          <p className="content">
            When a new server is added or an old server dies, only{" "}
            <Code code="K / N" /> keys need to be remapped (where <Code code="K" />{" "}
            is total keys and <Code code="N" /> is the server count). The
            remaining servers retain their cached assignments without disruption.
          </p>

          {/* Section 04: Health Checks & Resilience */}
          <Pointer {...tableOfContent[3]} />
          <p className="content mt-12!">
            A load balancer is only as reliable as its awareness of backend
            health. If a server experiences a kernel panic or runs out of disk
            space, routing requests to it results in 502 Bad Gateway responses.
          </p>
          <p className="content">
            Load balancers maintain cluster stability through two complementary
            health checking mechanisms:
          </p>

          <BulletList
            title="Active vs Passive Health Probing"
            list={[
              <>
                <strong className="text-(--text)">Active Health Checks (Probing)</strong>{" "}
                — The load balancer periodically sends synthetic heartbeat
                requests (such as an HTTP <Code code="GET /healthz" /> or a TCP
                handshake) to each server at a defined interval (e.g., every 5
                seconds). If a server returns HTTP 200 OK within the timeout
                window, it is marked healthy.
              </>,
              <>
                <strong className="text-(--text)">Passive Health Checks (Inline Monitoring)</strong>{" "}
                — The load balancer observes actual client traffic. If a backend
                node returns three consecutive 5xx errors or drops three TCP
                connections during normal user requests, the balancer
                immediately flags the node as unhealthy without waiting for the
                next scheduled heartbeat probe.
              </>,
            ]}
          />

          <p className="content">
            Typical production health checks are governed by four critical
            parameters:
          </p>
          <NumberedList
            heading="Essential Health Check Configuration Knobs:"
            list={[
              <>
                <strong className="text-(--text)">Interval:</strong> The duration
                between successive health probes (e.g., 5 seconds).
              </>,
              <>
                <strong className="text-(--text)">Timeout:</strong> Maximum wait
                time for a probe response before classifying it as a failure
                (e.g., 2 seconds).
              </>,
              <>
                <strong className="text-(--text)">Unhealthy Threshold:</strong>{" "}
                Number of consecutive failed probes required before removing the
                node from active rotation (e.g., 3 failures).
              </>,
              <>
                <strong className="text-(--text)">Healthy Threshold:</strong>{" "}
                Number of consecutive successful responses required before
                re-introducing a recovered node into the pool (e.g., 2 successes).
              </>,
            ]}
          />

          <p className="small-title">Connection Draining (Deregistration Delay)</p>
          <p className="content">
            When rolling out a new software version or auto-scaling down, you
            must never terminate an active server abruptly. Doing so severs
            in-flight database transactions and corrupts active uploads.
          </p>
          <p className="content">
            Instead, the load balancer initiates <strong>Connection Draining</strong>.
            The server enters a draining state: the load balancer ceases
            sending <em>new</em> connections to it, but keeps existing open
            connections alive for a grace period (e.g., 30 to 60 seconds) so
            current requests can finish cleanly before the server shuts down.
          </p>

          {/* Section 05: Eliminating Single Point of Failure */}
          <Pointer {...tableOfContent[4]} />
          <p className="content mt-12!">
            Placing a load balancer in front of your backend fleet removes your
            servers as a single point of failure. However, it creates a glaring
            architectural paradox:{" "}
            <strong>
              Didn{"'"}t you just make the load balancer itself the single point of
              failure?
            </strong>
          </p>
          <p className="content">
            If your single load balancer hardware fails, or its operating system
            crashes, your entire platform is unreachable, regardless of how many
            healthy backend application servers you have waiting.
          </p>
          <p className="content">
            To achieve true high availability (HA), the load balancer tier itself
            must be deployed with redundancy.
          </p>

          <div className="mt-8">
            <Callout data={calloutActivePassive} />
          </div>

          <BulletList
            title="Standard Techniques for Load Balancer High Availability:"
            list={[
              <>
                <strong className="text-(--text)">Active-Passive Pairing with VRRP</strong>{" "}
                — Two load balancers share a single <strong>Floating Virtual IP (VIP)</strong>.
                The primary node answers traffic, while the secondary node
                listens for heartbeats over the Virtual Router Redundancy
                Protocol (VRRP via Keepalived). If the primary stops beating for
                3 seconds, the passive node takes over the VIP using a gratuitous
                ARP broadcast. Clients continue connecting to the exact same IP.
              </>,
              <>
                <strong className="text-(--text)">Active-Active with BGP Anycast</strong>{" "}
                — Both load balancers announce identical IP addresses to upstream
                network routers using Border Gateway Protocol (BGP). Routers use
                Equal-Cost Multi-Path (ECMP) routing to split packets across both
                balancers concurrently, achieving double the throughput and
                instant failover.
              </>,
              <>
                <strong className="text-(--text)">DNS Load Balancing (Geo-DNS)</strong>{" "}
                — Authoritative DNS servers (like AWS Route 53 or Cloudflare)
                resolve domain names to different regional load balancer IPs
                based on the user{"'"}s geographic coordinates or latency probes.
              </>,
            ]}
          />

          {/* Section 06: Load Balancer vs Reverse Proxy vs API Gateway */}
          <Pointer {...tableOfContent[5]} />
          <p className="content mt-12!">
            In discussions of modern backend architecture, the terms{" "}
            <strong>Reverse Proxy</strong>, <strong>Load Balancer</strong>, and{" "}
            <strong>API Gateway</strong> are frequently used interchangeably.
            While their underlying technologies overlap (tools like NGINX and
            Envoy can act as all three), they serve distinct architectural
            purposes.
          </p>

          <BulletList
            title="Differentiating the Three Layers:"
            list={[
              <>
                <strong className="text-(--text)">Reverse Proxy</strong> — The
                broadest umbrella category. Any intermediary server that sits in
                front of web servers, intercepts incoming requests, and fetches
                resources on the client{"'"}s behalf. Its primary goals are
                caching static assets, SSL termination, and concealing backend IP
                addresses.
              </>,
              <>
                <strong className="text-(--text)">Load Balancer</strong> — A
                specialized reverse proxy whose primary focus is{" "}
                <em>traffic distribution across identical or heterogeneous worker nodes</em>.
                It emphasizes health checks, algorithm balancing, connection
                pooling, and high availability.
              </>,
              <>
                <strong className="text-(--text)">API Gateway</strong> — A
                feature-rich application-level gatekeeper designed for
                microservices. In addition to load balancing and reverse
                proxying, an API Gateway handles business concerns: user
                authentication (JWT validation), rate limiting per API key,
                request payload transformation, response aggregation, and
                analytics tracking.
              </>,
            ]}
          />

          <Note note="Summary: Every Load Balancer is a Reverse Proxy, but not every Reverse Proxy balances load. An API Gateway is an advanced Layer 7 reverse proxy tailored with microservice governance rules." />

          {/* Section 07: Popular Solutions & Implementation */}
          <Pointer {...tableOfContent[6]} />
          <NumberedList
            heading="Industry-Standard Load Balancing Solutions:"
            list={popularSolutions.map((solution, i) => {
              const [name, desc] = solution.split(" - ");
              return (
                <span key={i}>
                  <strong className="text-(--text)">{name}</strong> — {desc}
                </span>
              );
            })}
          />

          <p className="content">
            Below is a real-world, production-ready NGINX configuration snippet
            demonstrating a Layer 7 load balancer setup with the{" "}
            <Code code="least_conn" /> algorithm, server weighting, keepalive
            connection pooling, and SSL termination:
          </p>

          <CodeBlock
            filename="nginx.conf"
            code={nginxConfig}
            langLabel="NGINX"
            highlight={[4, 7, 8, 9, 12, 15, 33]}
          />

          {/* Section 08: Advantages and Disadvantages */}
          <Pointer {...tableOfContent[7]} />
          <p className="small-title">Advantages</p>
          <Checklist
            list={[
              "Seamless horizontal scaling without changing client configuration.",
              "Continuous high availability by evicting failing nodes instantly.",
              "Enables zero-downtime rolling deployments, Blue-Green, and Canary releases.",
              "Offloads compute-heavy SSL/TLS cryptographic handshakes from application servers.",
              "Shields backend server topologies and private IP addresses from public reconnaissance.",
              "Provides centralized traffic management, compression, and DDoS attack mitigation.",
            ]}
          />

          <p className="small-title">Disadvantages</p>
          <Checklist
            list={[
              "Introduces an extra network hop, adding slight latency (typically 1 to 5ms).",
              "Increases architectural complexity and operational monitoring overhead.",
              "Can become a single point of failure if redundant HA pairing (VIP/VRRP) is not configured.",
              "Stateful applications require sticky sessions, which can lead to uneven traffic distribution.",
              "Managed cloud load balancers introduce recurring operational costs per gigabyte transferred.",
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
