export const date = "12 Nov 2026";

export const tableOfContent = [
  {
    num: "01",
    id: "from-procedures-to-objects",
    label: "From Procedures to Objects",
  },
  {
    num: "02",
    id: "the-four-pillars-of-oop",
    label: "The Four Pillars of OOP",
  },
  {
    num: "03",
    id: "encapsulation-guarding-the-state",
    label: "Encapsulation: Protecting State",
  },
  {
    num: "04",
    id: "abstraction-managing-complexity",
    label: "Abstraction: Hiding Complexity",
  },
  {
    num: "05",
    id: "inheritance-and-composition",
    label: "Inheritance vs Composition",
  },
  {
    num: "06",
    id: "polymorphism-many-forms",
    label: "Polymorphism: Many Forms",
  },
  {
    num: "07",
    id: "concepts-of-object-oriented-programming",
    label: "Concepts of Object-Oriented Programming",
  },
  {
    num: "08",
    id: "oop-in-modern-typescript",
    label: "OOP in Modern TypeScript",
  },
  {
    num: "09",
    id: "advantages-and-disadvantages",
    label: "Advantages and Disadvantages",
  },
];

export const calloutFourPillars = [
  {
    k: "THE CORE FOUR PILLARS",
    d: "Encapsulation bundles data and behavior. Abstraction hides complexity behind interfaces. Inheritance shares and extends capabilities. Polymorphism enables uniform handling of disparate types.",
    bad: false,
    title: "OOP",
  },
];

export const calloutComposition = [
  {
    k: "COMPOSITION OVER INHERITANCE",
    d: "Inheritance creates rigid compile-time coupling where subclasses inherit every quirk of parent classes. Composition builds flexible runtime relationships by combining smaller, focused components.",
    bad: false,
    title: "RULE",
  },
];

export const breadcrumbs = [
  { link: "/blog/system-design", text: "System Design" },
  { link: "/blog/system-design/object-oriented-programming", text: "Object Oriented Programming" },
  { link: "", text: "Introduction to Object Oriented Programming" },
];

export const encapsulationCode = `export class BankAccount {
  private balance: number;
  private readonly accountNumber: string;
  private readonly ownerName: string;

  constructor(accountNumber: string, ownerName: string, initialDeposit: number) {
    if (initialDeposit < 0) {
      throw new Error("Initial deposit cannot be negative");
    }
    this.accountNumber = accountNumber;
    this.ownerName = ownerName;
    this.balance = initialDeposit;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be strictly positive");
    }
    this.balance += amount;
  }

  public withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance) {
      return false;
    }
    this.balance -= amount;
    return true;
  }

  public get currentBalance(): number {
    return this.balance;
  }

  public get accountDetails(): { number: string; owner: string } {
    return {
      number: this.accountNumber,
      owner: this.ownerName,
    };
  }
}

const account = new BankAccount("ACC-9042", "Prakash Choudhary", 1000);
account.deposit(500);
account.withdraw(200);
console.log(account.currentBalance);`;

export const abstractionCode = `export abstract class CloudStorageProvider {
  protected bucketName: string;
  protected region: string;

  constructor(bucketName: string, region: string) {
    this.bucketName = bucketName;
    this.region = region;
  }

  public abstract uploadFile(path: string, content: Buffer): Promise<string>;
  public abstract downloadFile(path: string): Promise<Buffer>;
  public abstract deleteFile(path: string): Promise<boolean>;

  public getStorageLocation(path: string): string {
    return \`https://\${this.bucketName}.s3.\${this.region}.amazonaws.com/\${path}\`;
  }
}

export class S3StorageProvider extends CloudStorageProvider {
  public async uploadFile(path: string, content: Buffer): Promise<string> {
    console.log(\`Uploading \${content.length} bytes to S3 bucket \${this.bucketName}/\${path}\`);
    return this.getStorageLocation(path);
  }

  public async downloadFile(path: string): Promise<Buffer> {
    console.log(\`Downloading \${path} from AWS region \${this.region}\`);
    return Buffer.from("binary-payload");
  }

  public async deleteFile(path: string): Promise<boolean> {
    console.log(\`Purged \${path} from \${this.bucketName}\`);
    return true;
  }
}`;

export const compositionCode = `interface Logger {
  info(message: string): void;
  error(message: string): void;
}

interface PaymentProcessor {
  charge(amount: number): Promise<{ success: boolean; id: string }>;
}

export class ConsoleLogger implements Logger {
  public info(message: string): void {
    console.log(\`[INFO] \${message}\`);
  }

  public error(message: string): void {
    console.error(\`[ERROR] \${message}\`);
  }
}

export class StripePaymentProcessor implements PaymentProcessor {
  public async charge(amount: number) {
    return { success: true, id: \`ch_\${Date.now()}\` };
  }
}

export class OrderService {
  private logger: Logger;
  private paymentProcessor: PaymentProcessor;

  constructor(logger: Logger, paymentProcessor: PaymentProcessor) {
    this.logger = logger;
    this.paymentProcessor = paymentProcessor;
  }

  public async checkout(orderId: string, amount: number): Promise<boolean> {
    this.logger.info(\`Initiating checkout for Order \${orderId}\`);
    const payment = await this.paymentProcessor.charge(amount);

    if (!payment.success) {
      this.logger.error(\`Payment failed for Order \${orderId}\`);
      return false;
    }

    this.logger.info(\`Order \${orderId} completed successfully: \${payment.id}\`);
    return true;
  }
}`;

export const polymorphismCode = `export interface ShippingCarrier {
  readonly carrierName: string;
  calculateShippingRate(weightKg: number, distanceKm: number): number;
}

export class FedExCarrier implements ShippingCarrier {
  public readonly carrierName = "FedEx Express";

  public calculateShippingRate(weightKg: number, distanceKm: number): number {
    return 15 + weightKg * 2.2 + distanceKm * 0.05;
  }
}

export class DHLCarrier implements ShippingCarrier {
  public readonly carrierName = "DHL Priority";

  public calculateShippingRate(weightKg: number, distanceKm: number): number {
    return 18 + weightKg * 1.9 + distanceKm * 0.04;
  }
}

export class PostalCarrier implements ShippingCarrier {
  public readonly carrierName = "Postal Economy";

  public calculateShippingRate(weightKg: number, distanceKm: number): number {
    return 6 + weightKg * 0.9 + distanceKm * 0.02;
  }
}

export class LogisticsManager {
  public quoteBestRate(carriers: ShippingCarrier[], weight: number, distance: number) {
    return carriers.map((carrier) => ({
      carrier: carrier.carrierName,
      cost: carrier.calculateShippingRate(weight, distance),
    })).sort((a, b) => a.cost - b.cost);
  }
}

const logistics = new LogisticsManager();
const fleet: ShippingCarrier[] = [new FedExCarrier(), new DHLCarrier(), new PostalCarrier()];
const quotes = logistics.quoteBestRate(fleet, 5, 450);
console.log(quotes);`;

