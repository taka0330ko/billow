"use client"

import MembersList from "@/components/ui/member/MembersList";
import ToolsCards from "@/components/ui/member/ToolsCards";
import ToolsForMember from "@/components/ui/member/ToolsForMember";
import { members } from "@/lib/member/data";
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
            <div className="col-start-5 col-span-8">
                <ToolsCards />
            </div>
        </div>
    </div>
    )
}
