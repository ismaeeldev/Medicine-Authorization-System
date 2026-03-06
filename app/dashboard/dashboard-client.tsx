"use client"

import Link from "next/link";
import { Building2, ScanBarcode, Plus } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function DashboardClient({ count }: { count: number }) {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-1">
                    Dashboard Overview
                </h2>
                <p className="text-muted-foreground text-sm">
                    Welcome to Medico System. Manage medicine authorizations and company registrations.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {/* Stat Card */}
                <motion.div variants={item}>
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-primary/50 transition-colors duration-300 h-full group hover:bg-white/10">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                Total Companies
                            </CardTitle>
                            <div className="p-2 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <Building2 className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-foreground">{count}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Registered in the database
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Action Card: Scanner */}
                <motion.div variants={item}>
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between h-full group hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                                <ScanBarcode className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                Scan Product
                            </CardTitle>
                            <CardDescription className="text-xs group-hover:text-muted-foreground transition-colors">
                                Verify medicine authorization via live camera or barcode image upload.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all duration-300">
                                <Link href="/dashboard/scanner">Open Scanner</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Action Card: Add Company */}
                <motion.div variants={item}>
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between h-full group hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                                <Plus className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                Add Company
                            </CardTitle>
                            <CardDescription className="text-xs group-hover:text-muted-foreground transition-colors">
                                Register a new company and its authorized medicine serial number.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all duration-300">
                                <Link href="/dashboard/companies">Manage Companies</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
