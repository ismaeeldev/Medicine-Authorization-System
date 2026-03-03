import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Company from "@/models/Company";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const serial = searchParams.get("serial");

        if (!serial) {
            return NextResponse.json(
                { error: "Serial number is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const company = await Company.findOne({ serial });

        if (company) {
            return NextResponse.json({
                authorized: true,
                companyName: company.name,
            });
        } else {
            return NextResponse.json({
                authorized: false,
            });
        }
    } catch (error: any) {
        console.error("Error verifying serial:", error);
        return NextResponse.json(
            { error: "Failed to verify serial" },
            { status: 500 }
        );
    }
}
