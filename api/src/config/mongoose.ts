import mongoose from "mongoose";

export const connectMongoDB = (url: string) => {
    
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
        () => {
            console.log("MongoDB running");
        },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    });
}
