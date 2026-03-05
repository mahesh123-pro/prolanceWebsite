import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'guest' | 'user' | 'admin';
    googleId?: string;
    profilePicture?: string;
    bio?: string;
    location?: string;
    skills?: string[];
    education?: any[];
    experience?: any[];
    certifications?: any[];
    portfolioLinks?: string[];
    socialLinks?: {
        linkedin?: string;
        github?: string;
        website?: string;
    };
    matchPassword: (enteredPassword: string) => Promise<boolean>;
    getSignedJwtToken: () => string;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            minlength: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ['guest', 'user', 'admin'],
            default: 'user',
        },
        googleId: String,
        profilePicture: String,
        bio: String,
        location: String,
        skills: [String],
        education: [
            {
                institution: String,
                degree: String,
                fieldOfStudy: String,
                from: Date,
                to: Date,
                current: Boolean,
                description: String,
            },
        ],
        experience: [
            {
                title: String,
                company: String,
                location: String,
                from: Date,
                to: Date,
                current: Boolean,
                description: String,
            },
        ],
        certifications: [
            {
                name: String,
                issuingOrganization: String,
                date: Date,
                url: String,
            },
        ],
        portfolioLinks: [String],
        socialLinks: {
            linkedin: String,
            github: String,
            website: String,
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET as string, {
        expiresIn: (process.env.JWT_EXPIRE || '30d') as any,
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password as string);
};

export default mongoose.model<IUser>('User', UserSchema);
