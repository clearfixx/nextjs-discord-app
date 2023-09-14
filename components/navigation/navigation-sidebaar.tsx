// Connect to DB
import { db } from "@/lib/db";

// Fetch current profile
import { currentProfile } from "@/lib/current-profile";

// Router
import { redirect } from "next/navigation";

// UI
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "@/components/mode-toggle";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  // If can't get profile redirect to main page
  if (!profile) {
    return redirect("/");
  }

  // Fetch all user servers
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] pt-[10px]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(({ id, imageUrl, name }) => (
          <div key={id} className="mb-4">
            <NavigationItem id={id} imageUrl={imageUrl} name={name} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
      </div>
    </div>
  );
};
