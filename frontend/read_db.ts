import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import fs from 'fs';
const MONGODB_URI = "mongodb+srv://maheshkumar69:Mahesh%406302@prolance.pt8tpob.mongodb.net/?appName=prolance";
async function readDocs() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    let out = "collections: " + collections.map(c => c.name).join(", ") + "\n";

    // Check multiple possible collection names
    const testimonials1 = await db.collection('testimonials').find().toArray();
    out += "testimonials count: " + testimonials1.length + "\n";
    out += "testimonials snippets: " + JSON.stringify(testimonials1.slice(0, 2), null, 2) + "\n";

    const testimonials2 = await db.collection('Testimonial').find().toArray();
    out += "Testimonial count: " + testimonials2.length + "\n";

    await mongoose.disconnect();
    fs.writeFileSync('output.txt', out);
}

readDocs().catch(console.error);
