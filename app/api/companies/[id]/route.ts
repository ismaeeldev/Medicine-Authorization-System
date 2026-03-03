import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Company from "@/models/Company";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const { id } = await params;

        const deletedCompany = await Company.findByIdAndDelete(id);

        if (!deletedCompany) {
            return NextResponse.json(
                { error: "Company not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Company deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting company:", error);
        return NextResponse.json(
            { error: "Failed to delete company" },
            { status: 500 }
        );
    }
}
