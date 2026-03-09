import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/models/Testimonial';

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.length < 15) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();

        // Get all testimonials to let admin review pending and view approved
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        return NextResponse.json(testimonials);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
