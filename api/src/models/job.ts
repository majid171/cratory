import { Document, Schema, model } from "mongoose";

export type JobDocument = Document & {
    title: string;
    description: string;
    issuer: string;
    price: number;
    skills: string[];
};

const jobSchema = new Schema<JobDocument>({
    title: String,
    description: String,
    issuer: String,
    price: Number,
    skills: [],
});

export const Job = model<JobDocument>("Job", jobSchema);