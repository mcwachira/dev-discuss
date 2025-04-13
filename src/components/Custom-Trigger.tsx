"use client";
import { Menu } from "lucide-react"; // or "react-icons/fi" if using react-icons
import { useSidebar } from "@/components/ui/sidebar";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-md text-white  transition-colors"
      aria-label="Toggle Sidebar"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
