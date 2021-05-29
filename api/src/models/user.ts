import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;

    google: string;
    facebook: string;

    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };
};

const userSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, unique: true },
    password: String,

    google: String,
    facebook: String,

    profile: {
        name: String,
        gender: String,
        location: String,
        picture: String,
    },
});

export const User = mongoose.model<UserDocument>("User", userSchema);
