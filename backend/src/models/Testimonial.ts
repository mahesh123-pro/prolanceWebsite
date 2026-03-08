import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestimonial extends Document {
    full_name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
    {
        full_name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        role: {
            type: String,
            required: [true, 'Please add a role'],
        },
        company: {
            type: String,
            required: [true, 'Please add a company'],
        },
        message: {
            type: String,
            required: [true, 'Please add a message'],
            minlength: [20, 'Message must be at least 20 characters'],
        },
        rating: {
            type: Number,
            required: [true, 'Please add a rating'],
            min: 1,
            max: 5,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
