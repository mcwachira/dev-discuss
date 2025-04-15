import {
  Home,
  Hash,
  Bookmark,
  Users,
  HelpCircle,
  Terminal,
  Code2,
  MessagesSquare,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { mockTags } from "@/data/mockData";
import { Button } from "./ui/button";

// Menu items.
const submenu_one = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "latest",
    url: "/latest",
    icon: Terminal,
  },
  {
    title: " Code Snippets",
    url: "/code-snippets",
    icon: Code2,
  },
  {
    title: "Discussion",
    url: "/discussion",
    icon: MessagesSquare,
  },
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
  },
];

const submenu_two = [
  {
    title: "BookMarks",
    url: "/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Following",
    url: "/following",
    icon: Users,
  },
];

// const submenu_three = [
//   {
//     title: "Topics",
//     url: "/topics",
//   },
// ];

export function AppSidebar() {
  return (
    <Sidebar className="h-full w-64 bg-background  border-r mt-10 px-3 py-10">
      <SidebarContent className="h-full">
        <ScrollArea className="h-full pr-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {submenu_one.map((submenu) => (
                  <SidebarMenuItem key={submenu.title}>
                    <SidebarMenuButton
                      className="w-full justify-start gap-3 text-sm font-medium px-3 py-2 rounded-lg hover:bg-primary"
                      asChild
                    >
                      <Link href={submenu.url}>
                        <submenu.icon className="h-5 w-5 text-muted-white" />
                        <span>{submenu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator className="my-4" />

          {/* SAVED SECTION */}
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-lg font-semibold tracking-tight">
              Saved
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {submenu_two.map((submenu) => (
                  <SidebarMenuItem key={submenu.title}>
                    <SidebarMenuButton
                      className="w-full justify-start gap-3 text-sm font-medium px-3 py-2 rounded-lg hover:bg-primary"
                      asChild
                    >
                      <Link href={submenu.url}>
                        <submenu.icon className="h-5 w-5 text-muted-white" />
                        <span>{submenu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-4" />
          <div>
            <div className="flex items-center justify-between">
              <h3 className="px-2 text-lg font-semibold tracking-tight">
                Top Tags
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs px-1"
                asChild
              >
                <Link href="/topics">View All</Link>
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 px-2">
              {mockTags.slice(0, 8).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <Hash className="mr-1 h-3 w-3" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
