import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Job from '../models/Job';
import { Post } from '../models/Post';
import Event from '../models/Event';

// ────────────────────────────────────────────────────────────────────────────
// STATS / ANALYTICS
// ────────────────────────────────────────────────────────────────────────────

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
export const getStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const [totalUsers, totalJobs, totalPosts, totalEvents, internships] = await Promise.all([
            User.countDocuments({ role: { $ne: 'admin' } }),
            Job.countDocuments(),
            Post.countDocuments(),
            Event.countDocuments(),
            Job.countDocuments({ jobType: 'Internship' }),
        ]);

        // User growth – last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        const userGrowth = await User.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo }, role: { $ne: 'admin' } } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ]);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedGrowth = userGrowth.map((item) => ({
            month: monthNames[item._id.month - 1],
            users: item.count,
        }));

        // Job growth – last 6 months
        const jobGrowth = await Job.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ]);

        const formattedJobGrowth = jobGrowth.map((item) => ({
            month: monthNames[item._id.month - 1],
            jobs: item.count,
        }));

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalJobs,
                totalPosts,
                totalEvents,
                internships,
                userGrowth: formattedGrowth,
                jobGrowth: formattedJobGrowth,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// ────────────────────────────────────────────────────────────────────────────
// USER MANAGEMENT
// ────────────────────────────────────────────────────────────────────────────

// @desc    Get all users (paginated, searchable)
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const search = (req.query.search as string) || '';

        const query: any = {
            role: { $ne: 'admin' },
        };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } },
            ];
        }

        const [users, total] = await Promise.all([
            User.find(query)
                .select('-password')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            User.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: users,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Admin
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.role === 'admin') {
            res.status(403).json({ error: 'Cannot delete another admin' });
            return;
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Suspend / unsuspend a user (toggle role between 'user' and 'guest')
// @route   PUT /api/admin/users/:id/suspend
// @access  Admin
export const suspendUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.role === 'admin') {
            res.status(403).json({ error: 'Cannot suspend another admin' });
            return;
        }

        user.role = user.role === 'guest' ? 'user' : 'guest';
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.role === 'guest' ? 'suspended' : 'unsuspended'} successfully`,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// ────────────────────────────────────────────────────────────────────────────
// JOB MANAGEMENT
// ────────────────────────────────────────────────────────────────────────────

// @desc    Get all jobs (paginated, filterable)
// @route   GET /api/admin/jobs
// @access  Admin
export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const search = (req.query.search as string) || '';
        const jobType = (req.query.jobType as string) || '';

        const query: any = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
            ];
        }
        if (jobType) {
            query.jobType = jobType;
        }

        const [jobs, total] = await Promise.all([
            Job.find(query)
                .populate('postedBy', 'name email username')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Job.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: jobs,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a job
// @route   DELETE /api/admin/jobs/:id
// @access  Admin
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            res.status(404).json({ error: 'Job not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// ────────────────────────────────────────────────────────────────────────────
// RESOURCE / POST MANAGEMENT
// ────────────────────────────────────────────────────────────────────────────

// @desc    Get all posts/resources (paginated)
// @route   GET /api/admin/posts
// @access  Admin
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const search = (req.query.search as string) || '';

        const query: any = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ];
        }

        const [posts, total] = await Promise.all([
            Post.find(query)
                .populate('user', 'name email username')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Post.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: posts,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a post/resource
// @route   DELETE /api/admin/posts/:id
// @access  Admin
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// ────────────────────────────────────────────────────────────────────────────
// EVENT MANAGEMENT
// ────────────────────────────────────────────────────────────────────────────

// @desc    Get all events (paginated)
// @route   GET /api/admin/events
// @access  Admin
export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const search = (req.query.search as string) || '';

        const query: any = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { organizer: { $regex: search, $options: 'i' } },
            ];
        }

        const [events, total] = await Promise.all([
            Event.find(query)
                .populate('postedBy', 'name email username')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Event.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: events,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/admin/events/:id
// @access  Admin
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Admin login (validates role=admin, returns JWT)
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Please provide email and password' });
            return;
        }

        const user = await User.findOne({ email, role: 'admin' }).select('+password');

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials or not an admin account' });
            return;
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                username: user.username,
            },
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get admin profile
// @route   GET /api/admin/me
// @access  Admin
export const getAdminMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const admin = await User.findById((req as any).user.id).select('-password');
        res.status(200).json({ success: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
