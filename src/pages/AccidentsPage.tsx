import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Activity, BookOpen, Lightbulb, Clock, AlertTriangle, Info, ChevronDown, Heart, Shield, HelpCircle } from 'lucide-react';
import { accidents } from '../data/accidents';
import { Breadcrumbs } from '../components/Breadcrumbs';

// Glossary definitions for technical terms
const glossary: Record<string, string> = {
    'RBMK': 'A Soviet reactor design using graphite to slow neutrons and water to cool the fuel. No longer built after Chernobyl.',
    'positive void coefficient': 'A dangerous characteristic where steam bubbles in the coolant cause the reactor to produce MORE power instead of less.',
    'containment': 'A thick concrete and steel building designed to prevent radioactive materials from escaping even during an accident.',
    'safety culture': 'An organization\'s shared attitudes and behaviors that prioritize safety over production, schedules, or cost.',
    'INES': 'International Nuclear and Radiological Event Scale — a 7-level rating from "anomaly" (1) to "major accident" (7).',
    'station blackout': 'Complete loss of all electrical power at a nuclear plant, including backup generators.',
    'containment building': 'A thick concrete and steel building designed to prevent radioactive materials from escaping even during an accident.',
    'Wigner energy': 'Energy stored in graphite when bombarded by neutrons. If released too quickly, it can cause dangerous heating.',
    'prompt critical': 'An extremely rapid, uncontrolled nuclear chain reaction — essentially an explosion.',
};

