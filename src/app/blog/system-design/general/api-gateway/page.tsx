"use client";
import ArticleAside from "@/components/ArticleAside";
import ArticleDescription from "@/components/ArticleDescription";
import ArticleTitle from "@/components/ArticleTitle";
import Aside from "@/components/Aside";
import Author from "@/components/Author";
import BulletList from "@/components/BulletList";
import Pointer from "@/components/Pointer";
import { useEffect, useState, useRef } from "react";
import { breadcrumbs, date, tableOfContent } from "./data";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleMeta from "@/components/ArticleMeta";
import Checklist from "@/components/Checklist";
import NumberedList from "@/components/NumberedList";
import Image from "next/image";

export default function APIGatewayPage() {
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
              timeToRead="14 MINS"
            />
            <ArticleTitle title="API Gateway" />
            <ArticleDescription
              content="To confuse your enemy, you must first confuse yourself. Learn
                how to install an API Gateway in front of your backend
                infrastructure so that you and your enemy (a hacker, probably)
                can no longer see what's going on behind the scenes."
            />
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
            <p className="content">
              An API Gateway is a single entry point through which clients
              (frontend applications, mobile apps, etc.) communicate with
              multiple backend services.
            </p>
            <p className="content">
              The evolution of API Gateways parallels the rise of microservices
              architecture. As monolithic applications were broken down into
              smaller, specialized services, the need for a centralized point of
              control became evident. Without an API Gateway, clients would need
              to know about and communicate with multiple services directly.
            </p>
            <Image
              src="/images/api-gateway.jpg"
              alt="API Gateway"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 800px"
              className="image"
            />
          </div>
          <Pointer {...tableOfContent[0]} />
          <p className="content-dark mt-12!">
            The concept of API Gateways became increasingly popular in the early
            2010s, alongside the growing adoption of microservices architecture.
            As applications evolved, many organizations started moving away from
            traditional monolithic architectures, where the entire application
            was built and deployed as a single unit, towards microservices,
            where an application is divided into multiple small, independently
            deployable services.{" "}
          </p>
          <p className="content-dark">
            However, this architectural shift introduced a new challenge.
            Instead of communicating with a single backend application, the
            frontend now had to communicate with multiple independent services,
            each potentially having its own URL, authentication mechanism, and
            business logic. Managing these interactions directly from the client
            became increasingly complicated.{" "}
          </p>{" "}
          <p className="content-dark">
            This is where the API Gateway pattern became useful. An API Gateway
            acts as a single entry point between clients and backend services.
            Instead of communicating with multiple services directly, clients
            send their requests to the API Gateway, which determines which
            service should handle each request and forwards it accordingly.
          </p>
          <Pointer {...tableOfContent[1]} />
          <p className="content-dark mt-12!">
            In a microservices architecture, an API Gateway sits in front of
            multiple backend services, such as User Service, Product Service,
            Order Service, and Payment Service. When a client makes a request,
            the API Gateway routes it to the appropriate service based on the
            requested endpoint.
          </p>
          <p className="content-dark">
            Apart from routing, an API Gateway can also handle several common
            responsibilities, such as authentication, rate limiting, logging,
            caching, and request aggregation. This prevents every microservice
            from having to implement these common functionalities independently.
          </p>
          <p className="content-dark">
            For example, consider an e-commerce application where the frontend
            needs to retrieve user information, recent orders, and payment
            history. Without an API Gateway, the frontend might need to make
            separate requests to three different services. With an API Gateway,
            the frontend can make a single request, and the gateway can
            communicate with all three services, combine their responses, and
            return a single response to the client.
          </p>
          <p className="content-dark">
            This makes communication between clients and microservices simpler
            and provides a centralized place to manage common API-related
            concerns.
          </p>
          <Image
            src="/images/api-gateway-microservices.jpg"
            alt="API Gateway"
            width={1280}
            height={720}
            sizes="(max-width: 768px) 100vw, 800px"
            className="image"
          />
          <Pointer {...tableOfContent[2]} />
          <p className="content-dark mt-12!">
            Although API Gateways are commonly associated with microservices
            architecture, they are not exclusive to it. A monolithic application
            can also benefit from using an API Gateway.
          </p>
          <p className="content-dark">
            In a monolithic architecture, the entire backend application is
            typically deployed as a single unit. It might contain different
            modules, such as User Management, Products, Orders, and Payments,
            but all these modules belong to the same application and are usually
            exposed through a single backend server.
          </p>
          <p className="content-dark">
            Even in this architecture, an API Gateway can sit in front of the
            monolithic application and act as the entry point for incoming
            client requests. The gateway can handle responsibilities such as
            authentication, rate limiting, logging, caching, SSL termination,
            and routing before forwarding requests to the monolithic backend.
          </p>
          <p className="content-dark">
            For example, imagine a monolithic e-commerce application deployed on
            a single backend server. Instead of allowing clients to communicate
            directly with the backend, all requests can first pass through an
            API Gateway. The gateway can validate authentication tokens, apply
            rate limits, and then forward the requests to the appropriate
            endpoints in the monolithic application.
          </p>
          <p className="content-dark">
            Therefore, an API Gateway is an architectural pattern that can be
            used with both monolithic and microservices architectures. While it
            becomes particularly useful in microservices because of the need to
            manage communication between multiple independent services, it can
            also provide centralized API management, security, and traffic
            control for a monolithic application.
          </p>
          <Image
            src="/images/api-gateway-monolithic.jpg"
            alt="API Gateway"
            width={1280}
            height={720}
            sizes="(max-width: 768px) 100vw, 800px"
            className="image"
          />
          <Pointer {...tableOfContent[3]} />
          <BulletList
            title="The following are the most common responsibilities of an API Gateway"
            list={[
              <>
                <strong className="text-(--text)">Request Routing</strong> -
                Forwarding requests to appropriate backend services.
              </>,
              <>
                <strong className="text-(--text)">Authentication</strong> -
                Validating JWT tokens and other credentials.
              </>,
              <>
                <strong className="text-(--text)">Rate Limiting</strong> -
                Restricting the number of requests from a client.
              </>,
              <>
                <strong className="text-(--text)">Load Balancing</strong> -
                Distributing incoming requests across service instances (where
                supported).
              </>,

              <>
                <strong className="text-(--text)">Caching</strong> - Caching
                responses to reduce backend load.
              </>,
              <>
                <strong className="text-(--text)">Request Aggregation</strong> -
                Combining responses from multiple services.
              </>,
              <>
                <strong className="text-(--text)">SSL/TLS Termination</strong> -
                Handling HTTPS connections.
              </>,
              <>
                <strong className="text-(--text)">
                  Logging and Monitoring
                </strong>{" "}
                - Tracking incoming requests and errors.
              </>,
              <>
                <strong className="text-(--text)">
                  Request Transformation
                </strong>{" "}
                - Modifying request headers, paths, or payloads before
                forwarding them.
              </>,
            ]}
          />
          <Pointer {...tableOfContent[4]} />
          <NumberedList
            heading="Some commonly used solutions are - "
            list={[
              <>
                <strong className="text-(--text)">Kong</strong> - Open-source
                API Gateway with plugins for authentication, rate limiting, and
                other capabilities.
              </>,
              <>
                <strong className="text-(--text)">Amazon API Gateway</strong> -
                Managed service for creating, publishing, and managing APIs.
              </>,
              <>
                <strong className="text-(--text)">NGINX</strong> - Commonly used
                as a reverse proxy and can provide API gateway functionality.
              </>,
              <>
                <strong className="text-(--text)">Traefik</strong> -
                Cloud-native proxy with routing and middleware capabilities.
              </>,
            ]}
          />
          <Pointer {...tableOfContent[5]} />
          <p className="small-title">Advantages</p>
          <Checklist
            list={[
              "Single entry point for clients.",
              "Centralized authentication and security.",
              "Simplified client-side communication.",
              "Reduced duplication of common functionalities.",
              "Better control over incoming traffic.",
            ]}
          />
          <p className="small-title">Disadvantages</p>
          <Checklist
            list={[
              "Single point of failure if not deployed redundantly.",
              "Additional network latency.",
              "Potential bottleneck under heavy traffic.",
              "Increased infrastructure complexity.",
              "Can become a monolithic component itself if poorly designed.",
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
