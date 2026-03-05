import express from 'express';
import { getPosts, createPost, likePost, addComment } from '../controllers/postController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:id/like')
    .put(protect, likePost);

router.route('/:id/comments')
    .post(protect, addComment);

export default router;
