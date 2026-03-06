import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'guest' | 'user' | 'admin';
    googleId?: string;
    username: string;
    headline?: string;
    profilePicture?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
    bio?: string;
    locationDetails?: {
        country?: string;
        state?: string;
        city?: string;
        postalCode?: string;
        address?: string;
    };
    skills?: string[];
    currentRole?: string;
    yearsOfExperience?: number;
    resumeUrl?: string;
    portfolioWebsite?: string;
    socialLinks?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        website?: string;
    };
    workPreferences?: {
        availableForWork?: boolean;
        workType?: ('Freelance' | 'Full-time' | 'Part-time' | 'Remote')[];
        hourlyRate?: number;
    };
    recoveryEmail?: string;
    education?: {
        institution?: string;
        degree?: string;
        fieldOfStudy?: string;
        from?: Date;
        to?: Date;
        current?: boolean;
        description?: string;
    }[];
    experience?: {
        title?: string;
        company?: string;
        location?: string;
        from?: Date;
        to?: Date;
        current?: boolean;
        description?: string;
    }[];
    certifications?: {
        name?: string;
        issuingOrganization?: string;
        date?: Date;
        url?: string;
    }[];
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
        username: {
            type: String,
            required: [true, 'Please add a username'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters'],
        },
        headline: {
            type: String,
            maxlength: [100, 'Headline cannot exceed 100 characters'],
        },
        profilePicture: String,
        phoneNumber: String,
        dateOfBirth: Date,
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        },
        bio: String,
        locationDetails: {
            country: String,
            state: String,
            city: String,
            postalCode: String,
            address: String,
        },
        skills: [String],
        currentRole: String,
        yearsOfExperience: Number,
        resumeUrl: String,
        portfolioWebsite: String,
        socialLinks: {
            linkedin: String,
            github: String,
            twitter: String,
            website: String,
        },
        workPreferences: {
            availableForWork: {
                type: Boolean,
                default: false,
            },
            workType: {
                type: [String],
                enum: ['Freelance', 'Full-time', 'Part-time', 'Remote'],
            },
            hourlyRate: Number,
        },
        recoveryEmail: String,
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
