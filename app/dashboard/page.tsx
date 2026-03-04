import Link from "next/link";
import { Building2, ScanBarcode, Plus } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Company from "@/models/Company";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getStats() {
    await connectToDatabase();
    const count = await Company.countDocuments();
    return { count };
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const { count } = await getStats();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-1">
                    Dashboard Overview
                </h2>
                <p className="text-muted-foreground text-sm">
                    Welcome to Medico System. Manage medicine authorizations and company registrations.
                </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stat Card */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-primary/50 transition-colors duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Companies
                        </CardTitle>
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
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

                {/* Action Card: Scanner */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ScanBarcode className="h-5 w-5 text-primary" />
                            Scan Product
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Verify medicine authorization via live camera or barcode image upload.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 transition-all duration-300">
                            <Link href="/dashboard/scanner">Open Scanner</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Action Card: Add Company */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Plus className="h-5 w-5 text-primary" />
                            Add Company
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Register a new company and its authorized medicine serial number.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 transition-all duration-300">
                            <Link href="/dashboard/companies">Manage Companies</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
