import { CreditCard } from "lucide-react";
import type { Subscription } from "@/lib/subscription/types";
import { getMonthlyTotal } from "@/lib/subscription/utils";

type Props = {
  items: Subscription[];
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function SubscriptionTotalCard({ items }: Props) {
  const paidSubscriptions = items.filter(
    (item) => item.status === "active" || item.status === "unused",
  );
  const total = getMonthlyTotal(paidSubscriptions);

  return (
    <section
      aria-labelledby="subscription-total-title"
      className="rounded-lg bg-card px-5 py-4 text-primary-text"
    >
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/25">
          <CreditCard className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h2 id="subscription-total-title" className="text-xl font-medium tracking-tight">
          Monthly total
        </h2>
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.16em]">All subscriptions · USD</p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-heading text-4xl font-medium tracking-tight text-primary-text tabular-nums">
            {currency.format(total)}
          </span>
          <span className="text-sm">/ month</span>
        </p>
        <p className="mt-3 text-sm">
          {paidSubscriptions.length} paid {paidSubscriptions.length === 1 ? "subscription" : "subscriptions"}
        </p>
        <p className="mt-2 text-xs leading-relaxed">
          Includes all purchased team seats. Annual plans are averaged monthly.
        </p>
      </div>
    </section>
  );
}
