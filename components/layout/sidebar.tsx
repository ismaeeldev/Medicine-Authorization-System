"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ScanBarcode, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Scanner", href: "/dashboard/scanner", icon: ScanBarcode },
    { name: "Companies", href: "/dashboard/companies", icon: Building2 },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-white/10 bg-background/50 backdrop-blur-xl sm:flex transition-all duration-300">
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/5 bg-white/5">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
                    <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
                        <ScanBarcode className="h-5 w-5 text-primary" />
                    </div>
                    Medico<span className="text-foreground/80 font-medium"></span>
                </Link>
            </div>
            <nav className="flex flex-1 flex-col p-4 gap-2 overflow-y-auto">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                    Menu
                </div>
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-[inset_0px_1px_1px_rgba(255,255,255,0.05)] border border-primary/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-colors duration-300",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-white/5">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Medico System</h4>
                    <p className="text-xs text-muted-foreground">Version 1.0.0 (Production)</p>
                </div>
            </div>
        </aside>
    )
}
