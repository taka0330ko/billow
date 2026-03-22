import { members } from "@/lib/member/data";
import { subscriptions } from "@/lib/subscription/data";
import {
  getMonthlyTotal,
  getUnusedSubscriptions,
} from "@/lib/subscription/utils";

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const formatSubscriptionMonthlyCost = (price: number, billingCycle: "monthly" | "yearly") => {
  const monthlyCost = billingCycle === "yearly" ? price / 12 : price;
  return formatCurrency(monthlyCost);
};

export function buildDatabaseContext() {
  const monthlyTotal = getMonthlyTotal(subscriptions);
  const unusedSubscriptions = getUnusedSubscriptions(subscriptions);

  const memberLines = members.map((member) => {
    const assignedSubscriptions = subscriptions.filter((subscription) =>
      member.toolIds.includes(subscription.id)
    );

    const memberMonthlyTotal = assignedSubscriptions.reduce((total, subscription) => {
      const monthlyCost =
        subscription.billingCycle === "yearly"
          ? subscription.price / 12
          : subscription.price;

      return total + monthlyCost;
    }, 0);

    const subscriptionNames =
      assignedSubscriptions.length > 0
        ? assignedSubscriptions.map((subscription) => subscription.name).join(", ")
        : "none";

    return [
      `- ${member.name}`,
      `  id: ${member.id}`,
      `  role: ${member.role}`,
      `  email: ${member.email ?? "not set"}`,
      `  status: ${member.status}`,
      `  toolIds: ${member.toolIds.length > 0 ? member.toolIds.join(", ") : "none"}`,
      `  subscriptions: ${subscriptionNames}`,
      `  monthlyAssignedCost: ${formatCurrency(memberMonthlyTotal)}`,
    ].join("\n");
  });

  const subscriptionLines = subscriptions.map((subscription) => {
    const assignedMembers = members.filter((member) =>
      member.toolIds.includes(subscription.id)
    );

    const seatUsage =
      subscription.team && subscription.seats
        ? `${assignedMembers.length}/${subscription.seats}`
        : `${assignedMembers.length}`;

    return [
      `- ${subscription.name}`,
      `  id: ${subscription.id}`,
      `  plan: ${subscription.plan}`,
      `  category: ${subscription.category}`,
      `  status: ${subscription.status}`,
      `  billingCycle: ${subscription.billingCycle}`,
      `  pricePerBillingCycle: ${formatCurrency(subscription.price)}`,
      `  monthlyCostPerUnit: ${formatSubscriptionMonthlyCost(
        subscription.price,
        subscription.billingCycle
      )}`,
      `  team: ${subscription.team ? "yes" : "no"}`,
      `  seats: ${subscription.seats ?? "n/a"}`,
      `  seatUsage: ${seatUsage}`,
      `  owner: ${subscription.owner ?? "not set"}`,
      `  nextBillingDate: ${subscription.nextBillingDate ?? "not set"}`,
      `  lastUsed: ${subscription.lastUsed ?? "not set"}`,
      `  assignedMembers: ${
        assignedMembers.length > 0
          ? assignedMembers.map((member) => member.name).join(", ")
          : "none"
      }`,
    ].join("\n");
  });

  return [
    "Database snapshot",
    "",
    "Workspace summary",
    `- totalMembers: ${members.length}`,
    `- totalSubscriptions: ${subscriptions.length}`,
    `- workspaceMonthlyCost: ${formatCurrency(monthlyTotal)}`,
    `- unusedSubscriptions: ${
      unusedSubscriptions.length > 0
        ? unusedSubscriptions.map((subscription) => subscription.name).join(", ")
        : "none"
    }`,
    "",
    "Members",
    ...memberLines,
    "",
    "Subscriptions",
    ...subscriptionLines,
    "",
    "Answer rules",
    "- Answer using this snapshot as the source of truth.",
    "- If asked about a member's subscriptions, use the member's toolIds and the matching subscription records.",
    "- If asked about monthly cost, answer in USD and prefer monthly totals.",
    "- If information is missing from this snapshot, say it is not available.",
  ].join("\n");
}

export const databaseContext = buildDatabaseContext();
