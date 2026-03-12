import { Reveal } from "@/components/motion/Reveal";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl min-h-screen">
            <Reveal className="mb-12 text-center">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium mb-6 text-primary">
                    Our Story
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground inline-block">
                    Bridging the Talent Gap
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    We built Prolance because the traditional way of networking was broken. The internet didn&apos;t need another noisy social feed—it needed a streamlined hub for genuine tech talent connections.
                </p>
            </Reveal>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <Reveal className="bg-muted/30 border border-border/50 rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
                    <h2 className="text-3xl font-bold mt-0 mb-6 text-foreground">The Problem</h2>
                    <p className="text-foreground/80 leading-relaxed max-w-3xl">
                        In a rapidly evolving professional landscape, standing out and finding the right fit has never been more challenging for students and early-career developers. Resumes are often lost in algorithms, and connecting with recruiters directly feels like sending messages into a void.
                    </p>
                </Reveal>

                <Reveal delay={0.05} className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
                    <h2 className="text-3xl font-bold mt-0 mb-6 text-primary">Our Mission</h2>
                    <p className="text-foreground/80 leading-relaxed max-w-3xl">
                        To democratize access to tech career opportunities by providing a unified, community-driven platform where raw talent meets demand. We believe in growth through meaningful networking, continuous practical learning, and unwavering community support. Prolance empowers you to showcase your real capabilities securely.
                    </p>
                </Reveal>

                <Reveal delay={0.1} className="bg-muted/30 border border-border/50 rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
                    <h2 className="text-3xl font-bold mt-0 mb-6 text-foreground">Why Prolance?</h2>
                    <p className="text-foreground/80 leading-relaxed max-w-3xl mb-0">
                        Unlike traditional general-purpose networking sites, Prolance is tailored exclusively for developers, designers, product managers, and the startups looking to hire them. We focus deeply on curated matching, verifiable skill validation, and active community engagement. Whether you are hunting for a summer internship, executing a freelance gig, or accepting your first full-time role, Prolance is architected to accelerate your professional journey with precision.
                    </p>
                </Reveal>
            </div>
        </div>
    );
}
