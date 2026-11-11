export const date = "07 Nov 2026";

export const tableOfContent = [
  {
    num: "01",
    id: "an-introduction-to-cap",
    label: "An Introduction to CAP",
  },
  {
    num: "02",
    id: "consistency",
    label: "Consistency ( C )",
  },
  {
    num: "03",
    id: "availability",
    label: "Availability ( A )",
  },
  {
    num: "04",
    id: "partition-tolerance",
    label: "Partition Tolerance ( P )",
  },
  {
    num: "05",
    id: "network-failure",
    label: "Network Failure",
  },
  {
    num: "06",
    id: "understanding-the-cap-trade-off",
    label: "Understanding the CAP trade-off",
  },
  {
    num: "07",
    id: "real-world-examples",
    label: "Real-world examples",
  },
];

export const calloutCP = [
  {
    k: "CONSISTENCY + PARTITION TOLERANCE",
    d: "Prioritizes correctness over uptime. Blocks or errors on the affected side until consistency can be guaranteed.",
    bad: false,
    title: "CP",
  },
];

export const calloutAP = [
  {
    k: "AVAILABILITY + PARTITION TOLERANCE",
    d: "Prioritizes uptime over correctness. Always responds, even with stale data, and reconciles after the partition heals.",
    bad: false,
    title: "CA",
  },
];

export const realLifeExamples = [
  "MongoDB	- CP-oriented",
  "Apache Cassandra	- AP-oriented",
  "Amazon DynamoDB	- Configurable consistency and availability trade-offs",
  "PostgreSQL (single-node)	- CAP classification generally not applicable",
];

export const breadcrumbs = [
  { link: "/blog/system-design", text: "System Design" },
  { link: "/blog/system-design/database", text: "Database" },
  { link: "", text: "CAP Theorem" },
];
