import { AppShell } from "@/widgets/app-shell/ui/app-shell";
import { WorkoutPlans } from "@/widgets/workout-plans/ui/workout-plans";

export default function WorkoutsPage() {
  return <AppShell activeTab="workouts"><WorkoutPlans /></AppShell>;
}
