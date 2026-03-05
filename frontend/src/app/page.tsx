import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase, Calendar, MessageSquare, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center overflow-hidden py-12 md:py-24 bg-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="container relative z-10 px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-6 bg-background/50 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Welcome to the future of networking
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Connect. Learn.<br />
              Grow Your Career.
            </h1>

            <p className="max-w-[42rem] lg:mx-0 text-lg sm:text-xl text-muted-foreground mb-10">
              The ultimate platform for students, professionals, and recruiters to discover opportunities, collaborate, and master new skills.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg transition-transform hover:scale-105" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base transition-transform hover:scale-105" asChild>
                <Link href="/jobs">
                  Explore Jobs
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden border bg-muted/20 shadow-2xl skew-y-0 lg:-skew-y-2 lg:rotate-2 group transition-all hover:skew-y-0 hover:rotate-0">
            <Image
              src="/images/hero.png"
              alt="Professionals Networking"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/40">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Everything you need in one place</h2>
            <p className="text-lg text-muted-foreground max-w-[42rem] mx-auto">
              Our comprehensive suite of tools helps you build your professional identity and accelerate your career.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-3xl border bg-background transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
              <div className="relative h-[200px] w-full overflow-hidden border-b">
                <Image
                  src="/images/jobs.png"
                  alt="Jobs and Internships"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Jobs & Internships</h3>
                <p className="text-muted-foreground flex-1">Discover top career opportunities tailored to your unique skill set and experience level.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-3xl border bg-background transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
              <div className="relative h-[200px] w-full overflow-hidden border-b">
                <Image
                  src="/images/events.png"
                  alt="Tech Events"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Tech Events</h3>
                <p className="text-muted-foreground flex-1">Join hackathons, workshops, and meetups to expand your network and learn practically.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-3xl border bg-background transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
              <div className="relative h-[200px] w-full overflow-hidden border-b">
                <Image
                  src="/images/community.png"
                  alt="Community Chat"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Community</h3>
                <p className="text-muted-foreground flex-1">Engage in vibrant discussions, ask questions, and share knowledge with peers and mentors.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative overflow-hidden rounded-3xl border bg-background transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
              <div className="relative h-[200px] w-full overflow-hidden border-b">
                <Image
                  src="/images/resources.png"
                  alt="Learning Resources"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Resources</h3>
                <p className="text-muted-foreground flex-1">Access curated learning materials, roadmaps, and tutorials to stay ahead of the curve.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
