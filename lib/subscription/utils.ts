import { Subscription } from "./types";

// 💸 月額合計
export const getMonthlyTotal = (subs: Subscription[]) => {
  return subs.reduce((total, sub) => {
    const price =
      sub.billingCycle === "yearly" ? sub.price / 12 : sub.price;

    const seats = sub.team && sub.seats ? sub.seats : 1;

    return total + price * seats;
  }, 0);
};

// ⚠️ 未使用
export const getUnusedSubscriptions = (subs: Subscription[]) => {
  return subs.filter((s) => s.status === "unused");
};

// 📅 relative billing
export const getRelativeBillingText = (dateString?: string) => {
  if (!dateString) return "No billing date";

  const date = new Date(dateString);
  const now = new Date();

  const diffDays = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  if (diffDays < 7) return `Due in ${diffDays} days`;

  return `Due in ${Math.floor(diffDays / 7)} weeks`;
};

// 📅 relative last used（UX改善版）
export const getRelativeLastUsedText = (dateString?: string) => {
  if (!dateString) return "No usage data";

  const date = new Date(dateString);
  const now = new Date();

  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 1) return "Used today";
  if (diffDays === 1) return "Used yesterday";
  if (diffDays < 7) return `Used ${diffDays} days ago`;
  if (diffDays < 30) return `Used ${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 90) return `Used ${Math.floor(diffDays / 30)} months ago`;

  return `Last used on ${new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
  }).format(date)}`;
};