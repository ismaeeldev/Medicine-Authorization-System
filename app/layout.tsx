import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medico | Medicine Authorization System",
  description: "Secure and modern SaaS dashboard for medicine authorization and barcode scanning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex text-foreground bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark" // forcing dark mode based on requirements
          disableTransitionOnChange
        >
          <Sidebar />
          <div className="flex-1 flex flex-col sm:ml-64 relative min-w-0">
            <Topbar />
            <main className="flex-1 overflow-x-hidden pt-16 sm:pt-0 p-4 sm:p-6 pb-24 sm:pb-6">
              {children}
            </main>
          </div>
          <Toaster toastOptions={{
            classNames: {
              toast: "bg-background border-border text-foreground blur-xl bg-opacity-80 backdrop-blur-md rounded-xl",
            }
          }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
