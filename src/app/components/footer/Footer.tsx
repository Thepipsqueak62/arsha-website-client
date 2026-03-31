"use client"
import {
    Mail,

    ExternalLink,
    ArrowRight,
    Heart,
    Sparkles,
    Globe,
    Shield,
    Rocket,
    Users,
    Star,
    Zap,
    Palette,
    ArrowUp
} from "lucide-react";

import {FaTwitch, FaTwitter, FaYoutube} from "react-icons/fa"

import React, { useState, useMemo } from "react";
import Link from "next/link";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log("Subscribed:", email);
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const socialLinks = useMemo(() => [
        { icon: FaYoutube, href: "https://github.com/auroraproject", label: "YouTube", color: "hover:bg-red-900", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" },
        { icon: FaTwitter, href: "https://twitter.com/auroraproject", label: "Twitter", color: "hover:bg-blue-500", glow: "hover:shadow-[0_0_20px_rgba(29,161,242,0.4)]" },
        { icon: FaTwitch, href: "https://twitch.tv/auroraproject", label: "Twitch", color: "hover:bg-purple-600", glow: "hover:shadow-[0_0_20px_rgba(145,70,255,0.4)]" },
        { icon: Mail, href: "mailto:contact@projariel.com", label: "Email", color: "hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500", glow: "hover:shadow-[0_0_20px_rgba(255,87,34,0.4)]" },
    ], []);

    const quickLinks = useMemo(() => [
        { to: "/", label: "Home", icon: Rocket },
        { to: "/news", label: "News", icon: Sparkles },
        { to: "/explore", label: "Explore", icon: Globe },
        { to: "/community", label: "Community", icon: Users },
        { to: "/features", label: "Features", icon: Zap },
        { to: "/gallery", label: "Gallery", icon: Palette },
    ], []);

    const resourceLinks = useMemo(() => [
        { to: "/about", label: "About Us", icon: Users },
        { to: "/privacy", label: "Privacy Policy", icon: Shield },
        { to: "/terms", label: "Terms of Service", icon: Shield },
        { to: "/contact", label: "Contact Us", icon: Mail },
        { to: "/docs", label: "Documentation", icon: ExternalLink },
        { to: "/support", label: "Support", icon: Heart },
    ], []);

    // Create memoized particle styles to avoid inline style props
    const particleStyles = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            style: {
                // eslint-disable-next-line react-hooks/purity
                left: `${Math.random() * 100}%`,
                // eslint-disable-next-line react-hooks/purity
                top: `${Math.random() * 100}%`,
                // eslint-disable-next-line react-hooks/purity
                animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
                // eslint-disable-next-line react-hooks/purity
                animationDelay: `${Math.random() * 5}s`
            }
        }));
    }, []);

    return (
        <footer className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300 overflow-hidden border-t border-gray-800/50">
            {/* Animated Background Elements - FIXED: Remove problematic style props */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5 bg-grid-pattern" />

                {/* Animated Orbs - Use CSS classes instead of inline styles */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 right-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />

                {/* Floating Particles - Use separate component or memoized styles */}
                {particleStyles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-white/30 rounded-full floating-particle"
                        style={particle.style}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
                    {/* Brand & Description */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:shadow-purple-500/40 transition-all duration-500 group-hover:scale-105">
                                    <span className="text-white font-bold text-2xl">PPH</span>
                                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin animation-duration-3000" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                        Project- Purple Haze
                                    </span>
                                </h2>
                                <p className="text-lg text-gray-400 mt-2">Redefining Digital Experiences</p>
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-lg max-w-2xl">
                            We're pioneering the next generation of competitive e-sports gamers we are the future of
                            competitive gaming. we stand with gamers for gamers
                        </p>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <p className="text-gray-400 font-medium">Follow Our Journey</p>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map(({ icon: Icon, href, label, color, glow }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                            relative group flex items-center gap-2 px-4 py-3 
                                            bg-gray-900/50 backdrop-blur-sm rounded-xl 
                                            border border-gray-800 hover:border-transparent
                                            transition-all duration-300 hover:scale-105
                                            ${color} ${glow}
                                        `}
                                    >
                                        <Icon size={18} className="text-gray-400 group-hover:text-white" />
                                        <span className="text-sm font-medium">{label}</span>
                                        <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Newsletter & Quick Links */}
                    <div className="space-y-8">
                        {/* Newsletter */}
                        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-blue-400" />
                                <h3 className="text-xl font-bold text-white">Stay Updated</h3>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Get exclusive updates, early access, and insider insights delivered to your inbox.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                                    >
                                        {subscribed ? 'Subscribed!' : 'Subscribe'}
                                        <ArrowRight size={16} className={subscribed ? 'hidden' : 'block'} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                                </p>
                            </form>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">10K+</div>
                                <div className="text-xs text-gray-400 mt-1">Active Users</div>
                            </div>
                            <div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">500+</div>
                                <div className="text-xs text-gray-400 mt-1">Accounts Created</div>
                            </div>
                            <div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">20</div>
                                <div className="text-xs text-gray-400 mt-1">Tournaments to date</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Quick Links */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Rocket className="w-5 h-5 text-blue-400" />
                            <h3 className="text-lg font-bold text-white">Quick Links</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {quickLinks.map(({ to, label, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={to}
                                    className="group flex items-center gap-3 p-3 rounded-lg bg-gray-900/30 hover:bg-gray-800/50 border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300"
                                >
                                    <Icon size={16} className="text-gray-500 group-hover:text-blue-400" />
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">
                                        {label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-bold text-white">Resources</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {resourceLinks.map(({ to, label, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={to}
                                    className="group flex items-center gap-3 p-3 rounded-lg bg-gray-900/30 hover:bg-gray-800/50 border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300"
                                >
                                    <Icon size={16} className="text-gray-500 group-hover:text-purple-400" />
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">
                                        {label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider with Gradient */}
                <div className="relative my-12">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="px-6 bg-gradient-to-r from-transparent via-gray-900 to-transparent">
                            <Star className="w-6 h-6 text-blue-400 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">PA</span>
                            </div>
                            <div>
                                <p className="text-gray-400">
                                    © {new Date().getFullYear()} <span className="font-semibold text-white">project-purplehaze</span>. All rights reserved.
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Made with <Heart className="inline w-3 h-3 text-red-500 fill-current" /> worldwide
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-800/30 text-sm font-medium text-blue-300">
                            🚀 Production Ready
                        </div>
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-800/30 text-sm font-medium text-purple-300">
                            🔐 Secure & Reliable
                        </div>
                    </div>

                    {/* Back to Top */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300"
                    >
                        <span className="text-sm text-gray-400 group-hover:text-white">Back to Top</span>
                        <ArrowUp size={14} className="text-gray-500 group-hover:text-blue-400 rotate-90" />
                    </button>
                </div>
            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110 group">
                <span className="text-white font-bold">💬</span>
                <div className="absolute -top-12 right-0 px-3 py-2 bg-gray-900 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Need help? Chat with us
                </div>
            </button>
        </footer>
    );
};

export default Footer;