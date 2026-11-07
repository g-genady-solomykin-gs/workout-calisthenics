import { AppShell } from "@/widgets/app-shell/ui/app-shell";
import { WorkoutDashboard } from "@/widgets/workout-dashboard/ui/workout-dashboard";

export default function HomePage() {
  return <AppShell activeTab="home"><WorkoutDashboard /></AppShell>;
}
