import { Document, Schema, model, ObjectId } from "mongoose";

export type JobDocument = Document & {
    title: string;
    description: string;
    issuer: ObjectId;
    price: number;
    skills: string[];
};

const jobSchema = new Schema<JobDocument>({
    title: String,
    description: String,
    issuer: Schema.Types.ObjectId,
    price: Number,
    skills: [],
});

export const Job = model<JobDocument>("Job", jobSchema);