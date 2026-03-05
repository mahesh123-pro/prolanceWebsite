import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IJob extends Document {
    title: string;
    company: string;
    location: string;
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
    skillsRequired: string[];
    salary?: string;
    applyLink: string;
    description: string;
    postedBy: mongoose.Schema.Types.ObjectId;
}

const JobSchema: Schema<IJob> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a job title'],
        },
        company: {
            type: String,
            required: [true, 'Please add a company name'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
            required: [true, 'Please specify the job type'],
        },
        skillsRequired: [
            {
                type: String,
                required: true,
            },
        ],
        salary: {
            type: String,
        },
        applyLink: {
            type: String,
            required: [true, 'Please provide an application link'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IJob>('Job', JobSchema);
