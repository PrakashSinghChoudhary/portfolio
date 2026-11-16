export const date = "11 Nov 2026";

export const tableOfContent = [
  {
    num: "01",
    id: "the-need-for-load-balancing",
    label: "The Need for Load Balancing",
  },
  {
    num: "02",
    id: "layer-4-vs-layer-7",
    label: "Layer 4 vs Layer 7 Load Balancing",
  },
  {
    num: "03",
    id: "load-balancing-algorithms",
    label: "Load Balancing Algorithms",
  },
  {
    num: "04",
    id: "health-checks-and-resilience",
    label: "Health Checks & Traffic Draining",
  },
  {
    num: "05",
    id: "eliminating-single-points-of-failure",
    label: "Eliminating Single Point of Failure",
  },
  {
    num: "06",
    id: "load-balancer-vs-reverse-proxy-vs-api-gateway",
    label: "Load Balancer vs Reverse Proxy vs API Gateway",
  },
  {
    num: "07",
    id: "popular-solutions-and-implementation",
    label: "Popular Solutions & Implementation",
  },
  {
    num: "08",
    id: "advantages-and-disadvantages",
    label: "Advantages and Disadvantages",
  },
];

export const calloutL4 = [
  {
    k: "LAYER 4 • TRANSPORT LAYER (TCP / UDP)",
    d: "Routes traffic based purely on IP addresses and ports without inspecting application payload. Delivers ultra-low latency, blazing packet throughput, and seamless TLS passthrough.",
    bad: false,
    title: "L4",
  },
];

export const calloutL7 = [
  {
    k: "LAYER 7 • APPLICATION LAYER (HTTP / HTTPS / gRPC)",
    d: "Content-aware intelligent routing. Inspects URLs, request headers, cookies, and payloads to enable path-based microservice dispatching, SSL termination, and sticky sessions.",
    bad: false,
    title: "L7",
  },
];

export const calloutActivePassive = [
  {
    k: "ACTIVE-PASSIVE HIGH AVAILABILITY (VRRP / KEEP ALIVED)",
    d: "The primary load balancer handles 100% of traffic while the standby node continuously monitors heartbeats. If the primary drops out, the standby claims the Floating Virtual IP (VIP) in seconds.",
    bad: false,
    title: "HA",
  },
];

export const breadcrumbs = [
  { link: "/blog/system-design", text: "System Design" },
  { link: "/blog/system-design/general", text: "General" },
  { link: "", text: "Load Balancer" },
];

export const popularSolutions = [
  "NGINX - Industry standard high-performance reverse proxy and Layer 7 load balancer with event-driven architecture.",
  "HAProxy - Highly optimized, battle-tested Layer 4 and Layer 7 proxy renowned for extreme reliability and raw throughput.",
  "Envoy Proxy - Modern C++ distributed proxy built for microservices and cloud-native service meshes with rich telemetry.",
  "AWS ALB / NLB - Fully managed Application (L7) and Network (L4) load balancers with seamless auto-scaling.",
  "Traefik - Modern edge router and reverse proxy with automatic service discovery for Docker and Kubernetes.",
  "Cloudflare / Cloud DNS - Anycast edge network combining global DNS routing with DDoS protection and CDN caching.",
];

export const nginxConfig = `http {
  # Define the pool of backend application servers
  upstream backend_cluster {
    # Algorithm: Least Connections (routes to server with fewest active requests)
    least_conn;

    # Application server nodes with capacity weighting
    server app-server-1.internal:8080 weight=3 max_fails=3 fail_timeout=10s;
    server app-server-2.internal:8080 weight=2 max_fails=3 fail_timeout=10s;
    server app-server-3.internal:8080 weight=1 max_fails=3 fail_timeout=10s;

    # Standby backup instance (only used if all primary servers fail)
    server backup-server.internal:8080 backup;

    # Maintain pool of cached idle connections to reduce TCP handshake overhead
    keepalive 32;
  }

  server {
    listen 80;
    server_name api.example.com;

    # Enforce HTTPS redirect
    return 301 https://$host$request_uri;
  }

  server {
    listen 443 ssl http2;
    server_name api.example.com;

    # SSL Termination handled at the load balancer
    ssl_certificate /etc/ssl/certs/example.crt;
    ssl_certificate_key /etc/ssl/private/example.key;

    location / {
      proxy_pass http://backend_cluster;

      # Forward client metadata to backend services
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      # Enable HTTP/1.1 for connection reuse
      proxy_http_version 1.1;
      proxy_set_header Connection "";
    }
  }
}`;
