import { ScannerClient } from "./scanner-client";

export default function ScannerPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-1">
                    Product Authorization Scanner
                </h2>
                <p className="text-muted-foreground text-sm">
                    Scan the barcode on the medicine packaging to verify its authenticity and registration.
                </p>
            </div>

            <ScannerClient />
        </div>
    );
}
