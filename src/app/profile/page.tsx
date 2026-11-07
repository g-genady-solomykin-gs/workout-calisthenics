import { AppShell } from "@/widgets/app-shell/ui/app-shell";
import { Profile } from "@/widgets/profile/ui/profile";

export default function ProfilePage() {
  return <AppShell activeTab="profile"><Profile /></AppShell>;
}
