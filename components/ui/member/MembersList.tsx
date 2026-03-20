import Image from "next/image";
import { members } from "@/lib/member/data";
import { memberAvatarMap } from "@/lib/member/avatar";


function MembersList() {
  return (
    <section>
        <h2>{members.length}Members</h2>
        <div>
            {members.map((member) => (
                <div
                key={member.id}>
                    <Image
                    src={memberAvatarMap[member.avatarKey]}
                    alt={member.name}
                    className="object-cover"
                    sizes="56px"
                    />
                </div>
            ))}
        </div>
    </section>
  )
}

export default MembersList
