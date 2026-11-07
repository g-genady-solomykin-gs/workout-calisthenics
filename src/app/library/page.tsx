import { AppShell } from "@/widgets/app-shell/ui/app-shell";
import { VideoLibrary } from "@/widgets/video-library/ui/video-library";

export default function LibraryPage() {
  return <AppShell activeTab="library"><VideoLibrary /></AppShell>;
}
