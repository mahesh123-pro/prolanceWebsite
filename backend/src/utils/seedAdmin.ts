/**
 * Admin Seed Script
 * Run with: npm run seed:admin
 *
 * Creates (or upgrades) the admin user in MongoDB.
 * Uses findOne + direct password change so the bcrypt pre-save hook fires.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import User from '../models/User';

const ADMIN_EMAIL = 'kolim5263@gmail.com';
const ADMIN_PASSWORD = 'Mahesh@6302';
const ADMIN_NAME = 'Mahesh';
const ADMIN_USERNAME = 'mahesh_admin_kolim';

async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✅  Connected to MongoDB');

        const existing = await User.findOne({ email: ADMIN_EMAIL }).select('+password');

        if (existing) {
            // Hash password manually (bypassing validation issues with partial saves)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

            await User.findByIdAndUpdate(
                existing._id,
                {
                    $set: {
                        role: 'admin',
                        password: hashedPassword,
                        name: ADMIN_NAME,
                    },
                },
                { runValidators: false }
            );
            console.log(`✅  Admin user updated → role: 'admin', email: ${ADMIN_EMAIL}`);
        } else {
            // Create fresh admin
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

            await User.create({
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: hashedPassword,
                username: ADMIN_USERNAME,
                role: 'admin',
            });
            console.log(`✅  Admin user created: ${ADMIN_EMAIL}`);
        }
    } catch (err) {
        console.error('❌  Seed error:', err);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌  Disconnected from MongoDB');
    }
}

seedAdmin();
