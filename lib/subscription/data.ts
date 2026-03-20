import { Subscription } from "./types";

const toLocalISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toLocalISODate(date);
};

export const subscriptions: Subscription[] = [
  {
    id: "figma-pro",
    name: "Figma",
    plan: "Full seat",
    category: "Design",
    price: 15,
    billingCycle: "monthly",
    team: true,
    seats: 4,
    owner: "Design Lead",
    status: "active",
    nextBillingDate: addDays(8),
    lastUsed: addDays(-1),
    iconKey: "figma",
  },
  {
    id: "vercel-pro",
    name: "Vercel",
    plan: "Pro",
    category: "Development",
    price: 20,
    billingCycle: "monthly",
    owner: "Founder",
    status: "active",
    nextBillingDate: addDays(12),
    lastUsed: addDays(0),
    iconKey: "vercel"
  },
  {
    id: "slack-pro",
    name: "Slack",
    plan: "Pro",
    category: "Communication",
    price: 8,
    billingCycle: "monthly",
    team: true,
    seats: 6,
    owner: "Operations",
    status: "active",
    nextBillingDate: addDays(5),
    lastUsed: addDays(0),
    iconKey: "slack",
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT",
    plan: "Plus",
    category: "AI",
    price: 20,
    billingCycle: "monthly",
    owner: "Product Designer",
    status: "active",
    nextBillingDate: addDays(15),
    lastUsed: addDays(0),
    iconKey: "chatgpt",
  },
  {
    id: "adobe-cc",
    name: "Adobe Creative Cloud",
    plan: "Creative Cloud All Apps",
    category: "Design",
    price: 54.99,
    billingCycle: "monthly",
    owner: "Marketing",
    status: "unused",
    nextBillingDate: addDays(3),
    lastUsed: addDays(-42),
    iconKey:"adobe",
  },
];
