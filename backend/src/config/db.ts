import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/prolance';

// Variable to cache the connection
let isConnected = false;

const connectDB = async () => {
    // If already connected, use the existing connection
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);
        isConnected = !!conn.connections[0].readyState;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
        // In serverless environment like Vercel, we don't want to process.exit(1)
        // as it would kill the function instance entirely.
    }
};

export default connectDB;
