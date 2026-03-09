const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/prolance';

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        const indexes = await mongoose.connection.db.collection('testimonials').indexes().catch(() => []);
        console.log('Testimonial Indexes:', indexes);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

run();
