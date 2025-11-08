import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI?.trim();
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const connectionInstance = await mongoose.connect(mongoUri, {
            dbName: DB_NAME
        });
        console.log(`\nDB is connected Successfully!! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongo DB connection Failed", error);
        process.exit(1);
    }
};

export default connectDB;