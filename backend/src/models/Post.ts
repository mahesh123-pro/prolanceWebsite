import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
}

export interface IPost extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    content: string;
    category: string;
    likes: mongoose.Schema.Types.ObjectId[];
    comments: IComment[];
}

const CommentSchema: Schema<IComment> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: [true, 'Please add a comment text'],
        },
    },
    {
        timestamps: true,
    }
);

const PostSchema: Schema<IPost> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        content: {
            type: String,
            required: [true, 'Please add some content'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        comments: [CommentSchema],
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model<IPost>('Post', PostSchema);

export { Post };
export default Post;
