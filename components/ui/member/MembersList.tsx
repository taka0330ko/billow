"use client";

import Image from "next/image";
import { members } from "@/lib/member/data";
import { memberAvatarMap } from "@/lib/member/avatar";
import { Member } from "@/lib/member/types";

type MembersListProps = {
  selectedMemberId: string;
  onSelectMember: (member: Member) => void;
};

function MembersList({ selectedMemberId, onSelectMember }: MembersListProps) {
  return (
    <section className="min-h-full bg-background px-6 py-8">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
        <h2 className="text-2xl text-white">{members.length} Members</h2>
        <div className="flex flex-wrap gap-4">
          {members.map((member) => {
            const isSelected = member.id === selectedMemberId;

            return (
              <button
                type="button"
                className="group flex flex-col items-center gap-2 pt-1"
                key={member.id}
                onClick={() => onSelectMember(member)}
              >
                <div
                  className={`rounded-full p-[2px] transition ${
                    isSelected ? "bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : "bg-transparent"
                  }`}
                >
                  <Image
                    src={memberAvatarMap[member.avatarKey]}
                    alt={member.name}
                    width={56}
                    height={56}
                    className="rounded-full bg-white object-cover"
                    sizes="56px"
                  />
                </div>
                <span
                  className={`text-[12px] text-white transition-opacity duration-300 ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {member.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MembersList;
