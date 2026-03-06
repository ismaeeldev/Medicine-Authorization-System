import Link from "next/link";
import { Building2, ScanBarcode, Plus } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Company from "@/models/Company";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardClient } from "./dashboard-client"; // We will extract the client part for animations

async function getStats() {
    await connectToDatabase();
    const count = await Company.countDocuments();
    return { count };
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const { count } = await getStats();

    return <DashboardClient count={count} />;
}
