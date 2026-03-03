import { CompanyClient } from "./company-client";

export const dynamic = 'force-dynamic';

export default function CompaniesPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-1">
                    Company Management
                </h2>
                <p className="text-muted-foreground text-sm">
                    Register new companies and manage existing authorized medicine serials.
                </p>
            </div>

            <CompanyClient />
        </div>
    );
}
