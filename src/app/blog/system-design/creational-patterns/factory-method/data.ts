export const date = "12 Nov 2026";

export const tableOfContent = [
  {
    num: "01",
    id: "the-problem-with-hardcoded-instantiation",
    label: "The Problem with Hardcoding 'new'",
  },
  {
    num: "02",
    id: "what-is-the-factory-method",
    label: "What is the Factory Method Pattern?",
  },
  {
    num: "03",
    id: "simple-factory-vs-factory-method-vs-abstract-factory",
    label: "Simple Factory vs Factory Method vs Abstract Factory",
  },
  {
    num: "04",
    id: "real-world-example-payment-gateway",
    label: "Real-World Example 1: Multi-Provider Payment Gateway",
  },
  {
    num: "05",
    id: "real-world-example-multi-channel-notifications",
    label: "Real-World Example 2: Multi-Channel Notification Engine",
  },
  {
    num: "06",
    id: "modern-typescript-pattern-registry-factory",
    label: "Modern TypeScript Variant: The Registry Factory",
  },
  {
    num: "07",
    id: "when-to-use-and-when-to-avoid",
    label: "When to Use and When to Avoid",
  },
  {
    num: "08",
    id: "advantages-and-disadvantages",
    label: "Advantages and Disadvantages",
  },
];

export const calloutFactoryMethod = [
  {
    k: "THE GANG OF FOUR DEFINITION",
    d: "Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.",
    bad: false,
    title: "GOF",
  },
];

export const calloutComparison = [
  {
    k: "SIMPLE FACTORY (NOT A GOF PATTERN)",
    d: "A standalone function or class containing a conditional switch/case that returns different objects. Straightforward, but violates Open/Closed Principle when adding new types.",
    bad: false,
    title: "SIMPLE",
  },
  {
    k: "FACTORY METHOD (INHERITANCE-BASED)",
    d: "Relies on inheritance. A base creator class defines an abstract factory method, allowing subclasses to override the method and return specific product instances.",
    bad: false,
    title: "METHOD",
  },
  {
    k: "ABSTRACT FACTORY (OBJECT FAMILIES)",
    d: "Defines an interface for creating entire families of related or dependent objects (e.g., Windows UI vs MacOS UI) without specifying their concrete classes.",
    bad: false,
    title: "FAMILY",
  },
];

export const breadcrumbs = [
  { link: "/blog/system-design", text: "System Design" },
  { link: "/blog/system-design/creational-patterns", text: "Creational Patterns" },
  { link: "", text: "Factory Method" },
];

export const paymentGatewayCode = `export interface PaymentGateway {
  charge(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }>;
  refund(transactionId: string): Promise<boolean>;
}

export class StripeGateway implements PaymentGateway {
  public async charge(amount: number, currency: string) {
    console.log(\`[Stripe] Processing \${currency} \${amount} with PaymentIntents API\`);
    return { success: true, transactionId: \`ch_stripe_\${Date.now()}\` };
  }

  public async refund(transactionId: string) {
    console.log(\`[Stripe] Refunding transaction \${transactionId}\`);
    return true;
  }
}

export class PayPalGateway implements PaymentGateway {
  public async charge(amount: number, currency: string) {
    console.log(\`[PayPal] Processing \${currency} \${amount} with Orders API v2\`);
    return { success: true, transactionId: \`pay_paypal_\${Date.now()}\` };
  }

  public async refund(transactionId: string) {
    console.log(\`[PayPal] Refunding transaction \${transactionId}\`);
    return true;
  }
}

export abstract class PaymentProcessor {
  protected abstract createGateway(): PaymentGateway;

  public async processOrder(orderId: string, amount: number, currency: string) {
    const gateway = this.createGateway();

    console.log(\`[Order #\${orderId}] Starting payment checkout pipeline...\`);
    const result = await gateway.charge(amount, currency);

    if (result.success) {
      console.log(\`[Order #\${orderId}] Payment verified. TX: \${result.transactionId}\`);
    }
    return result;
  }
}

export class StripePaymentProcessor extends PaymentProcessor {
  protected createGateway(): PaymentGateway {
    return new StripeGateway();
  }
}

export class PayPalPaymentProcessor extends PaymentProcessor {
  protected createGateway(): PaymentGateway {
    return new PayPalGateway();
  }
}

async function handleCheckout(processor: PaymentProcessor) {
  await processor.processOrder("ORD-9842", 149.99, "USD");
}

handleCheckout(new StripePaymentProcessor());
handleCheckout(new PayPalPaymentProcessor());`;

export const notificationFactoryCode = `export interface NotificationChannel {
  send(recipient: string, message: string): Promise<void>;
}

export class EmailChannel implements NotificationChannel {
  public async send(recipient: string, message: string): Promise<void> {
    console.log(\`[Email via SendGrid] Sending to \${recipient}: "\${message}"\`);
  }
}

export class SMSChannel implements NotificationChannel {
  public async send(recipient: string, message: string): Promise<void> {
    console.log(\`[SMS via Twilio] Sending to \${recipient}: "\${message}"\`);
  }
}

export class PushChannel implements NotificationChannel {
  public async send(recipient: string, message: string): Promise<void> {
    console.log(\`[Push via FCM] Pushing token \${recipient}: "\${message}"\`);
  }
}

export abstract class NotificationDispatcher {
  protected abstract createChannel(): NotificationChannel;

  public async dispatchAlert(user: { contact: string }, alertText: string): Promise<void> {
    const channel = this.createChannel();
    const formattedMessage = \`[ALERT \${new Date().toLocaleTimeString()}]: \${alertText}\`;
    await channel.send(user.contact, formattedMessage);
  }
}

export class EmailDispatcher extends NotificationDispatcher {
  protected createChannel(): NotificationChannel {
    return new EmailChannel();
  }
}

export class SMSDispatcher extends NotificationDispatcher {
  protected createChannel(): NotificationChannel {
    return new SMSChannel();
  }
}

export class PushDispatcher extends NotificationDispatcher {
  protected createChannel(): NotificationChannel {
    return new PushChannel();
  }
}`;

export const registryFactoryCode = `export type ProviderType = "stripe" | "paypal" | "razorpay";

export interface IPaymentService {
  pay(amount: number): Promise<void>;
}

type PaymentConstructor = new () => IPaymentService;

export class PaymentGatewayRegistry {
  private static registry = new Map<ProviderType, PaymentConstructor>();

  public static register(type: ProviderType, ctor: PaymentConstructor): void {
    PaymentGatewayRegistry.registry.set(type, ctor);
  }

  public static create(type: ProviderType): IPaymentService {
    const ConstructorClass = PaymentGatewayRegistry.registry.get(type);
    if (!ConstructorClass) {
      throw new Error(\`Unsupported payment provider: "\${type}"\`);
    }
    return new ConstructorClass();
  }
}

PaymentGatewayRegistry.register("stripe", class implements IPaymentService {
  async pay(amount: number) { console.log(\`Paid \${amount} via Stripe\`); }
});

PaymentGatewayRegistry.register("paypal", class implements IPaymentService {
  async pay(amount: number) { console.log(\`Paid \${amount} via PayPal\`); }
});

const gateway = PaymentGatewayRegistry.create("stripe");
gateway.pay(500);`;

