import express from 'express';
import {
    adminLogin,
    getAdminMe,
    getStats,
    getAllUsers,
    deleteUser,
    suspendUser,
    getAllJobs,
    deleteJob,
    getAllPosts,
    deletePost,
    getAllEvents,
    deleteEvent,
} from '../controllers/adminController';
import { checkAdminAuth } from '../middleware/adminAuth';

const router = express.Router();

// ── Public ───────────────────────────────────────────────────────────────────
router.post('/login', adminLogin);

// ── Protected (admin only) ───────────────────────────────────────────────────
router.get('/me', checkAdminAuth, getAdminMe);
router.get('/stats', checkAdminAuth, getStats);

// Users
router.get('/users', checkAdminAuth, getAllUsers);
router.delete('/users/:id', checkAdminAuth, deleteUser);
router.put('/users/:id/suspend', checkAdminAuth, suspendUser);

// Jobs
router.get('/jobs', checkAdminAuth, getAllJobs);
router.delete('/jobs/:id', checkAdminAuth, deleteJob);

// Posts / Resources
router.get('/posts', checkAdminAuth, getAllPosts);
router.delete('/posts/:id', checkAdminAuth, deletePost);

// Events
router.get('/events', checkAdminAuth, getAllEvents);
router.delete('/events/:id', checkAdminAuth, deleteEvent);

export default router;
