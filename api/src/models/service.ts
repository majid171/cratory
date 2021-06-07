import { Document, Schema, model } from "mongoose";

export type ServiceDocument = Document & {
    name: string;
    category: string;
    description: string;
    servicer: string;
    priceRange: string;
};

const serviceSchema = new Schema<ServiceDocument>({
    name: String,
    category: String,
    description: String,
    servicer: String,
    priceRange: String,
});

export const Service = model<ServiceDocument>("Service", serviceSchema);