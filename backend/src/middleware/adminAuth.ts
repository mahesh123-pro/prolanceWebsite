import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

/**
 * Middleware: checkAdminAuth
 * Verifies JWT and ensures the authenticated user has the 'admin' role.
 * If not authenticated or not admin → denies access with 401/403.
 */
export const checkAdminAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized – no token provided' });
        return;
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        if (user.role !== 'admin') {
            res.status(403).json({ error: 'Access denied – admin only' });
            return;
        }

        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized – invalid token' });
    }
};
