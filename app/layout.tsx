import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NoteProvider } from "@/providers/NoteProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes App",
  description: "A simple AI notes app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         <NoteProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex min-h-screen flex-col w-full">
              <Header />
              <main className="flex flex-1 flex-col px-4 pt-4 xl:px-8">{children}</main>
            </div>
          </SidebarProvider>
          <Toaster />
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
