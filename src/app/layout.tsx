import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/App-SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomTrigger } from "@/components/Custom-Trigger";
import {Toaster} from "@/components/ui/sonner";
import RightSideBar from "@/components/RightSideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="class"
          enableSystem
          disableTransitionOnChange
        >
          {/* Page layout */}
          <div className="flex flex-col min-h-screen">
            {/* Navbar at top */}
            <Navbar />

            {/* Sidebar + Page Content */}
            <div className="flex flex-1 overflow-hidden">
              <SidebarProvider>
                <div className="hidden md:block">
                  <AppSidebar />
                </div>

                <main className="overflow-y-auto p-4">
                  {/* Responsive Top Row: Trigger + Title */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Show trigger only on small screens */}
                    <div>
                      <CustomTrigger />
                    </div>
                  </div>
                  {children}

                </main>

<div className="flex-1">
  <RightSideBar/>
</div>



                <Toaster />
              </SidebarProvider>

            </div>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
