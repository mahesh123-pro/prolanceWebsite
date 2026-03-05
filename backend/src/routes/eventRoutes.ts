import express from 'express';
import { getEvents, getEvent, createEvent, registerForEvent } from '../controllers/eventController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(getEvents)
    .post(protect, createEvent);

router.route('/:id')
    .get(getEvent);

router.route('/:id/register')
    .put(protect, registerForEvent);

export default router;
