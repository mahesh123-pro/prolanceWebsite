import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Testimonial from './src/models/Testimonial';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI || 'mongodb://localhost:27017/prolance';

async function test() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected');

        const newTestimonial = await Testimonial.create({
            full_name: 'John Doe',
            role: 'Developer',
            company: 'Acme',
            message: 'This is a test message that is long enough.',
            rating: 5,
            status: 'pending'
        });

        console.log('Created:', newTestimonial);
    } catch (err: any) {
        console.error('Error:', err.message);
    } finally {
        mongoose.disconnect();
    }
}

test();
