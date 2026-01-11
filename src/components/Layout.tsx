import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Atom, BookOpen, Menu, X, HelpCircle, Search, Sun, Moon, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { searchContent, type SearchItem } from '../data/searchIndex';
import { useTheme } from '../contexts/ThemeContext';

const categoryColors: Record<SearchItem['category'], string> = {
    reactor: 'bg-blue-500/10 text-blue-400',
    accident: 'bg-amber-500/10 text-amber-400',
    page: 'bg-slate-500/10 text-slate-400',
    concept: 'bg-purple-500/10 text-purple-400',
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    // Mega-menu navigation structure
    const navStructure = [
        {
            name: 'Learn',
            icon: BookOpen,
            dropdown: [
                { name: 'Nuclear Basics', path: '/basics', description: 'Fundamentals of nuclear energy' },
                { name: 'Reactor Types', path: '/reactors', description: 'PWR, BWR, CANDU, RBMK explained' },
                { name: 'Accidents & Case Studies', path: '/accidents', description: 'Chernobyl, Fukushima, TMI' },
                { name: 'Safety Principles', path: '/safety', description: 'Defense in depth' },
                { name: 'Safety Culture', path: '/safety-culture', description: 'Industry best practices' },
            ]
        },
        {
            name: 'Understand',
            icon: HelpCircle,
            dropdown: [
                { name: 'Pros & Challenges', path: '/pros-and-challenges', description: 'Balanced perspective' },
                { name: 'Climate & Nuclear', path: '/climate', description: 'Role in decarbonization' },
                { name: 'Compare Energy', path: '/compare-energy', description: 'Nuclear vs other sources' },
                { name: 'Nuclear Waste', path: '/waste', description: 'Storage and disposal' },
                { name: 'Myths vs Facts', path: '/faq', description: 'Common misconceptions' },
            ]
        },
        {
            name: 'Explore',
            icon: Atom,
            dropdown: [
                { name: 'Dose Calculator', path: '/dose-calculator', description: 'Your annual radiation exposure' },
                { name: 'Career Quiz', path: '/career-quiz', description: 'Find your nuclear career path' },
                { name: 'Global Nuclear Map', path: '/global-map', description: 'Reactors worldwide' },
                { name: 'Nuclear in Canada', path: '/canada', description: 'CANDU & domestic industry' },
                { name: 'Careers', path: '/careers', description: 'Jobs in nuclear' },
                { name: 'Glossary', path: '/glossary', description: 'Technical terms' },
                { name: 'Resources', path: '/resources', description: 'Further reading' },
                { name: 'About This Site', path: '/about', description: 'Project info & mission' },
                { name: 'Emergency Info', path: '/emergency', description: 'Safety procedures' },
            ]
        },
        {
            name: 'Quiz',
            path: '/quiz',
            icon: BookOpen,
        }
    ];

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [openDropdown]);

    // Handle search
    useEffect(() => {
        const results = searchContent(searchQuery);
        setSearchResults(results);
        setSelectedIndex(-1);
    }, [searchQuery]);

    // Close search on route change
    useEffect(() => {
        setShowSearch(false);
        setSearchQuery('');
    }, [location.pathname]);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            navigate(searchResults[selectedIndex].path);
            setShowSearch(false);
            setSearchQuery('');
        } else if (e.key === 'Escape') {
            setShowSearch(false);
        }
    };

    return (
        <nav className="theme-dark bg-slate-900 border-b border-slate-800 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                <Atom className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-100">
                                Nuclear<span className="text-blue-400">Edu</span>
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            {navStructure.map((navItem) => {
                                if (navItem.dropdown) {
                                    // Dropdown menu item
                                    const isActive = navItem.dropdown.some(item => location.pathname.startsWith(item.path));
                                    return (
                                        <div key={navItem.name} className="relative" ref={openDropdown === navItem.name ? dropdownRef : null}>
                                            <button
                                                onMouseEnter={() => setOpenDropdown(navItem.name)}
                                                onClick={() => setOpenDropdown(openDropdown === navItem.name ? null : navItem.name)}
                                                className={clsx(
                                                    'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                                                    isActive
                                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                                )}
                                            >
                                                <navItem.icon className="w-4 h-4" />
                                                {navItem.name}
                                                <svg className={clsx('w-3 h-3 transition-transform', openDropdown === navItem.name && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {/* Dropdown panel */}
                                            {openDropdown === navItem.name && (
                                                <div
                                                    className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50"
                                                    onMouseLeave={() => setOpenDropdown(null)}
                                                >
                                                    {navItem.dropdown.map((item) => (
                                                        <Link
                                                            key={item.path}
                                                            to={item.path}
                                                            onClick={() => setOpenDropdown(null)}
                                                            className="block px-4 py-3 border-b border-slate-800 last:border-0 hover:bg-slate-800 transition-colors group"
                                                        >
                                                            <div className="font-medium text-slate-200 text-sm group-hover:text-blue-400 transition-colors">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-xs text-slate-500 mt-0.5">
                                                                {item.description}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                } else {
                                    // Regular link (Quiz)
                                    const isActive = location.pathname.startsWith(navItem.path!);
                                    return (
                                        <Link
                                            key={navItem.name}
                                            to={navItem.path!}
                                            className={clsx(
                                                'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                                                isActive
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                            )}
                                        >
                                            <navItem.icon className="w-4 h-4" />
                                            {navItem.name}
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    </div>

                    {/* Search */}
                    <div className="hidden md:block relative" ref={searchRef}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setShowSearch(true)}
                                onKeyDown={handleKeyDown}
                                className="w-48 pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* Search Results Dropdown */}
                        {showSearch && searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                                {searchResults.map((item, index) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => {
                                            setShowSearch(false);
                                            setSearchQuery('');
                                        }}
                                        className={clsx(
                                            'block px-4 py-3 border-b border-slate-800 last:border-0 transition-colors',
                                            selectedIndex === index ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-slate-200 text-sm">{item.title}</span>
                                            <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', categoryColors[item.category])}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* No results message */}
                        {showSearch && searchQuery.length > 2 && searchResults.length === 0 && (
                            <div className="absolute top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-4 z-50">
                                <p className="text-sm text-slate-500 text-center">No results for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile controls: Search, Theme, Menu */}
                    <div className="flex items-center gap-2 md:hidden">
                        {/* Mobile search button */}
                        <button
                            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Theme toggle - mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {/* Menu toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Theme toggle - desktop */}
                    <button
                        onClick={toggleTheme}
                        className="hidden md:flex p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile search overlay */}
            {mobileSearchOpen && (
                <div className="md:hidden border-t border-slate-800 p-4 bg-slate-900">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {searchResults.length > 0 && (
                        <div className="mt-2 bg-slate-800 rounded-lg overflow-hidden">
                            {searchResults.map((item, index) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => {
                                        setMobileSearchOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className={clsx(
                                        'block px-4 py-3 border-b border-slate-700 last:border-0',
                                        selectedIndex === index ? 'bg-slate-700' : ''
                                    )}
                                >
                                    <span className="font-medium text-slate-200 text-sm">{item.title}</span>
                                    <p className="text-xs text-slate-500">{item.description}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900">
                        {navStructure.map((navItem) => {
                            if (navItem.dropdown) {
                                const isExpanded = openDropdown === navItem.name;
                                return (
                                    <div key={navItem.name}>
                                        <button
                                            onClick={() => setOpenDropdown(isExpanded ? null : navItem.name)}
                                            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                                        >
                                            <div className="flex items-center gap-2">
                                                <navItem.icon className="w-5 h-5" />
                                                {navItem.name}
                                            </div>
                                            <ChevronDown className={clsx('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
                                        </button>
                                        {isExpanded && (
                                            <div className="ml-6 mt-1 space-y-1">
                                                {navItem.dropdown.map((item) => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className="block px-3 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            } else {
                                const isActive = location.pathname.startsWith(navItem.path!);
                                return (
                                    <Link
                                        key={navItem.name}
                                        to={navItem.path!}
                                        onClick={() => setIsOpen(false)}
                                        className={clsx(
                                            'block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2',
                                            isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        )}
                                    >
                                        <navItem.icon className="w-5 h-5" />
                                        {navItem.name}
                                    </Link>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => (
    <footer className="theme-dark bg-slate-950 border-t border-slate-900 mt-auto py-10" role="contentinfo" aria-label="Site footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-3">
                        <Atom className="w-6 h-6 text-blue-400" />
                        <span className="font-bold text-lg text-slate-100">
                            Nuclear<span className="text-blue-400">Edu</span>
                        </span>
                    </Link>
                    <p className="text-sm text-slate-500">
                        Clear, honest nuclear education for everyone.
                    </p>
                </div>

                {/* Learn - Core technical content */}
                <div>
                    <h4 className="font-semibold text-slate-300 mb-3">Learn</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/basics" className="text-slate-500 hover:text-blue-400 transition-colors">Nuclear Basics</Link></li>
                        <li><Link to="/reactors" className="text-slate-500 hover:text-blue-400 transition-colors">Reactor Types</Link></li>
                        <li><Link to="/accidents" className="text-slate-500 hover:text-blue-400 transition-colors">Accidents</Link></li>
                        <li><Link to="/safety" className="text-slate-500 hover:text-blue-400 transition-colors">Safety Principles</Link></li>
                        <li><Link to="/safety-culture" className="text-slate-500 hover:text-blue-400 transition-colors">Safety Culture</Link></li>
                    </ul>
                </div>

                {/* Understand - Context and trade-offs */}
                <div>
                    <h4 className="font-semibold text-slate-300 mb-3">Understand</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/pros-and-challenges" className="text-slate-500 hover:text-blue-400 transition-colors">Pros & Challenges</Link></li>
                        <li><Link to="/waste" className="text-slate-500 hover:text-blue-400 transition-colors">Nuclear Waste</Link></li>
                        <li><Link to="/climate" className="text-slate-500 hover:text-blue-400 transition-colors">Climate & Nuclear</Link></li>
                        <li><Link to="/compare-energy" className="text-slate-500 hover:text-blue-400 transition-colors">Compare Energy</Link></li>
                        <li><Link to="/faq" className="text-slate-500 hover:text-blue-400 transition-colors">Myths vs Facts</Link></li>
                    </ul>
                </div>

                {/* Explore - Geographic, careers, reference */}
                <div>
                    <h4 className="font-semibold text-slate-300 mb-3">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/dose-calculator" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">🧮 Dose Calculator</Link></li>
                        <li><Link to="/career-quiz" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">🎯 Career Quiz</Link></li>
                        <li><Link to="/canada" className="text-slate-500 hover:text-blue-400 transition-colors">Nuclear in Canada</Link></li>
                        <li><Link to="/global-map" className="text-slate-500 hover:text-blue-400 transition-colors">Global Map</Link></li>
                        <li><Link to="/careers" className="text-slate-500 hover:text-blue-400 transition-colors">Careers</Link></li>
                        <li><Link to="/glossary" className="text-slate-500 hover:text-blue-400 transition-colors">Glossary</Link></li>
                        <li><Link to="/resources" className="text-slate-500 hover:text-blue-400 transition-colors">Resources</Link></li>
                        <li><Link to="/quiz" className="text-slate-500 hover:text-blue-400 transition-colors">Quiz</Link></li>
                    </ul>
                </div>

                {/* About - Site info */}
                <div className="md:hidden lg:block">
                    <h4 className="font-semibold text-slate-300 mb-3">About</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/about" className="text-slate-500 hover:text-blue-400 transition-colors">About This Site</Link></li>
                        <li><Link to="/emergency" className="text-slate-500 hover:text-blue-400 transition-colors">Emergency Info</Link></li>
                    </ul>
                </div>
            </div>

            {/* About This Project */}
            <div className="border-t border-slate-800 pt-6 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h4 className="font-semibold text-slate-400 text-sm mb-1">About This Project</h4>
                        <p className="text-xs text-slate-600">
                            Built by <span className="text-blue-400">Saikat Ghosh</span> — An educational project making nuclear energy accessible to everyone.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs rounded-md transition-colors"
                        >
                            GitHub
                        </a>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                                React + Vite
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                TypeScript
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                                Tailwind CSS
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-600">
                    Educational project. Content based on IAEA, NRC, CNSC, and EIA public information.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span title="Accessibility" className="flex items-center gap-1">♿ WCAG AA</span>
                    <span title="Mobile Optimized" className="flex items-center gap-1">📱 Mobile-Ready</span>
                    <span title="Performance" className="flex items-center gap-1">⚡ Fast</span>
                </div>
            </div>
        </div>
    </footer>
);

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
            {/* Skip to main content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none"
            >
                Skip to main content
            </a>
            <Navbar />
            <main
                id="main-content"
                role="main"
                aria-label="Main content"
                className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                <AnimatePresence mode="wait">
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};
