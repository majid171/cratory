import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

type comparePasswordFunction = (
    storedPassword: string,
    candidatePassword: string,
    cb: (err: any, isMatch: any) => void
) => void;

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

    comparePassword: comparePasswordFunction;
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

userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, (err: mongoose.Error, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (storedPassword, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, storedPassword, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);
