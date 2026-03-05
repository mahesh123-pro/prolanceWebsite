import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComment {
    user: mongoose.Schema.Types.ObjectId;
    text: string;
    name: string;
    avatar?: string;
    date: Date;
}

export interface IPost extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    text: string;
    name: string;
    avatar?: string;
    category: 'Web Development' | 'AI / ML' | 'Cloud' | 'Startups' | 'Career advice';
    likes: { user: mongoose.Schema.Types.ObjectId }[];
    comments: IComment[];
}

const PostSchema: Schema<IPost> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a question or title'],
        },
        text: {
            type: String,
            required: [true, 'Please add post content'],
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        category: {
            type: String,
            enum: ['Web Development', 'AI / ML', 'Cloud', 'Startups', 'Career advice'],
            required: true,
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                },
                avatar: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IPost>('Post', PostSchema);
