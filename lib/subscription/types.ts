export type BillingCycle = "monthly" | "yearly";

export type SubscriptionStatus =
  | "active"
  | "unused"
  | "trial"
  | "canceled";

export type SubscriptionCategory =
  | "Design"
  | "Development"
  | "Productivity"
  | "AI"
  | "Entertainment";

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  price: number;
  billingCycle: BillingCycle;

  team?: boolean;
  seats?: number;
  owner?: string;

  status: SubscriptionStatus;

  nextBillingDate?: string;
  lastUsed?: string;
}