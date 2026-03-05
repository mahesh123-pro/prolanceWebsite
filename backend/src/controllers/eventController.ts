import { Request, Response, NextFunction } from 'express';
import Event from '../models/Event';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const events = await Event.find().populate('createdBy', 'name profilePicture');
        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name profilePicture').populate('attendees', 'name profilePicture');

        if (!event) {
            res.status(404).json({ success: false, error: 'Event not found' });
            return;
        }

        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Add user to req.body
        req.body.createdBy = (req as any).user.id;

        const event = await Event.create(req.body);

        res.status(201).json({
            success: true,
            data: event,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Register for event
// @route   PUT /api/events/:id/register
// @access  Private
export const registerForEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({ success: false, error: 'Event not found' });
            return;
        }

        // Check if user already registered
        if (event.attendees.includes((req as any).user.id)) {
            res.status(400).json({ success: false, error: 'User already registered for this event' });
            return;
        }

        event.attendees.push((req as any).user.id);
        await event.save();

        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
