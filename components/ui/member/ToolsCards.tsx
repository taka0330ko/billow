"use client";

import Image from "next/image";
import { Plus, Search } from "lucide-react";
import { memberAvatarMap } from "@/lib/member/avatar";
import { members } from "@/lib/member/data";
import { subscriptions } from "@/lib/subscription/data";
import { subscriptionIconMap } from "@/lib/subscription/icons";

const formatPrice = (price: number, isTeam: boolean) => {
  const formattedPrice =
    price % 1 === 0 ? `$${price.toFixed(0)}` : `$${price.toFixed(2)}`;

  return isTeam ? `${formattedPrice} / user` : formattedPrice;
};

const formatNextDue = (dateString?: string) => {
  if (!dateString) return "TBD";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
};

function ToolsCards() {
  const visibleSubscriptions = subscriptions;

  return (
    <section className="h-full px-6 pb-8 pt-2">
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="text-3xl font-medium tracking-tight text-white">
            Available Tools
          </h3>
          <label className="flex h-12 w-full items-center rounded-full border border-white/15 bg-[#171922] px-4 text-zinc-400 lg:max-w-sm">
            <Search className="mr-3 size-4 shrink-0" />
            <input
              type="text"
              value=""
              readOnly
              placeholder="Search tool or member..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </label>
        </div>

        <div className="custom-scroll h-100 min-h-0 overflow-y-auto pr-2 ">
          <div className="flex flex-col gap-4">
            {visibleSubscriptions.map((subscription) => {
              const assignedMembers = members.filter((member) =>
                member.toolIds.includes(subscription.id)
              );
              const seatsLabel = subscription.seats
                ? `${assignedMembers.length}/${subscription.seats}`
                : `${assignedMembers.length}`;

              return (
                <article
                  className="rounded-[24px] bg-[#2d2f38] px-5 py-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                  key={subscription.id}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-black/25">
                        <Image
                          src={subscriptionIconMap[subscription.iconKey]}
                          alt={subscription.name}
                          width={24}
                          height={24}
                          className="size-6 object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h4 className="text-2xl font-medium tracking-tight text-white">
                            {subscription.name}
                          </h4>
                          <span className="text-sm text-zinc-400">
                            {subscription.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/10"
                      aria-label={`${subscription.name} add`}
                    >
                      <Plus className="size-5" />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 text-sm text-zinc-300 sm:grid-cols-[1.15fr_1.15fr_0.9fr_0.8fr_1.3fr] sm:items-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Plan
                      </p>
                      <p className="mt-1 text-xl text-white">{subscription.plan}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Price
                      </p>
                      <p className="mt-1 text-xl text-white">
                        {formatPrice(subscription.price, Boolean(subscription.team))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Next Due
                      </p>
                      <p className="mt-1 text-xl text-white">
                        {formatNextDue(subscription.nextBillingDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Seats
                      </p>
                      <p className="mt-1 text-xl text-white">{seatsLabel}</p>
                    </div>
                    <div className="sm:justify-self-end">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Members
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-start sm:justify-end">
                        {assignedMembers.map((member, index) => (
                          <div
                            className={`rounded-full border-2 border-[#2d2f38] ${index === 0 ? "" : "-ml-2"}`}
                            key={member.id}
                          >
                            <Image
                              src={memberAvatarMap[member.avatarKey]}
                              alt={member.name}
                              width={40}
                              height={40}
                              className="size-10 rounded-full object-cover"
                              sizes="40px"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsCards;
