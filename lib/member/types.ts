export type MemberAvatarKey =
  | "alex"
  | "amir"
  | "daniel"
  | "lucas"
  | "olivia"
  | "tina";

export type MemberStatus = "active" | "inactive";

export interface Member {
  id: string;
  name: string;
  role: string;
  avatarKey: MemberAvatarKey;
  email?: string;
  toolIds: string[];
  status: MemberStatus;
}
