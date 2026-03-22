"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { memberAvatarMap } from "@/lib/member/avatar";
import { members } from "@/lib/member/data";
import { subscriptions } from "@/lib/subscription/data";
import { subscriptionIconMap } from "@/lib/subscription/icons";
import { Subscription } from "@/lib/subscription/types";

type ToolsCardsProps = {
  items?: Subscription[];
};

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

function ToolsCards({ items = subscriptions }: ToolsCardsProps) {
  const visibleSubscriptions = items;

  return ( 
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
                  className="rounded-lg bg-card px-5 py-4 text-primary-text"
                  key={subscription.id}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
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
                          <h4 className="text-xl font-medium tracking-tight">
                            {subscription.name}
                          </h4>
                          <span className="text-sm">
                            {subscription.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full  transition hover:bg-white/10 cursor-not-allowed"
                      aria-label={`${subscription.name} add`}
                    >
                      <Plus className="size-5" />
                    </button>
                  </div>

                  {/* Tools Info */}
                  <div className="mt-4 grid gap-4 text-sm  md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] ">
                        Plan
                      </p>
                      <p className="mt-1 text-xl text-primary-text">{subscription.plan}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] ">
                        Price
                      </p>
                      <p className="mt-1 text-xl text-primary-text">
                        {formatPrice(subscription.price, Boolean(subscription.team))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] ">
                        Next Due
                      </p>
                      <p className="mt-1 text-xl text-primary-text">
                        {formatNextDue(subscription.nextBillingDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] ">
                        Seats
                      </p>
                      <p className="mt-1 text-xl text-white">{seatsLabel}</p>
                    </div>
                    <div className="sm:justify-self-end">
                      <p className="text-xs uppercase tracking-[0.16em] ">
                        Members
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-start sm:justify-end">
                        {assignedMembers.map((member, index) => (
                          <div
                            className={`rounded-full border-2 border-border ${index === 0 ? "" : "-ml-2"}`}
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
  );
}

export default ToolsCards;
