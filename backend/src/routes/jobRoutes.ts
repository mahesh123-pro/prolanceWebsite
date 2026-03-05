import express from 'express';
import { getJobs, createJob } from '../controllers/jobController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getJobs).post(protect, createJob);

export default router;
