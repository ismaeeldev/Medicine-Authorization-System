"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ScanBarcode, Building2, Menu, X, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Scanner", href: "/dashboard/scanner", icon: ScanBarcode },
    { name: "Companies", href: "/dashboard/companies", icon: Building2 },
]

export function Topbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 right-0 left-0 sm:left-64 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-transparent px-4 py-3 transition-all duration-200 sm:px-6",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-lg border-white/10 shadow-sm"
                        : "bg-transparent"
                )}
            >
                <div className="flex flex-1 items-center justify-between gap-x-4">
                    <div className="flex items-center sm:hidden">
                        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight">
                            <div className="bg-primary/20 p-1 rounded-lg border border-primary/30">
                                <ScanBarcode className="h-4 w-4 text-primary" />
                            </div>
                            <span className="hidden xs:inline-block">Medico</span>
                        </Link>
                    </div>

                    <div className="flex flex-1 justify-end items-center gap-x-4">
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <div className="hidden sm:block">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary/80 to-primary/20 border border-primary/50" />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden rounded-lg text-foreground bg-white/5 border border-white/10"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <Menu className="h-5 w-5" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 sm:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Mobile Sidebar */}
                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-background/95 backdrop-blur-xl border-l border-white/10 px-6 py-6 shadow-2xl animate-in slide-in-from-right-full duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
                                <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
                                    <ScanBarcode className="h-5 w-5 text-primary" />
                                </div>
                                Medico<span className="text-foreground/80 font-medium">SaaS</span>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg text-foreground bg-white/5 border border-white/10"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="h-5 w-5" aria-hidden="true" />
                            </Button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-white/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "group flex items-center gap-4 rounded-xl px-4 py-4 text-base font-semibold",
                                                    isActive
                                                        ? "bg-primary/10 text-primary border border-primary/20"
                                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                )}
                                            >
                                                <item.icon
                                                    className={cn(
                                                        "h-5 w-5 shrink-0",
                                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                                    )}
                                                />
                                                {item.name}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
