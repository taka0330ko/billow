"use client";

import Image from "next/image";
import { Minus } from "lucide-react";
import { memberAvatarMap } from "@/lib/member/avatar";
import { members } from "@/lib/member/data";
import { Member } from "@/lib/member/types";
import { subscriptions } from "@/lib/subscription/data";
import { subscriptionIconMap } from "@/lib/subscription/icons";

type ToolsForMemberProps = {
  member: Member;
};

function ToolsForMember({ member }: ToolsForMemberProps) {
  const memberSubscriptions = subscriptions.filter((subscription) =>
    member.toolIds.includes(subscription.id)
  );

  return (
    <section className="h-full px-6 pb-8 pt-2">
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-white">
              Tools for {member.name.split(" ")[0]}
            </h3>
          </div>
          <p className="text-sm text-zinc-400">{member.role}</p>
        </div>

        <div className="custom-scroll h-100 min-h-0 overflow-y-auto pr-2">
          <div className="flex flex-col gap-4">
            {memberSubscriptions.map((subscription) => {
              const assignedMembers = members.filter((item) =>
                item.toolIds.includes(subscription.id)
              );

              return (
                <article
                  className="rounded-[24px] bg-[#2d2f38] px-5 py-5 text-white"
                  key={subscription.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex size-11 items-center justify-center rounded-full bg-black/25">
                        <Image
                          src={subscriptionIconMap[subscription.iconKey]}
                          alt={subscription.name}
                          width={28}
                          height={28}
                          className="size-7 object-contain"
                        />
                      </div>
                      <h4 className="text-xl font-medium tracking-tight text-white">
                        {subscription.name}
                      </h4>
                    </div>
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-full text-zinc-200 transition hover:bg-white/10"
                      aria-label={`${subscription.name} actions`}
                    >
                      <Minus className="size-6" />
                    </button>
                  </div>

                  <div className="mt-8 grid grid-cols-[1fr_auto] gap-6">
                    <div className="self-end">
                      <p className="mt-2 text-md text-zinc-400">
                        {subscription.plan}
                      </p>
                      <p className="text-xl  text-white">
                        {assignedMembers.length}
                        {subscription.seats ? `/${subscription.seats}` : ""}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-2 gap-3">
                      {assignedMembers.map((assignedMember) => {
                        const isSelected = assignedMember.id === member.id;

                        return (
                          <div
                            className={`rounded-full p-0.5 ${
                              isSelected ? "bg-blue-500" : "bg-white"
                            }`}
                            key={assignedMember.id}
                          >
                            <Image
                              src={memberAvatarMap[assignedMember.avatarKey]}
                              alt={assignedMember.name}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                              sizes="32px"
                            />
                          </div>
                        );
                      })}
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

export default ToolsForMember;
