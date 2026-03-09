const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/prolance';

const schema = new mongoose.Schema({
    full_name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String, required: true, minlength: 20 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', schema);

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        const t = await Testimonial.create({
            full_name: 'Jane Doe',
            role: 'SE',
            company: 'Tech Corp',
            message: 'Share your experience (min 20 chars)...',
            rating: 5,
            status: 'pending'
        });
        console.log('Success!', t);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

run();
