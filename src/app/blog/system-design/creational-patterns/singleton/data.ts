export const date = "12 Nov 2026";

export const tableOfContent = [
  {
    num: "01",
    id: "what-is-the-singleton-pattern",
    label: "What is the Singleton Pattern?",
  },
  {
    num: "02",
    id: "why-and-when-to-use-it",
    label: "Why and When to Use It",
  },
  {
    num: "03",
    id: "idiomatic-typescript-implementation",
    label: "Idiomatic TypeScript Implementation",
  },
  {
    num: "04",
    id: "real-world-examples",
    label: "Real-World Examples in Production",
  },
  {
    num: "05",
    id: "the-javascript-twist-modules-as-singletons",
    label: "The JavaScript Twist: ES Modules",
  },
  {
    num: "06",
    id: "the-dark-side-anti-pattern-warnings",
    label: "The Dark Side: Why Developers Hate It",
  },
  {
    num: "07",
    id: "how-to-do-it-better-dependency-injection",
    label: "Refactoring: Singleton via DI",
  },
  {
    num: "08",
    id: "advantages-and-disadvantages",
    label: "Advantages and Disadvantages",
  },
];

export const calloutSingleton = [
  {
    k: "THE HIGHLANDER RULE",
    d: "There can only be one. The Singleton guarantees a class has exactly one instance throughout the entire application lifecycle and offers a global access point to it.",
    bad: false,
    title: "RULE",
  },
];

export const calloutAntiPattern = [
  {
    k: "GLOBAL STATE IN DISGUISE",
    d: "When abused, singletons turn into glorified global variables that hide architectural dependencies, tightly couple modules, and cause state leakage across automated unit tests.",
    bad: true,
    title: "ALERT",
  },
];

export const breadcrumbs = [
  { link: "/blog/system-design", text: "System Design" },
  { link: "/blog/system-design/creational-patterns", text: "Creational Patterns" },
  { link: "", text: "Singleton Pattern" },
];

export const classicSingletonCode = `class DatabaseConnectionPool {
  private static instance: DatabaseConnectionPool | null = null;
  private readonly poolId: string;
  private activeConnections = 0;

  private constructor() {
    this.poolId = Math.random().toString(36).substring(2, 9);
    console.log(\`[DB Pool] Initialized connection pool #\${this.poolId}\`);
  }

  public static getInstance(): DatabaseConnectionPool {
    if (!DatabaseConnectionPool.instance) {
      DatabaseConnectionPool.instance = new DatabaseConnectionPool();
    }
    return DatabaseConnectionPool.instance;
  }

  public query(sql: string): { status: string; poolId: string } {
    this.activeConnections++;
    return { status: "OK", poolId: this.poolId };
  }
}

const db1 = DatabaseConnectionPool.getInstance();
const db2 = DatabaseConnectionPool.getInstance();

console.log(db1 === db2);`;

export const configManagerCode = `interface AppConfig {
  readonly port: number;
  readonly environment: "development" | "staging" | "production";
  readonly databaseUrl: string;
  readonly jwtSecret: string;
  readonly featureFlags: Record<string, boolean>;
}

export class ConfigurationManager {
  private static instance: ConfigurationManager | null = null;
  private readonly config: Readonly<AppConfig>;

  private constructor() {
    this.config = Object.freeze({
      port: Number(process.env.PORT) || 3000,
      environment: (process.env.NODE_ENV as AppConfig["environment"]) || "development",
      databaseUrl: process.env.DATABASE_URL || "postgres://localhost:5432/production_app",
      jwtSecret: process.env.JWT_SECRET || "super-secure-secret-token",
      featureFlags: {
        newCheckoutFlow: process.env.FEATURE_NEW_CHECKOUT === "true",
        aiAssistant: process.env.FEATURE_AI_ASSISTANT === "true",
      },
    });
  }

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }
}

const config = ConfigurationManager.getInstance();
const port = config.get("port");
const isAiEnabled = config.get("featureFlags").aiAssistant;`;

export const loggerCode = `export class TelemetryLogger {
  private static instance: TelemetryLogger | null = null;
  private logsQueue: Array<{ timestamp: string; level: string; msg: string }> = [];
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.flushTimer = setInterval(() => this.flush(), 5000);
  }

  public static getInstance(): TelemetryLogger {
    if (!TelemetryLogger.instance) {
      TelemetryLogger.instance = new TelemetryLogger();
    }
    return TelemetryLogger.instance;
  }

  public log(level: "INFO" | "WARN" | "ERROR", msg: string): void {
    this.logsQueue.push({
      timestamp: new Date().toISOString(),
      level,
      msg,
    });
  }

  private flush(): void {
    if (this.logsQueue.length === 0) return;
    const batch = [...this.logsQueue];
    this.logsQueue = [];
    console.log(\`[Telemetry] Flushed \${batch.length} log events to aggregator\`);
  }
}`;

export const esModuleCode = `interface AppSettings {
  apiUrl: string;
  retries: number;
}

class SettingsService {
  public settings: AppSettings = {
    apiUrl: "https://api.domain.com",
    retries: 3,
  };
}

export const settings = new SettingsService();`;

export const diContainerCode = `import { singleton, container } from "tsyringe";

export interface ICacheManager {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

@singleton()
export class RedisCacheManager implements ICacheManager {
  private cache = new Map<string, string>();

  public async get(key: string): Promise<string | null> {
    return this.cache.get(key) ?? null;
  }

  public async set(key: string, value: string): Promise<void> {
    this.cache.set(key, value);
  }
}

const cache1 = container.resolve(RedisCacheManager);
const cache2 = container.resolve(RedisCacheManager);
console.log(cache1 === cache2);`;

