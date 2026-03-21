"use client"

import MembersList from "@/components/ui/member/MembersList";
import ToolsCards from "@/components/ui/member/ToolsCards";
import ToolsForMember from "@/components/ui/member/ToolsForMember";
import { members } from "@/lib/member/data";
import { Search } from "lucide-react";
import { useState } from "react";

export default function MemberPage() {
    const [selectedMember, setSelectedMember] = useState(members[0]);

    return (
    <div>
        <div>
            <MembersList
              selectedMemberId={selectedMember.id}
              onSelectMember={setSelectedMember}
            />
        </div>
        <div className="flex flex-col lg:grid gap-4 grid-cols-12">
            <div className="col-start-1 col-span-4 ">
                <ToolsForMember member={selectedMember} />
            </div>

        <section className="h-full px-6 pb-8 pt-2 col-start-5 col-span-8">

            <div className="flex flex-col gap-4">
        <div>
    
      <div className="flex justify-between">
          <h3 className="text-2xl font-medium tracking-tight text-white">
            Available Tools
          </h3>
          <label className="flex h-12 w-full items-center rounded-full border max-w-80 border-white/15 bg-[#171922] px-4 text-zinc-400 lg:max-w-sm">
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
            </div>
            <ToolsCards />
            </div>
 
        </section>
        </div>
    </div>
    )
}
