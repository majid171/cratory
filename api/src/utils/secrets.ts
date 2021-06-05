import dotenv from "dotenv";

dotenv.config({path: '.env'});

export const MONGO_URL: string = `mongodb+srv://${process.env.MONGO_USERNAME as string}:${process.env.MONGO_USER_PASSWORD as string}@${process.env.MONGO_CLUSTER as string}.mongodb.net/Cratory`;
export const SESSION_SECRET: string = `${process.env.SESSION_SECRET as string}`;
export const API_PORT: string = process.env.PORT as string;
