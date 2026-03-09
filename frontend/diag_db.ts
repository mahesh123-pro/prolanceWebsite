import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Testimonial from './src/models/Testimonial';
import fs from 'fs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prolance';

async function testFind() {
    let out = "--- DIAGNOSTIC START ---\n";
    try {
        out += "MONGODB_URI: " + MONGODB_URI.substring(0, 20) + "...\n";
        await mongoose.connect(MONGODB_URI);

        out += "CONNECTED DB: " + mongoose.connection.name + "\n";
        out += "MODEL NAME: Testimonial\n";
        out += "COLLECTION NAME ACCORDING TO MODEL: " + Testimonial.collection.name + "\n";

        const allDocsModel = await Testimonial.find();
        out += "MODEL FIND ALL COUNT: " + allDocsModel.length + "\n";

        const col = mongoose.connection.db.collection(Testimonial.collection.name);
        const allDocsRaw = await col.find({}).toArray();
        out += "RAW FIND IN '" + Testimonial.collection.name + "' COUNT: " + allDocsRaw.length + "\n";

        const allCollections = await mongoose.connection.db.listCollections().toArray();
        out += "ALL COLLECTIONS: " + allCollections.map(c => c.name).join(", ") + "\n";

        if (allDocsRaw.length > 0) {
            out += "RAW DOC SAMPLE: " + JSON.stringify(allDocsRaw[0], null, 2) + "\n";
        }

    } catch (err: any) {
        out += "ERROR: " + err.stack + "\n";
    } finally {
        await mongoose.disconnect();
        out += "--- DIAGNOSTIC END ---\n";
        fs.writeFileSync('diag_output.txt', out, { encoding: 'utf8' });
    }
}

testFind();
