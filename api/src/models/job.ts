import { Document, Schema, model, ObjectId } from "mongoose";
import { Price } from "../types";

export type JobDocument = Document & {
    title: string;
    description: string;
    issuer: ObjectId;
    price: Price;
    skills: string[];
    date: Date;
};

const jobSchema = new Schema<JobDocument>({
    title: String,
    description: String,
    issuer: Schema.Types.ObjectId,
    price: Schema.Types.Mixed,
    skills: [],
    date: Date
});

jobSchema.pre("save", function save(next) {
    const job = this as JobDocument;
    if (job.date) {
        return next();
    }
    job.date = new Date();
    next();
});

export const Job = model<JobDocument>("Job", jobSchema);