"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Home,
    Menu,
    X,
    Info,
    Newspaper,
    Globe,
    Contact,
    User,
    LogOut,
    UserCircle,
    LayoutDashboard,
    ChevronDown,
    Settings,
    HelpCircle,
    Search,
    History,
    TrendingUp,
    BookOpen,
    FileText,
    ChevronRight,
    Shield,
    type LucideIcon,
} from "lucide-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform, Variants,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/dark-mode-toggle";

// ─── Route Paths ─────────────────────────────────────────────────────────────
const ROUTE_PATHS = {
    PUBLIC: {
        MAINPAGE: "/",
        ABOUT: "/about",
        FEATURES: "/features",
        CONTACT: "/contact",
        PRIVACY: "/privacy",
    },
    AUTH: {
        SIGN_IN: "/auth/login",
        SIGN_UP: "/auth/register",
    },
    APP: {
        DASHBOARD: "/dashboard",
        PROFILE: "/profile",
        SETTINGS: "/settings",
    },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type NavigationItem = {
    path: string;
    label: string;
    icon: LucideIcon;
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const navbarVariants:Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 },
    },
};

const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 + i * 0.06, duration: 0.35, ease: "easeOut" },
    }),
};

const dropdownVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -8 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -8,
        transition: { duration: 0.15 },
    },
};

const mobileMenuVariants:Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: { duration: 0.25, ease: "easeInOut" },
    },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const mobileNavItemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
    }),
};

const searchOverlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

const searchPanelVariants: Variants = {
    hidden: { opacity: 0, y: -24, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 320, damping: 28 },
    },
    exit: {
        opacity: 0,
        y: -16,
        scale: 0.98,
        transition: { duration: 0.15 },
    },
};

const resultItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.04, duration: 0.25 },
    }),
};

// ─── Mock Search Data ─────────────────────────────────────────────────────────
const mockSearchResults = [
    { id: 1, title: "Getting Started Guide", category: "Documentation", path: "/docs/getting-started", icon: BookOpen },
    { id: 2, title: "Project Profile", category: "Features", path: "/features/profile", icon: LayoutDashboard },
    { id: 3, title: "Team Collaboration", category: "Features", path: "/features/team", icon: Globe },
    { id: 4, title: "API Documentation", category: "Documentation", path: "/docs/api", icon: FileText },
    { id: 5, title: "Recent Updates", category: "Blog", path: "/blog/updates", icon: Newspaper },
    { id: 6, title: "Contact Support", category: "Help", path: "/contact", icon: Contact },
    { id: 7, title: "Privacy Policy", category: "Legal", path: "/privacy", icon: Shield },
    { id: 8, title: "User Settings", category: "Account", path: "/settings", icon: Settings },
];

const mockRecentSearches = ["profile setup", "team management", "API integration", "project templates"];

