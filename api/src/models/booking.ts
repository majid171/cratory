import mongoose from "mongoose";

export type BookingDocument = mongoose.Document & {
    customer: string;
    servicer: string;
    service: string;
    date: Date;
    status: string;

    address: {
        country: string;
        state: string;
        city: string;
        street: string;
        zip: string;
    };
};

const bookingSchema = new mongoose.Schema<BookingDocument>({
    customer: String,
    servicer: String,
    service: String,
    date: Date,
    status: String,

    address: {
        country: String,
        state: String,
        city: String,
        street: String,
        zip: String,
    }
});

export const Booking = mongoose.model<BookingDocument>("Booking", bookingSchema);