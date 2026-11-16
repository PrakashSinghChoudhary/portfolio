export const date = "13 Nov 2026";

export const tableOfContent = [
  {
    num: "01",
    id: "what-is-encapsulation",
    label: "What is Encapsulation?",
  },
  {
    num: "02",
    id: "data-hiding-vs-encapsulation",
    label: "Data Hiding vs. Encapsulation",
  },
  {
    num: "03",
    id: "invariants-protecting-domain-integrity",
    label: "Invariants: Protecting Domain Integrity",
  },
  {
    num: "04",
    id: "access-control-in-typescript",
    label: "Access Control in TypeScript: Compile vs. Runtime",
  },
  {
    num: "05",
    id: "getters-setters-and-the-tell-dont-ask-principle",
    label: "Getters, Setters & 'Tell, Don't Ask'",
  },
  {
    num: "06",
    id: "real-world-example-order-lifecycle",
    label: "Real-World Architecture: State Machine",
  },
  {
    num: "07",
    id: "leaky-encapsulation-and-defensive-copying",
    label: "Leaky Encapsulation & Defensive Copying",
  },
  {
    num: "08",
    id: "advantages-and-trade-offs",
    label: "Advantages and Trade-Offs",
  },
];

export const calloutEncapsulation = [
  {
    k: "THE BOUNDARY OF CONTROL",
    d: "Encapsulation is not merely hiding variables; it is the active enforcement of domain invariants. An object must guarantee that its internal state remains valid across every transition in its lifecycle.",
    bad: false,
    title: "PRINCIPLE",
  },
];

export const calloutLeakyAbstraction = [
  {
    k: "THE LEAKY GETTER TRAP",
    d: "Returning raw references to internal mutable collections destroys encapsulation. Outside callers can bypass validation and mutate internal state unless defensive copies or readonly wrappers are returned.",
    bad: true,
    title: "VULNERABILITY",
  },
];

export const breadcrumbs = [
  { link: "/blog/system-design", text: "System Design" },
  { link: "/blog/system-design/object-oriented-programming", text: "Object Oriented Programming" },
  { link: "", text: "Encapsulation" },
];

export const rateLimiterCode = `export class TokenBucketRateLimiter {
  private readonly capacity: number;
  private readonly refillRatePerSecond: number;
  private tokens: number;
  private lastRefillTimestamp: number;

  constructor(capacity: number, refillRatePerSecond: number) {
    if (capacity <= 0 || refillRatePerSecond <= 0) {
      throw new Error("Capacity and refill rate must be positive numbers");
    }
    this.capacity = capacity;
    this.refillRatePerSecond = refillRatePerSecond;
    this.tokens = capacity;
    this.lastRefillTimestamp = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsedTimeSeconds = (now - this.lastRefillTimestamp) / 1000;
    const tokensToAdd = elapsedTimeSeconds * this.refillRatePerSecond;
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefillTimestamp = now;
  }

  public consume(tokensRequested = 1): boolean {
    if (tokensRequested <= 0) {
      throw new Error("Requested tokens must be greater than zero");
    }
    this.refill();
    if (this.tokens >= tokensRequested) {
      this.tokens -= tokensRequested;
      return true;
    }
    return false;
  }

  public get currentCapacity(): number {
    return this.capacity;
  }

  public get availableTokens(): number {
    this.refill();
    return Math.floor(this.tokens);
  }
}`;

export const accessModifiersCode = `export class SecureVault {
  private compileTimeToken: string;
  #runtimePrivateToken: string;
  protected securityClearanceLevel: number;

  constructor(token: string, clearanceLevel: number) {
    if (!token || token.length < 8) {
      throw new Error("Token must be at least 8 characters long");
    }
    this.compileTimeToken = token;
    this.#runtimePrivateToken = token;
    this.securityClearanceLevel = clearanceLevel;
  }

  public verify(attempt: string): boolean {
    return this.#runtimePrivateToken === attempt;
  }
}

export class EnterpriseVault extends SecureVault {
  public canAccessLevel(requiredLevel: number): boolean {
    return this.securityClearanceLevel >= requiredLevel;
  }
}

const vault = new SecureVault("alpha-secure-credential-902", 3);
const bypassedCompileTime = (vault as unknown as { compileTimeToken: string }).compileTimeToken;
console.log(bypassedCompileTime);`;

export const tellDontAskCode = `export class WalletAccount {
  private balance: number;
  private readonly currency: string;

  constructor(initialBalance: number, currency = "USD") {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
    this.balance = initialBalance;
    this.currency = currency;
  }

  public debit(amount: number): boolean {
    if (amount <= 0) {
      throw new Error("Debit amount must be strictly positive");
    }
    if (this.balance < amount) {
      return false;
    }
    this.balance -= amount;
    return true;
  }

  public credit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Credit amount must be strictly positive");
    }
    this.balance += amount;
  }

  public get currentBalance(): number {
    return this.balance;
  }

  public get accountCurrency(): string {
    return this.currency;
  }
}`;

export const orderLifecycleCode = `export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  readonly sku: string;
  readonly unitPrice: number;
  readonly quantity: number;
}

export class Order {
  private readonly id: string;
  private status: OrderStatus = "PENDING";
  private readonly items: OrderItem[] = [];

  constructor(id: string) {
    if (!id) {
      throw new Error("Order ID must be specified");
    }
    this.id = id;
  }

  public addItem(item: OrderItem): void {
    if (this.status !== "PENDING") {
      throw new Error("Cannot modify items after payment processing has begun");
    }
    if (item.quantity <= 0 || item.unitPrice <= 0) {
      throw new Error("Item quantity and price must be strictly positive");
    }
    this.items.push({ ...item });
  }

  public markPaid(): void {
    if (this.status !== "PENDING") {
      throw new Error("Only pending orders can be marked as paid");
    }
    if (this.items.length === 0) {
      throw new Error("Cannot pay for an order with zero items");
    }
    this.status = "PAID";
  }

  public markShipped(): void {
    if (this.status !== "PAID") {
      throw new Error("Order must be paid before shipment");
    }
    this.status = "SHIPPED";
  }

  public cancel(): void {
    if (this.status === "SHIPPED" || this.status === "DELIVERED") {
      throw new Error("Orders already in transit or delivered cannot be cancelled");
    }
    this.status = "CANCELLED";
  }

  public get orderId(): string {
    return this.id;
  }

  public get currentStatus(): OrderStatus {
    return this.status;
  }

  public get orderItems(): readonly OrderItem[] {
    return [...this.items];
  }

  public get totalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }
}`;

export const defensiveCopyCode = `export class ConfigurationRegistry {
  private readonly features: Map<string, boolean>;

  constructor(initialFlags: Record<string, boolean>) {
    this.features = new Map(Object.entries(initialFlags));
  }

  public isEnabled(flagName: string): boolean {
    return this.features.get(flagName) ?? false;
  }

  public getSnapshot(): ReadonlyMap<string, boolean> {
    return new Map(this.features);
  }
}`;

