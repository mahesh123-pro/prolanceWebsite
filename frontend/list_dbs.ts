import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import fs from 'fs';

const MONGODB_URI = "mongodb+srv://maheshkumar69:Mahesh%406302@prolance.pt8tpob.mongodb.net/?appName=prolance";

async function listDBs() {
    try {
        const client = await mongoose.connect(MONGODB_URI);
        const admin = mongoose.connection.getClient().db().admin();
        const dbs = await admin.listDatabases();

        let out = "Databases on cluster:\n" + JSON.stringify(dbs.databases, null, 2) + "\n";

        for (const dbInfo of dbs.databases) {
            const dbName = dbInfo.name;
            const db = mongoose.createConnection(MONGODB_URI.replace(".net/", ".net/" + dbName));
            await db.asPromise();
            const collections = await db.db.listCollections().toArray();
            out += "Collections in " + dbName + ": " + collections.map(c => c.name).join(", ") + "\n";

            if (collections.some(c => c.name === 'testimonials')) {
                const count = await db.db.collection('testimonials').countDocuments();
                out += "  testimonials count in " + dbName + ": " + count + "\n";
            }
            await db.close();
        }

        fs.writeFileSync('db_list.txt', out);
    } catch (err: any) {
        fs.writeFileSync('db_list.txt', "Error: " + err.stack);
    } finally {
        await mongoose.disconnect();
    }
}

listDBs();
