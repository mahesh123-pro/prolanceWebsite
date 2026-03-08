import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/models/Testimonial';

// GET public approved testimonials
export async function GET() {
    try {
        await dbConnect();

        const testimonials = await Testimonial.find({ status: 'approved' }).sort({ createdAt: -1 });
        return NextResponse.json(testimonials);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST a new testimonial
export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { full_name, role, company, message, rating } = body;

        if (!full_name || !role || !company || !message || !rating) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if (message.length < 20) {
            return NextResponse.json({ error: 'Message must be at least 20 characters' }, { status: 400 });
        }

        const newTestimonial = await Testimonial.create({
            full_name,
            role,
            company,
            message,
            rating,
            status: 'pending'
        });

        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
