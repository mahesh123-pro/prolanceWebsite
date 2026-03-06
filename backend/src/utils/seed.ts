import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../models/Job';
import User from '../models/User';
import Event from '../models/Event';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prolance');
        console.log('MongoDB Connected for seeding...');

        // Clear existing data
        await Job.deleteMany({});
        await Event.deleteMany({});

        // Find or create a seed user (admin/system)
        let adminUser = await User.findOne({ email: 'admin@prolance.com' });
        if (!adminUser) {
            adminUser = await User.create({
                name: 'Prolance Admin',
                email: 'admin@prolance.com',
                username: 'admin',
                password: 'password123', // In real app, this would be hashed
            });
        }

        const jobs = [
            {
                title: 'Senior Frontend Developer',
                company: 'InnovateTech Systems',
                location: 'Bengaluru, KA (Remote)',
                jobType: 'Full-time',
                salary: '₹18L - ₹30L L.P.A',
                description: 'Join our award-winning team to build the future of fintech using React and Next.js.',
                skillsRequired: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
                postedBy: adminUser._id,
                applicationLink: '#'
            },
            {
                title: 'UI/UX Design Intern',
                company: 'CreativeFlow Studio',
                location: 'Mumbai, MH',
                jobType: 'Internship',
                salary: '₹25k - ₹40k / month',
                description: 'Help us design beautiful interfaces for global startups. Mentorship included.',
                skillsRequired: ['Figma', 'Prototyping', 'Adobe XD'],
                postedBy: adminUser._id,
                applicationLink: '#'
            },
            {
                title: 'Backend Engineer (Node.js)',
                company: 'CloudStream Data',
                location: 'Hyderabad, TS',
                jobType: 'Full-time',
                salary: '₹15L - ₹25L L.P.A',
                description: 'Scale our data processing pipelines using Node.js, Kubernetes, and MongoDB.',
                skillsRequired: ['Node.js', 'Express', 'MongoDB', 'Docker'],
                postedBy: adminUser._id,
                applicationLink: '#'
            },
            {
                title: 'Product Manager',
                company: 'Nexus Apps',
                location: 'Pune, MH (Hybrid)',
                jobType: 'Full-time',
                salary: '₹20L - ₹35L L.P.A',
                description: 'Drive the product vision for our next-gen social platform.',
                skillsRequired: ['Product Strategy', 'Agile', 'Communication'],
                postedBy: adminUser._id,
                applicationLink: '#'
            }
        ];

        const events = [
            {
                title: 'Global Tech Summit 2026',
                description: 'A 2-day summit featuring speakers from Google, Meta, and OpenAI.',
                organizer: 'TechConnect Global',
                date: new Date('2026-03-15T10:00:00'),
                time: '10:00 AM',
                location: 'Online / Metaverse',
                type: 'Workshop',
                tags: ['AI', 'Future Tech', 'Web3'],
                attendees: [],
                createdBy: adminUser._id
            },
            {
                title: 'DevScale Bengaluru Hackathon',
                description: 'Build. Pitch. Win. A 48-hour hackathon for student developers in Bengaluru.',
                organizer: 'DevScale Community',
                date: new Date('2026-04-02T09:00:00'),
                time: '09:00 AM',
                location: 'Koramangala, Bengaluru',
                type: 'Hackathon',
                tags: ['Open Source', 'Frontend', 'Cloud'],
                attendees: [],
                createdBy: adminUser._id
            },
            {
                title: 'Career Growth & Networking',
                description: 'Master the art of networking and landing high-paying tech jobs.',
                organizer: 'CareerPath Academy',
                date: new Date('2026-03-22T14:00:00'),
                time: '02:00 PM',
                location: 'HSR Layout, Bengaluru',
                type: 'Workshop',
                tags: ['Career', 'Networking', 'Soft Skills'],
                attendees: [],
                createdBy: adminUser._id
            }
        ];

        await Job.insertMany(jobs);
        await Event.insertMany(events);

        console.log('Seed Data Inserted Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
