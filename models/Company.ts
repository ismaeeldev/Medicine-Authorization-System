import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
    name: string;
    serial: string;
    createdAt: Date;
}

const CompanySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a company name"],
            trim: true,
        },
        serial: {
            type: String,
            required: [true, "Please provide a serial number"],
            unique: true,
            trim: true,
            index: true, // Adding index to make searches faster
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

// Prevent mongoose from recompiling the model if it already exists
export default mongoose.models.Company ||
    mongoose.model<ICompany>("Company", CompanySchema);
