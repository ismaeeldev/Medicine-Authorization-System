import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Company from "@/models/Company";

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch all companies sorting by newest first
        const companies = await Company.find({}).sort({ createdAt: -1 });

        return NextResponse.json(companies);
    } catch (error: any) {
        console.error("Error fetching companies:", error);
        return NextResponse.json(
            { error: "Failed to fetch companies" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, serial } = body;

        if (!name || !serial) {
            return NextResponse.json(
                { error: "Name and serial are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check for duplicate serial
        const existingCompany = await Company.findOne({ serial });
        if (existingCompany) {
            return NextResponse.json(
                { error: "A company with this serial number already exists" },
                { status: 409 }
            );
        }

        // Create the new company
        const newCompany = await Company.create({
            name,
            serial,
        });

        return NextResponse.json(newCompany, { status: 201 });
    } catch (error: any) {
        console.error("Error creating company:", error);
        return NextResponse.json(
            { error: "Failed to create company" },
            { status: 500 }
        );
    }
}
