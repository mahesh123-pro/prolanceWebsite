import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Testimonial from './src/models/Testimonial';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prolance';

async function testFind() {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log("RESULT_START");
        console.log("MODEL_COLLECTION_NAME:", Testimonial.collection.name);

        const testimonials = await Testimonial.find();
        console.log("MODEL_FIND_COUNT:", testimonials.length);

        const raw = await mongoose.connection.db.collection(Testimonial.collection.name).find().toArray();
        console.log("RAW_FIND_COUNT:", raw.length);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("DB_COLLECTIONS:", collections.map(c => c.name).join(", "));
        console.log("RESULT_END");

    } catch (err: any) {
        console.error("Error:", err.message);
    } finally {
        await mongoose.disconnect();
    }
}

testFind();
