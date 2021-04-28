import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;

    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };
};

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, unique: true },
    
        profile: {
            name: String,
            gender: String,
            location: String,
            picture: String
        }
    },
);

export const User = mongoose.model<UserDocument>("User", userSchema);