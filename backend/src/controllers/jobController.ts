import { Request, Response, NextFunction } from 'express';
import Job from '../models/Job';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const jobs = await Job.find().populate('postedBy', 'name profilePicture');
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Add user to req.body
        req.body.postedBy = (req as any).user.id;

        const job = await Job.create(req.body);

        res.status(201).json({
            success: true,
            data: job,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