// ─── Search Overlay ───────────────────────────────────────────────────────────
const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<typeof mockSearchResults>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        setShowResults(true);
        setTimeout(() => {
            setSearchResults(
                mockSearchResults.filter(
                    (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setIsLoading(false);
        }, 300);
    };

    const handleQuickSearch = (query: string) => {
        setSearchQuery(query);
        setSearchResults(
            mockSearchResults.filter(
                (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.category.toLowerCase().includes(query.toLowerCase())
            )
        );
        setShowResults(true);
    };

    const handleResultClick = (path: string) => {
        router.push(path);
        onClose();
        setSearchQuery("");
        setShowResults(false);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setShowResults(false);
    };

    // @ts-ignore
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={searchOverlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 bg-background/95 backdrop-blur-md z-50"
                    onClick={onClose}
                >
                    <div className="container mx-auto px-4 pt-20">
                        <motion.div
                            variants={searchPanelVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-3xl mx-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Search Input */}
                            <form onSubmit={handleSearch} className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" size={24} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        e.target.value.length > 0 ? handleQuickSearch(e.target.value) : setShowResults(false);
                                    }}
                                    placeholder="Search teams, tournaments, players..."
                                    className="w-full pl-16 pr-24 py-5 bg-background rounded-2xl border-2 border-border/50 shadow-2xl text-lg focus:outline-none focus:border-primary transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <AnimatePresence>
                                        {searchQuery && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                type="button"
                                                onClick={clearSearch}
                                                className="px-3 py-1 text-sm text-foreground/60 hover:text-foreground bg-muted/50 rounded-lg transition-colors"
                                            >
                                                Clear
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                                        Esc
                                    </button>
                                </div>
                            </form>

                            {/* Results */}
                            <div className="mt-6">
                                <AnimatePresence mode="wait">
                                    {showResults ? (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            className="bg-background rounded-xl border border-border/50 shadow-xl overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-border/30">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-foreground/80">
                                                        {isLoading ? "Searching..." : `Results (${searchResults.length})`}
                                                    </h3>
                                                    {searchQuery && <span className="text-sm text-foreground/60">"{searchQuery}"</span>}
                                                </div>
                                            </div>
                                            {isLoading ? (
                                                <div className="p-8 text-center">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                                        className="inline-block rounded-full h-8 w-8 border-b-2 border-primary"
                                                    />
                                                    <p className="mt-3 text-foreground/60">Searching...</p>
                                                </div>
                                            ) : searchResults.length > 0 ? (
                                                <div className="divide-y divide-border/30">
                                                    {searchResults.map((result, i) => {
                                                        const Icon = result.icon;
                                                        return (
                                                            <motion.button
                                                                key={result.id}
                                                                custom={i}
                                                                variants={resultItemVariants}
                                                                initial="hidden"
                                                                animate="visible"
                                                                whileHover={{ x: 4 }}
                                                                onClick={() => handleResultClick(result.path)}
                                                                className="w-full text-left p-4 hover:bg-muted/30 transition-colors group"
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                                        <Icon size={18} className="text-primary" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="font-medium group-hover:text-primary transition-colors">{result.title}</div>
                                                                        <div className="text-sm text-foreground/60 mt-1">{result.category} • Click to navigate</div>
                                                                    </div>
                                                                    <ChevronRight className="opacity-0 group-hover:opacity-60 transition-opacity" size={18} />
                                                                </div>
                                                            </motion.button>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center">
                                                    <Search size={40} className="mx-auto text-foreground/30 mb-3" />
                                                    <h4 className="font-medium text-foreground/80">No results found</h4>
                                                    <p className="text-sm text-foreground/60 mt-1">Try different keywords</p>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ) : searchQuery.length === 0 ? (
                                        <motion.div
                                            key="recent"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            className="bg-background rounded-xl border border-border/50 shadow-xl overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-border/30">
                                                <h3 className="font-semibold text-foreground/80">Recent Searches</h3>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {mockRecentSearches.map((search, index) => (
                                                        <motion.button
                                                            key={index}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleQuickSearch(search)}
                                                            className="px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-lg text-sm text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2"
                                                        >
                                                            <History size={12} />
                                                            {search}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                                                        <TrendingUp size={14} /> Trending
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {mockSearchResults.slice(0, 3).map((item, i) => {
                                                            const Icon = item.icon;
                                                            return (
                                                                <motion.button
                                                                    key={item.id}
                                                                    initial={{ opacity: 0, x: -8 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.1 + i * 0.05 }}
                                                                    whileHover={{ x: 4 }}
                                                                    onClick={() => handleResultClick(item.path)}
                                                                    className="w-full text-left p-3 rounded-lg hover:bg-muted/30 transition-colors flex items-center gap-3 group"
                                                                >
                                                                    <Icon size={16} className="text-foreground/50 group-hover:text-primary transition-colors" />
                                                                    <span className="text-sm">{item.title}</span>
                                                                    <span className="text-xs text-foreground/40 ml-auto">{item.category}</span>
                                                                </motion.button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            {/* Tips */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 text-center"
                            >
                                <div className="inline-flex items-center gap-4 text-sm text-foreground/50">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-1 bg-muted rounded text-xs">↑</kbd>
                                        <kbd className="px-2 py-1 bg-muted rounded text-xs">↓</kbd>
                                        <span>navigate</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
                                        <span>select</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
                                        <span>close</span>
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ─── Auth Hook ────────────────────────────────────────────────────────────────
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");
            if (token) {
                setIsAuthenticated(true);
                if (storedUsername) {
                    setUsername(storedUsername);
                } else {
                    try {
                        const payload = JSON.parse(atob(token.split(".")[1]));
                        if (payload.username) {
                            setUsername(payload.username);
                            localStorage.setItem("username", payload.username);
                        }
                    } catch (error) {
                        console.error("Failed to decode token:", error);
                    }
                }
            } else {
                setIsAuthenticated(false);
                setUsername(null);
            }
        };
        checkAuth();
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername(null);
        router.push(ROUTE_PATHS.PUBLIC.MAINPAGE);
    };

    return { isAuthenticated, username, logout };
};

// ─── Desktop Navigation ───────────────────────────────────────────────────────
const DesktopNavigation = ({
                               items,
                               className = "",
                               showActiveIndicator = false,
                           }: {
    items: NavigationItem[];
    className?: string;
    showActiveIndicator?: boolean;
}) => {
    const pathname = usePathname();

    return (
        <nav className={cn("hidden lg:flex items-center", className)}>
            {items.map((item, i) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                    <motion.div key={item.path} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
                        <Link
                            href={item.path}
                            className={cn(
                                "group relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm hover:bg-muted/50 min-w-[80px] justify-center",
                                isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
                            )}
                        >
                            <Icon size={16} className="shrink-0" />
                            <span className="whitespace-nowrap">{item.label}</span>
                            {/* Shared layoutId animates the indicator between active links */}
                            <AnimatePresence>
                                {showActiveIndicator && isActive && (
                                    <motion.span
                                        layoutId="activeIndicator"
                                        className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-primary rounded-full -translate-x-1/2"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        exit={{ opacity: 0, scaleX: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    />
                                )}
                            </AnimatePresence>
                        </Link>
                    </motion.div>
                );
            })}
        </nav>
    );
};

// ─── Mobile Navigation ────────────────────────────────────────────────────────
const MobileNavigation = ({
                              items,
                              onItemClick,
                              className = "",
                              startIndex = 0,
                          }: {
    items: NavigationItem[];
    onItemClick: () => void;
    className?: string;
    startIndex?: number;
}) => {
    const pathname = usePathname();

    return (
        <div className={cn("space-y-1", className)}>
            {items.map((item, i) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                    <motion.div key={item.path} custom={startIndex + i} variants={mobileNavItemVariants} initial="hidden" animate="visible">
                        <Link
                            href={item.path}
                            onClick={onItemClick}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200",
                                isActive ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <Icon size={18} className="shrink-0" />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
};

// ─── User Dropdown ────────────────────────────────────────────────────────────
const UserDropdown = ({ username, logout }: { username: string; logout: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getUserInitials = () => (username ? username.charAt(0).toUpperCase() : "U");

    const userMenuItems: NavigationItem[] = [
        { label: "Dashboard", icon: LayoutDashboard, path: ROUTE_PATHS.APP.DASHBOARD },
        { label: "Profile", icon: UserCircle, path: ROUTE_PATHS.APP.PROFILE },
        { label: "Settings", icon: Settings, path: ROUTE_PATHS.APP.SETTINGS },
    ];

    if (isMobile) {
        return (
            <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials()}
                </motion.div>
                <span className="text-sm font-medium truncate max-w-[100px]">{username}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="ml-2">
                    <LogOut size={16} />
                </Button>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
                <motion.div whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials()}
                </motion.div>
                <span className="text-sm font-medium truncate max-w-[120px]">{username}</span>
                {/* Chevron rotates on open */}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 top-full mt-2 w-48 bg-background rounded-lg shadow-lg border border-border/50 py-1 z-50"
                    >
                        {userMenuItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={item.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link href={item.path} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors" onClick={() => setIsOpen(false)}>
                                        <Icon size={16} />
                                        {item.label}
                                    </Link>
                                </motion.div>
                            );
                        })}
                        <div className="border-t border-border/30 my-1" />
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            whileHover={{ backgroundColor: "rgba(239,68,68,0.08)" }}
                            onClick={() => { logout(); setIsOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-red-500"
                        >
                            <LogOut size={16} />
                            Logout
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const { isAuthenticated, username, logout } = useAuth();
    const navbarRef = useRef<HTMLDivElement>(null);

    // Scroll-driven background blur using framer-motion
    const { scrollY } = useScroll();
    const navBg = useTransform(scrollY, [0, 60], ["rgba(var(--background), 0)", "rgba(var(--background), 0.95)"]);
    const navBlur = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(12px)"]);
    const navShadow = useTransform(scrollY, [0, 60], ["0 0 0 0 transparent", "0 1px 0 0 rgba(255,255,255,0.08)"]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const sy = document.body.style.top;
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
            document.body.style.top = "";
            if (sy) window.scrollTo(0, parseInt(sy) * -1);
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
            document.body.style.top = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && navbarRef.current && !navbarRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
            if (e.key === "/" && !searchOpen && !isOpen) { e.preventDefault(); setSearchOpen(true); }
            if (e.key === "Escape" && isOpen) setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [searchOpen, isOpen]);

    const baseNavigation: NavigationItem[] = [
        { path: ROUTE_PATHS.PUBLIC.MAINPAGE, label: "Home", icon: Home },
        { path: ROUTE_PATHS.PUBLIC.ABOUT, label: "About", icon: Info },
        { path: ROUTE_PATHS.PUBLIC.FEATURES, label: "Features", icon: Globe },
    ];

    const secondaryNavigation: NavigationItem[] = [
        { path: ROUTE_PATHS.PUBLIC.CONTACT, label: "Contact", icon: Contact },
        { path: ROUTE_PATHS.PUBLIC.PRIVACY, label: "Privacy", icon: Shield },
    ];

    const authNavigation: NavigationItem[] = isAuthenticated
        ? []
        : [
            { path: ROUTE_PATHS.AUTH.SIGN_IN, label: "Sign In", icon: User },
            { path: ROUTE_PATHS.AUTH.SIGN_UP, label: "Sign Up", icon: UserCircle },
        ];

    const allNavigation = [...baseNavigation, ...secondaryNavigation, ...authNavigation];

    return (
        <div ref={navbarRef}>
            {/* Navbar slides down on mount, blurs on scroll */}
            <motion.header
                variants={navbarVariants}
                initial="hidden"
                animate="visible"
                style={{ backdropFilter: navBlur, boxShadow: navShadow }}
                className="fixed top-0 left-0 right-0 z-50 w-full bg-background/0 border-b border-white/5"
            >
                {/* Announcement bar fades in */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="hidden md:flex items-center justify-center py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium overflow-hidden"
                >
                    🎮 Welcome to PurpleHaze • Next-gen E-Sports platform
                </motion.div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo animates in from left */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <Link href={ROUTE_PATHS.PUBLIC.MAINPAGE} className="flex items-center gap-2.5 group relative z-10">
                                <motion.div
                                    whileHover={{ scale: 1.08, rotate: 3 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-md shadow-primary/20"
                                >
                                    <span className="text-white font-bold text-sm">PA</span>
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                        Proj-Ariel
                                    </span>
                                    <span className="text-[10px] lg:text-xs text-foreground/60 -mt-1">E-Sports Platform</span>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Desktop Nav — each item staggers in */}
                        <div className="hidden lg:flex items-center flex-1 justify-center px-8">
                            <DesktopNavigation items={allNavigation} showActiveIndicator={true} />
                        </div>

                        {/* Right controls animate in from right */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="flex items-center gap-2 lg:gap-3"
                        >
                            {!isMobile && (
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button variant="ghost" size="sm" onClick={() => setSearchOpen(true)} className="hidden md:flex items-center gap-2 hover:bg-primary/10">
                                        <Search size={16} />
                                        <span className="hidden lg:inline text-sm">Search</span>
                                        <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-muted rounded ml-2">
                                            <span className="text-[10px]">⌘</span>K
                                        </kbd>
                                    </Button>
                                </motion.div>
                            )}

                            {isAuthenticated ? (
                                <UserDropdown username={username || ""} logout={logout} />
                            ) : (
                                !isMobile && (
                                    <div className="hidden lg:flex items-center gap-2">
                                        {authNavigation.map((item, i) => {
                                            const Icon = item.icon;
                                            const isSignUp = item.label === "Sign Up";
                                            return (
                                                <motion.div
                                                    key={item.path}
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 + i * 0.05 }}
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    <Link
                                                        href={item.path}
                                                        className={cn(
                                                            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                                            isSignUp ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-muted/50"
                                                        )}
                                                    >
                                                        {!isSignUp && <Icon size={16} className="inline mr-2" />}
                                                        {item.label}
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )
                            )}

                            <ModeToggle />

                            {/* Hamburger — icon swaps with rotation */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors relative z-50"
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                            <X size={22} />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                            <Menu size={22} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Menu — spring slides in from right */}
                <AnimatePresence>
                    {isOpen && (
                        <div className="lg:hidden fixed inset-0 z-40">
                            <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                            <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border/50 shadow-2xl overflow-y-auto">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                                                <span className="text-white font-bold">PA</span>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                                                <h3 className="font-bold text-lg">Proj-Ariel</h3>
                                                {isAuthenticated && username && <p className="text-sm text-foreground/60">Hi, {username}!</p>}
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Search */}
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
                                        <button
                                            onClick={() => { setIsOpen(false); setTimeout(() => setSearchOpen(true), 300); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                                        >
                                            <Search className="text-foreground/40" size={18} />
                                            <span className="text-foreground/70">Search...</span>
                                            <kbd className="ml-auto px-2 py-1 text-xs bg-background rounded">/</kbd>
                                        </button>
                                    </motion.div>

                                    <div className="space-y-6">
                                        <div>
                                            <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">Main Menu</motion.h4>
                                            <MobileNavigation items={baseNavigation} onItemClick={() => setIsOpen(false)} startIndex={0} />
                                        </div>
                                        <div>
                                            <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">Discover</motion.h4>
                                            <MobileNavigation items={secondaryNavigation} onItemClick={() => setIsOpen(false)} startIndex={3} />
                                        </div>
                                        {!isAuthenticated && (
                                            <div>
                                                <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">Account</motion.h4>
                                                <MobileNavigation items={authNavigation} onItemClick={() => setIsOpen(false)} startIndex={5} />
                                            </div>
                                        )}
                                        {isAuthenticated && (
                                            <div>
                                                <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">Your Account</motion.h4>
                                                <div className="space-y-1">
                                                    {[
                                                        { href: ROUTE_PATHS.APP.DASHBOARD, icon: LayoutDashboard, label: "Dashboard" },
                                                        { href: ROUTE_PATHS.APP.PROFILE, icon: UserCircle, label: "Profile" },
                                                    ].map((item, i) => {
                                                        const Icon = item.icon;
                                                        return (
                                                            <motion.div key={item.label} custom={i} variants={mobileNavItemVariants} initial="hidden" animate="visible">
                                                                <Link href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium hover:bg-muted/50">
                                                                    <Icon size={18} /> {item.label}
                                                                </Link>
                                                            </motion.div>
                                                        );
                                                    })}
                                                    <motion.button
                                                        custom={2}
                                                        variants={mobileNavItemVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => { logout(); setIsOpen(false); }}
                                                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                                    >
                                                        <LogOut size={18} /> Logout
                                                    </motion.button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-12 pt-6 border-t border-border/30">
                                        <div className="flex flex-wrap gap-3 mb-4">
                                            <Link href="/help" className="text-sm text-foreground/60 hover:text-foreground"><HelpCircle size={16} className="inline mr-1" /> Help</Link>
                                            <Link href="/terms" className="text-sm text-foreground/60 hover:text-foreground">Terms</Link>
                                            <Link href="/cookies" className="text-sm text-foreground/60 hover:text-foreground">Cookies</Link>
                                        </div>
                                        <p className="text-xs text-foreground/40 text-center">© {new Date().getFullYear()} Proj-Ariel. All rights reserved.</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.header>

            {isOpen && <div className="h-16" />}
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
    );
};

export default Navbar;