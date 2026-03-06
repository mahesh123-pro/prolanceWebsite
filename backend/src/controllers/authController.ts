import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

// Helper to send token response
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            username: user.username,
            headline: user.headline,
            profilePicture: user.profilePicture,
        },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, username, headline } = req.body;

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            const field = userExists.email === email ? 'Email' : 'Username';
            res.status(400).json({ error: `${field} already exists` });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
            username,
            headline,
        });

        sendTokenResponse(user, 201, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Please provide an email and password' });
            return;
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        sendTokenResponse(user, 200, res);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const fieldsToUpdate = { ...req.body };

        // Remove password from fields to update (should be handled by separate route)
        delete fieldsToUpdate.password;
        delete fieldsToUpdate.role;
        delete fieldsToUpdate.email;

        const user = await User.findById((req as any).user.id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // List of fields that are allowed to be updated
        const updateableFields = [
            'name', 'username', 'phoneNumber', 'dateOfBirth', 'gender', 'bio',
            'headline', 'locationDetails', 'skills', 'currentRole',
            'yearsOfExperience', 'resumeUrl', 'portfolioWebsite',
            'socialLinks', 'workPreferences', 'recoveryEmail'
        ];

        updateableFields.forEach(field => {
            if (fieldsToUpdate[field] !== undefined) {
                (user as any)[field] = fieldsToUpdate[field];
            }
        });

        await user.save();

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById((req as any).user.id);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
