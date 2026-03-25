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
        <div className="min-h-full bg-workspace">
            <div>
                <MembersList
                    selectedMemberId={selectedMember.id}
                    onSelectMember={setSelectedMember}
                />
            </div>
            <div className="flex flex-col lg:grid gap-4 grid-cols-12 grid-rows-[auto_1fr]">
                <section className="col-start-1 col-span-4 h-full px-6 pt-2 gap-8 grid grid-rows-subgrid row-span-2">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <h3 className="text-2xl font-medium tracking-tight">
                                    Tools for {selectedMember.name.split(" ")[0]}
                                </h3>
                            </div>
                            <p className="text-sm ">{selectedMember.role}</p>
                        </div>

                        <ToolsForMember member={selectedMember} />
                </section>

                <section className="h-full px-6 pt-2 col-start-5 col-span-8 grid grid-rows-subgrid row-span-2">
                        <div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-medium tracking-tight text-white">
                                    Available Tools
                                </h3>
                                <label className="flex h-12 w-full items-center rounded-full border max-w-80 border-border bg-card px-4 text-secondary-text lg:max-w-sm">
                                    <Search className="mr-3 size-4 shrink-0" />
                                    <input
                                        type="text"
                                        value=""
                                        readOnly
                                        placeholder="Search tool or member..."
                                        className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500 cursor-not-allowed"
                                    />
                                </label>
                            </div>
                        </div>
                        <ToolsCards />
                </section>
            </div>
        </div>
    )
}
