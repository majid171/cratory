import mongoose, { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt-nodejs";
import { Address, Name } from "../types";
import {ServiceDocument} from "./service";

type comparePasswordFunction = (
    storedPassword: string,
    candidatePassword: string,
    cb: (err: any, isMatch: any) => void
) => void;

export type UserDocument = Document & {
    name: Name;
    password: string
    email: string;
    phone: string;
    address: Address;
    google: string;
    facebook: string;
    services: ServiceDocument[];

    comparePassword: comparePasswordFunction;
};

const userSchema = new Schema<UserDocument>({
    name: { type: Schema.Types.Mixed },
    password: String,
    email: { type: String, unique: true },
    phone: String,
    address: { type: Schema.Types.Mixed },
    google: String,
    facebook: String,
    services: {type: Schema.Types.Array}
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

export const User = model<UserDocument>("User", userSchema);
