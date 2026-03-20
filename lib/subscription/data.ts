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
    category: "Design",
    price: 15,
    billingCycle: "monthly",
    team: true,
    seats: 4,
    owner: "Design Lead",
    status: "active",
    nextBillingDate: addDays(8),
    lastUsed: addDays(-1),
  },
  {
    id: "vercel-pro",
    name: "Vercel",
    category: "Development",
    price: 20,
    billingCycle: "monthly",
    owner: "Founder",
    status: "active",
    nextBillingDate: addDays(12),
    lastUsed: addDays(0),
  },
  {
    id: "notion-plus",
    name: "Notion",
    category: "Productivity",
    price: 10,
    billingCycle: "monthly",
    team: true,
    seats: 5,
    owner: "Operations",
    status: "active",
    nextBillingDate: addDays(5),
    lastUsed: addDays(-3),
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT",
    category: "AI",
    price: 20,
    billingCycle: "monthly",
    owner: "Product Designer",
    status: "active",
    nextBillingDate: addDays(15),
    lastUsed: addDays(0),
  },
  {
    id: "adobe-cc",
    name: "Adobe Creative Cloud",
    category: "Design",
    price: 54.99,
    billingCycle: "monthly",
    owner: "Marketing",
    status: "unused",
    nextBillingDate: addDays(3),
    lastUsed: addDays(-42),
  },
];