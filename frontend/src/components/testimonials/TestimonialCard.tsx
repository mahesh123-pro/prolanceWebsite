import { Star } from 'lucide-react';
import { Testimonial } from '@/app/testimonials/page';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const initials = testimonial.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-lg hover:shadow-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0088ff] flex items-center justify-center text-white font-bold text-lg">
                        {initials}
                    </div>
                    <div>
                        <h4 className="text-white font-semibold text-lg">{testimonial.full_name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role} @ {testimonial.company}</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={i < testimonial.rating ? "fill-[#00d4ff] text-[#00d4ff]" : "text-gray-600"}
                        />
                    ))}
                </div>
            </div>
            <p className="text-gray-300 italic leading-relaxed">
                "{testimonial.message}"
            </p>
        </div>
    );
}
