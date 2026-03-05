import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const posts = await Post.find()
            .populate('user', 'name profilePicture')
            .populate('comments.user', 'name profilePicture')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.body.user = (req as any).user.id;

        const post = await Post.create(req.body);

        res.status(201).json({
            success: true,
            data: post,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Like / Unlike post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ success: false, error: 'Post not found' });
            return;
        }

        const userId = (req as any).user.id;
        const index = post.likes.indexOf(userId);

        if (index === -1) {
            // Like
            post.likes.push(userId);
        } else {
            // Unlike
            post.likes.splice(index, 1);
        }

        await post.save();

        res.status(200).json({
            success: true,
            data: post.likes,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ success: false, error: 'Post not found' });
            return;
        }

        const newComment = {
            text: req.body.text,
            user: (req as any).user.id
        };

        post.comments.push(newComment as any);
        await post.save();

        res.status(201).json({
            success: true,
            data: post.comments,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
