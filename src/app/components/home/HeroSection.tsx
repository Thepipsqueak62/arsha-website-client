"use client"

import { useEffect, useState, useMemo } from "react";
import {
    ArrowRight,
    Sparkles,
    Rocket,
    Zap,
    Users,
    Code,
    ShieldCheck,
    Clock,
    ChevronRight,
    Star,
    CheckCircle,
    Play,
    Heart,
    Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    // Simplified scroll handler
    // @ts-ignore
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            }
        };

        // Initial visibility
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);

        // Debounced scroll listener
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        let timeoutId: NodeJS.Timeout;
        const debouncedScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 50);
        };

        window.addEventListener("scroll", debouncedScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", debouncedScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    // Memoize static data
    const features = useMemo(() => [
        { icon: Zap, title: "Lightning Fast", description: "Lighting fast Social Media Platform for gamers", color: "from-yellow-500 to-orange-500" },
        { icon: Zap, title: "Lightning Fast", description: "Lighting fast Social Media Platform for gamers", color: "from-yellow-500 to-orange-500" },
        { icon: Zap, title: "Lightning Fast", description: "Lighting fast Social Media Platform for gamers", color: "from-yellow-500 to-orange-500" },
        { icon: Zap, title: "Lightning Fast", description: "Lighting fast Social Media Platform for gamers", color: "from-yellow-500 to-orange-500" },
        { icon: Zap, title: "Lightning Fast", description: "Lighting fast Social Media Platform for gamers", color: "from-yellow-500 to-orange-500" },
        { icon: Zap, title: "Lightning Fast", description: "Lighting fast Social Media Platform for gamers", color: "from-yellow-500 to-orange-500" },
    ], []);

    const testimonials = useMemo(() => [
        { name: "Alex Johnson", role: "Valorant Pro Player", content: "I Love Valorant", avatar: "AJ", rating: 5 },
        { name: "Peter John", role: "Valorant Pro Player", content: "I Love Valorant", avatar: "AJ", rating: 5 },
        { name: "Iris Chan", role: "Valorant Pro Player", content: "I Love Valorant", avatar: "AJ", rating: 5 },
    ], []);

    const stats = useMemo(() => [
        { value: "10K+", label: "Active Users", icon: Users },
        { value: "500K$", label: "In Prizes Won", icon: Rocket },
        { value: "Secure Platform", label: "Security", icon: ShieldCheck },
        { value: "24/7", label: "Support", icon: Clock },
    ], []);

    const techStack = useMemo(() => [
        { name: "React", color: "text-blue-500" },
        { name: "TypeScript", color: "text-blue-600" },
        { name: "Tailwind CSS", color: "text-cyan-500" },
        { name: "Node.js", color: "text-green-500" },
        { name: "PostgreSQL", color: "text-blue-700" },
        { name: "Redis", color: "text-red-600" },
        { name: "Docker", color: "text-blue-400" },
        { name: "AWS", color: "text-orange-500" },
    ], []);

    return (
        <div className="relative overflow-hidden bg-background">
            {/* SIMPLE STATIC BACKGROUND - No animations */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-background via-background to-muted/10" />

            {/* Optional: Very subtle static gradient dots - remove if still heavy */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none"
                 style={{
                     backgroundImage: `radial-gradient(circle at 25% 25%, rgb(59 130 246 / 20%) 0px, transparent 1px),
                                       radial-gradient(circle at 75% 75%, rgb(168 85 247 / 20%) 0px, transparent 1px)`,
                     backgroundSize: '80px 80px',
                 }}
            />

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
                <div className="max-w-7xl mx-auto text-center">
                    <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                            <Sparkles className="w-4 h-4 mr-2" />
                            New: Platform for Gamers by Gamers
                        </Badge>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 py-3">
                                Built for the future of competitive Gaming
                            </span>

                        </h1>

                        <p className="mt-6 text-xl sm:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                            The ultimate platform for competitive gaming and collaborations. build your profile today
                            and show the world what you're made of
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="group px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                                Sign Up Today
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            <Button size="lg" variant="outline" className="group px-8 py-6 text-lg border-2 hover:border-primary transition-colors duration-300">
                                <Play className="w-5 h-5 mr-2" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats Badges */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {stats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Icon className="w-5 h-5 text-primary" />
                                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                        </div>
                                        <div className="mt-2 text-sm text-foreground/60">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <Badge variant="outline" className="mb-4 px-4 py-2">
                            <Zap className="w-4 h-4 mr-2" />
                            We are different
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                            Everything you need to{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                succeed
                            </span>
                        </h2>
                        <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
                            Packed with features designed to help you build your own competitive profile
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const delayClass = `delay-[${index * 100}ms]`;
                            return (
                                <div
                                    key={feature.title}
                                    className={`group transition-all duration-500 ease-out hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${delayClass}`}
                                >
                                    <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-2xl">
                                        <CardContent className="p-8">
                                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-foreground/70 mb-6">{feature.description}</p>
                                            <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all duration-300">
                                                Learn more
                                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="relative z-10 py-20 bg-gradient-to-b from-background to-muted/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <Badge variant="outline" className="mb-4 px-4 py-2">
                            <Code className="w-4 h-4 mr-2" />
                            Built With Modern Tech
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                            Powered by the{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                Best in Class
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols- gap-4 mb-12 ">
                        {techStack.map((tech, index) => {
                            const delayClass = `delay-[${index * 50}ms]`;
                            return (
                                <div
                                    key={tech.name}
                                    className={`group relative p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${delayClass}`}
                                >
                                    <div className="relative text-center">
                                        <div className={`text-2xl font-bold ${tech.color}`}>{tech.name}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <Badge variant="outline" className="mb-4 px-4 py-2">
                            <Heart className="w-4 h-4 mr-2" />
                            Loved by Teams
                        </Badge>
                        <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                            Trusted by{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                Pro Players
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => {
                            const delayClass = `delay-[${index * 200}ms]`;
                            return (
                                <Card
                                    key={testimonial.name}
                                    className={`bg-background/50 backdrop-blur-sm border-border/50 transition-all duration-500 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${delayClass}`}
                                >
                                    <CardContent className="p-8">
                                        <div className="flex items-center mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {testimonial.avatar}
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                                <p className="text-foreground/60 text-sm">{testimonial.role}</p>


                                            </div>
                                        </div>
                                        <p className="text-foreground/80 mb-4 italic">"{testimonial.content}"</p>
                                        <div className="flex">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-border/50 p-8 sm:p-12 text-center transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-98'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            Are you up for the challenge?{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Sign Up Today
                            </span>
                        </h2>
                        <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
                            Join thousands of players already competing in tournaments today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="group px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                                Sign Up Today
                                <Rocket className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            </Button>
                            <Button size="lg" variant="outline" className="group px-8 py-6 text-lg border-2 hover:border-primary transition-colors duration-300">
                                Contact Us
                                <Calendar className="ml-3 w-5 h-5" />
                            </Button>
                        </div>

                        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-foreground/60">
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                No credit card required
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                14-day free trial
                            </div>
                            <div className="flex items-center">
                                <ShieldCheck className="w-4 h-4 mr-2 text-purple-500" />
                                Cancel anytime
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}