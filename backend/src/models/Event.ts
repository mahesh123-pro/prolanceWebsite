import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    organizer: string;
    date: Date;
    time: string;
    location: string;
    isOnline: boolean;
    description: string;
    registrationLink: string;
    eventType: 'Hackathon' | 'Workshop' | 'Tech Talk' | 'Meetup';
    postedBy: mongoose.Schema.Types.ObjectId;
    attendees: mongoose.Schema.Types.ObjectId[];
}

const EventSchema: Schema<IEvent> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add an event title'],
        },
        organizer: {
            type: String,
            required: [true, 'Please add an organizer'],
        },
        date: {
            type: Date,
            required: [true, 'Please add an event date'],
        },
        time: {
            type: String,
            required: [true, 'Please add an event time'],
        },
        location: {
            type: String,
            required: [true, 'Please add an event location'],
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        registrationLink: {
            type: String,
            required: [true, 'Please provide a registration link'],
        },
        eventType: {
            type: String,
            enum: ['Hackathon', 'Workshop', 'Tech Talk', 'Meetup'],
            required: true,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        attendees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IEvent>('Event', EventSchema);
