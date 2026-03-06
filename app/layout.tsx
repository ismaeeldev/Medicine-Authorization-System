import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { DeveloperWarning } from "@/components/DeveloperWarning"
import { StartupLoader } from "@/components/startup-loader"

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
  if (process.env.isShow === 'true') {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-foreground bg-background`}>
          <DeveloperWarning />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex text-foreground bg-background selection:bg-primary/30 selection:text-primary`}
      >
        <StartupLoader />
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
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "group toast group-[.toaster]:bg-neutral-900/80 group-[.toaster]:text-foreground group-[.toaster]:border-white/10 group-[.toaster]:shadow-[0_8px_30px_rgb(0,0,0,0.24)] group-[.toaster]:backdrop-blur-xl group-[.toaster]:rounded-2xl",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