// Function to wrap terms in tooltips
const GlossaryTerm = ({ term, children }: { term: string; children: React.ReactNode }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const definition = glossary[term.toLowerCase()] || glossary[term];

    if (!definition) return <>{children}</>;

    return (
        <span
            className="relative inline-flex items-center gap-1 text-blue-400 cursor-help border-b border-dashed border-blue-400/50"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            <Info className="w-3 h-3" />
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 font-normal shadow-xl z-50"
                    >
                        <strong className="text-blue-400">{term}:</strong> {definition}
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};

export const AccidentsPage = () => {
    const sortedAccidents = [...accidents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-orange-400">
                    Historical Accidents
                </h1>
                <p className="text-slate-400 text-lg">
                    Analyzing past failures to ensure future safety. These events have shaped modern nuclear regulations and safety culture.
                </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800 md:left-1/2 md:-ml-0.5" />

                <div className="space-y-12 md:space-y-24">
                    {sortedAccidents.map((accident, index) => (
                        <motion.div
                            key={accident.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="absolute left-4 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-500 transform -translate-x-1/2 md:left-1/2 z-10" />

                            <div className="ml-12 md:ml-0 md:w-5/12">
                                <Link
                                    to={`/accidents/${accident.id}`}
                                    className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                            {accident.date.split('-')[0]}
                                        </span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded border ${accident.severity >= 7 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                                            INES Level {accident.severity}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-amber-400 transition-colors">{accident.name}</h3>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                        {accident.summary}
                                    </p>
                                    <div className="flex items-center text-amber-500 text-sm font-medium">
                                        Read the full story <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                            <div className="hidden md:block md:w-5/12" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const AccidentDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [showTechnical, setShowTechnical] = useState(false);
    const accident = accidents.find(a => a.id === id);
    const currentIndex = accidents.findIndex(a => a.id === id);
    const nextAccident = accidents[(currentIndex + 1) % accidents.length];

    if (!accident) {
        return <div className="text-center py-20 text-slate-500">Accident not found</div>;
    }

    const isChernobyl = accident.id === 'chernobyl';
    const isFukushima = accident.id === 'fukushima';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
        >
            <Breadcrumbs items={[
                { label: 'Accidents', href: '/accidents' },
                { label: accident.name }
            ]} />

            <div className="space-y-8">
                {/* Header */}
                <div className="border-b border-slate-800 pb-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold border ${accident.severity >= 7 ? 'bg-red-950/50 text-red-400 border-red-900' : 'bg-orange-950/50 text-orange-400 border-orange-900'}`}>
                            <GlossaryTerm term="INES">INES</GlossaryTerm> Level {accident.severity}
                        </span>
                        <span className="flex items-center text-slate-400 text-sm">
                            <Calendar className="w-4 h-4 mr-2" /> {accident.date}
                        </span>
                        <span className="flex items-center text-slate-400 text-sm">
                            <MapPin className="w-4 h-4 mr-2" /> {accident.location}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">{accident.name}</h1>
                </div>

                {/* Quick Recap Box */}
                {accident.quickRecap && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-5 h-5 text-amber-400" />
                            <h3 className="text-lg font-bold text-amber-400">In 30 Seconds</h3>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{accident.quickRecap}</p>
                    </motion.div>
                )}

                {/* Before & After Safety (for Chernobyl) */}
                {isChernobyl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="bg-rose-900/20 border border-rose-500/30 rounded-xl p-5">
                            <h4 className="font-bold text-rose-400 mb-2">Before 1986</h4>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li className="flex gap-2"><span className="text-rose-400">✗</span> Some reactors had no <GlossaryTerm term="containment">containment</GlossaryTerm></li>
                                <li className="flex gap-2"><span className="text-rose-400">✗</span> Weaker <GlossaryTerm term="safety culture">safety culture</GlossaryTerm></li>
                                <li className="flex gap-2"><span className="text-rose-400">✗</span> Limited international oversight</li>
                            </ul>
                        </div>
                        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-5">
                            <h4 className="font-bold text-emerald-400 mb-2">After Chernobyl</h4>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li className="flex gap-2"><span className="text-emerald-400">✓</span> All new reactors require containment</li>
                                <li className="flex gap-2"><span className="text-emerald-400">✓</span> WANO peer reviews worldwide</li>
                                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Strict safety culture enforcement</li>
                            </ul>
                        </div>
                    </motion.div>
                )}

                {/* What Happened */}
                {accident.whatHappened && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6 text-amber-400" /> What Happened
                        </h2>
                        <div className="space-y-3 text-slate-300 leading-relaxed">
                            {accident.whatHappened.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Why It Happened */}
                {accident.whyItHappened && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
                            <Activity className="w-6 h-6" /> Why It Happened
                        </h2>
                        <ul className="space-y-3">
                            {accident.whyItHappened.map((reason, i) => (
                                <li key={i} className="flex gap-3 text-slate-300">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">
                                        {i + 1}
                                    </span>
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* Consequences */}
                {accident.consequences && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6" /> Consequences
                        </h2>
                        <ul className="space-y-3">
                            {accident.consequences.map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-300">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* Human Impact Note */}
                {(isChernobyl || isFukushima) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6"
                    >
                        <div className="flex items-start gap-3">
                            <Heart className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-purple-400 mb-2">The Human Story</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {isChernobyl
                                        ? "Thousands of people lost their homes and their health. The town of Pripyat remains abandoned today. Many first responders (\"liquidators\") suffered from radiation exposure. This tragedy drove global changes in how we approach nuclear safety — not just as an engineering problem, but as a responsibility to protect communities."
                                        : "Over 150,000 people were evacuated from their homes, many permanently. The stress of evacuation caused more harm than the radiation itself. Years later, communities are still rebuilding. This event reminded the world that nuclear safety is ultimately about protecting people, not just reactors."
                                    }
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Technical Details Toggle */}
                {accident.causes && accident.causes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            onClick={() => setShowTechnical(!showTechnical)}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${showTechnical ? 'rotate-180' : ''}`} />
                            {showTechnical ? 'Hide' : 'Show'} Technical Details
                        </button>

                        <AnimatePresence>
                            {showTechnical && (
                                <motion.section
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mt-4 space-y-4">
                                        <h2 className="text-xl font-bold text-slate-300 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5" /> Root Causes (Technical Summary)
                                        </h2>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {accident.causes.map((cause, i) => (
                                                <li key={i} className="flex gap-2 text-slate-400 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5 flex-shrink-0" />
                                                    {cause}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Lessons Learned */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-8 space-y-4"
                >
                    <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                        <Lightbulb className="w-6 h-6" /> What We Learned
                    </h2>
                    <ul className="space-y-4">
                        {accident.lessonsLearned.map((lesson, i) => (
                            <li key={i} className="flex gap-3 text-slate-200">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                                    ✓
                                </span>
                                {lesson}
                            </li>
                        ))}
                    </ul>
                </motion.section>

                {/* What This Means Today (for major accidents) */}
                {(isChernobyl || isFukushima) && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" />
                            <h3 className="text-lg font-bold text-blue-400">What This Means for Reactors Today</h3>
                        </div>
                        {isChernobyl ? (
                            <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                                <p>
                                    <strong>The RBMK design is no longer built.</strong> The remaining RBMK reactors in Russia have been extensively modified to address the original flaws.
                                </p>
                                <p>
                                    <strong>All modern reactors have containment buildings</strong> — thick concrete and steel structures designed to prevent any release of radioactive materials, even during severe accidents.
                                </p>
                                <p>
                                    <strong>International peer reviews</strong> (through WANO and IAEA) now regularly inspect plants worldwide, ensuring lessons from Chernobyl are applied everywhere.
                                </p>
                            </div>
                        ) : (
                            <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                                <p>
                                    <strong>Plants worldwide were "stress tested"</strong> after Fukushima to evaluate their ability to handle extreme natural events beyond their original design basis.
                                </p>
                                <p>
                                    <strong>Backup power is now diversified and hardened</strong> — generators placed in multiple locations, at higher elevations, with portable backup options.
                                </p>
                                <p>
                                    <strong>Passive cooling systems</strong> that work without electricity are now standard in new reactor designs (like AP1000 and EPR).
                                </p>
                            </div>
                        )}
                    </motion.section>
                )}

                {/* Related Questions */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="space-y-4"
                >
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-slate-400" /> Related Questions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            to="/faq"
                            className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
                        >
                            <p className="text-slate-300 group-hover:text-white transition-colors">Can this happen again?</p>
                            <p className="text-xs text-slate-500 mt-1">Learn about modern safety systems</p>
                        </Link>
                        <Link
                            to="/safety"
                            className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
                        >
                            <p className="text-slate-300 group-hover:text-white transition-colors">How are nuclear plants kept safe?</p>
                            <p className="text-xs text-slate-500 mt-1">Explore IAEA safety principles</p>
                        </Link>
                    </div>
                </motion.section>

                {/* Next Step Card */}
                <div className="border-t border-slate-800 pt-8">
                    <p className="text-slate-500 text-sm mb-4">Continue Learning</p>
                    <Link
                        to={`/accidents/${nextAccident.id}`}
                        className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">Next: {nextAccident.date.split('-')[0]}</p>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    {nextAccident.name}
                                </h3>
                            </div>
                            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
