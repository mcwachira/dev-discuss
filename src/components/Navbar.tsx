import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Bell, MessageSquare } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import HeaderAuth from "@/components/HeaderAuth";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto  h-15 flex items-center ">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex space-x-2">
            <span className="font-bold text-xl text-primary">DevDiscuss</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          {/* //use md */}
          <div className="relative w-full max-w-sm hidden md:flex mx-auto items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-background w-full"
            />
          </div>
          <div className="flex  items-center justify-end gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
       <HeaderAuth/>
          </div>
        </div>
      </div>
    </header>
  );
}
