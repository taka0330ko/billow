export type BillingCycle = "monthly" | "yearly";

export type SubscriptionStatus =
  | "active"
  | "unused"
  | "trial"
  | "canceled";

export type SubscriptionCategory =
  | "Design"
  | "Development"
  | "Communication"
  | "AI"
  | "Entertainment";

  export type SubscriptionIconKey = 
  | "figma"
  | "vercel"
  | "slack"
  | "chatgpt"
  | "adobe";

export interface Subscription {
  id: string;
  name: string;
  plan: string;
  category: SubscriptionCategory;
  price: number;
  billingCycle: BillingCycle;
  iconKey: SubscriptionIconKey;

  team?: boolean;
  seats?: number;
  owner?: string;

  status: SubscriptionStatus;

  nextBillingDate?: string;
  lastUsed?: string;
}
