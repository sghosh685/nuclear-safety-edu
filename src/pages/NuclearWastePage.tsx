import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Clock, MapPin, Shield, CheckCircle } from 'lucide-react';

export const NuclearWastePage = () => {
    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <section className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <Trash2 className="w-16 h-16 text-amber-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Nuclear Waste: The Full Picture</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Waste is the #1 public concern about nuclear energy. Here's an honest look at what it is, how it's managed, and what's being done for the long term.
                </p>
            </section>

            {/* Volume Reality */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white">The Volume Reality</h2>
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
                        <div>
                            <div className="text-5xl font-bold text-emerald-400">5</div>
                            <div className="text-slate-400 text-sm">hockey rinks</div>
                            <div className="text-slate-500 text-xs mt-1">All of Canada's nuclear waste (60+ years)</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-emerald-400">1</div>
                            <div className="text-slate-400 text-sm">football field</div>
                            <div className="text-slate-500 text-xs mt-1">All of US nuclear waste, 10m high</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-emerald-400">3%</div>
                            <div className="text-slate-400 text-sm">is high-level</div>
                            <div className="text-slate-500 text-xs mt-1">The rest is lightly contaminated items</div>
                        </div>
                    </div>
                    <p className="text-slate-300 text-center">
                        Unlike coal ash or chemical waste, nuclear waste is <strong>small in volume</strong> and <strong>completely contained</strong> —
                        it doesn't go into the air, water, or ground during normal operation.
                    </p>
                </div>
            </motion.section>

            {/* Types of Waste */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white">Types of Nuclear Waste</h2>
                <div className="space-y-4">
                    {[
                        {
                            level: 'Low-Level',
                            percent: '90%',
                            examples: 'Gloves, tools, filters, clothing',
                            storage: 'Compacted, stored at licensed facilities',
                            color: 'emerald'
                        },
                        {
                            level: 'Intermediate-Level',
                            percent: '7%',
                            examples: 'Reactor components, resins, sludges',
                            storage: 'Concrete containers, shielded storage',
                            color: 'amber'
                        },
                        {
                            level: 'High-Level',
                            percent: '3%',
                            examples: 'Spent fuel rods from reactors',
                            storage: 'First in pools, then dry casks, then deep repository',
                            color: 'rose'
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className={`bg-${item.color}-900/20 border border-${item.color}-500/30 rounded-xl p-6`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-xl font-bold text-${item.color}-400`}>{item.level}</span>
                                        <span className="text-sm text-slate-500">({item.percent} of volume)</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-1"><strong>Examples:</strong> {item.examples}</p>
                                    <p className="text-slate-400 text-sm"><strong>Storage:</strong> {item.storage}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Current Storage */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-400" /> How Waste Is Stored Today
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold text-blue-400 mb-3">Spent Fuel Pools</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            When fuel is first removed, it's hot and radioactive. It's placed in deep pools of water at the reactor site.
                            The water cools the fuel and shields radiation. Fuel typically stays here for 5-10 years.
                        </p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="font-bold text-blue-400 mb-3">Dry Cask Storage</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            After cooling, fuel is moved to concrete and steel casks. These sit on concrete pads at reactor sites.
                            They're designed to survive earthquakes, floods, even airplane impacts. No water or electricity needed.
                        </p>
                    </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-300 text-sm">
                        <strong>Key point:</strong> All spent fuel ever produced in Canada is still safely stored at reactor sites.
                        No storage has ever leaked or caused harm.
                    </p>
                </div>
            </motion.section>

            {/* Long-Term Solutions */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-400" /> Long-Term Solutions
                </h2>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 space-y-6">
                    <h3 className="text-xl font-bold text-purple-400">Deep Geological Repositories (DGR)</h3>
                    <p className="text-slate-300 leading-relaxed">
                        The international consensus is to bury high-level waste deep underground (500m+) in stable rock formations.
                        The waste is sealed in multiple barriers: ceramic fuel, metal canisters, clay buffer, and ancient rock.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 rounded-xl p-4">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-400" /> Finland: Onkalo
                            </h4>
                            <p className="text-slate-400 text-sm">
                                World's first permanent repository, opening 2025. Built 400m deep in granite. Will safely store waste for 100,000+ years.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-xl p-4">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-400" /> Canada's Plan
                            </h4>
                            <p className="text-slate-400 text-sm">
                                Canada's Nuclear Waste Management Organization (NWMO) is selecting a site. Two communities volunteered.
                                Repository expected by 2040s.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Radioactivity Over Time */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white">Radioactivity Decreases Over Time</h2>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="space-y-4">
                        {[
                            { time: 'At removal', level: 100, label: 'Very hot, very radioactive' },
                            { time: '40 years', level: 0.1, label: '1,000x less radioactive' },
                            { time: '300 years', level: 0.01, label: 'Less than original uranium ore' },
                            { time: '10,000 years', level: 0.001, label: 'Negligible hazard' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-24 text-sm text-slate-400">{item.time}</div>
                                <div className="flex-grow bg-slate-800 rounded-full h-4 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.log10(item.level + 1) / Math.log10(101) * 100}%` }}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500"
                                    />
                                </div>
                                <div className="w-48 text-xs text-slate-500">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Common Questions */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white">Common Questions</h2>
                <div className="space-y-4">
                    {[
                        { q: 'Why not just reprocess it?', a: 'Some countries (France, UK, Japan) do reprocess spent fuel to extract usable material. Canada currently stores it, but reprocessing remains an option for the future.' },
                        { q: 'Can it contaminate groundwater?', a: 'Deep repositories are placed far below aquifers in stable rock. Multiple barriers (metal, clay, rock) prevent any water contact for thousands of years.' },
                        { q: 'What if we forget where it is?', a: 'Repository designs include long-term markers and records. But even if forgotten, the depth and containment would protect people. It\'s designed for passive safety.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <h4 className="font-bold text-white mb-2">{item.q}</h4>
                            <p className="text-slate-400 text-sm">{item.a}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Bottom Line */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4"
            >
                <h3 className="text-2xl font-bold text-white">The Bottom Line</h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    {[
                        'Small volume',
                        'Completely contained',
                        'Safely stored for 60+ years',
                        'Long-term solutions underway',
                    ].map((point, i) => (
                        <span key={i} className="flex items-center gap-1 text-emerald-300">
                            <CheckCircle className="w-4 h-4" /> {point}
                        </span>
                    ))}
                </div>
                <p className="text-slate-300 max-w-2xl mx-auto">
                    Nuclear waste is a manageable engineering challenge, not an unsolvable problem.
                    The question isn't "can we handle it?" — we already have for decades. The question is "where do we put it permanently?" — and that's being answered.
                </p>
            </motion.section>

            {/* Next Steps */}
            <section className="border-t border-slate-800 pt-8">
                <p className="text-slate-500 text-sm mb-4">Continue Learning</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/compare-energy"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">Compare Energy Sources</h3>
                        <p className="text-sm text-slate-400 mt-1">How does nuclear waste compare to other energy waste?</p>
                    </Link>
                    <Link
                        to="/faq"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">More Questions</h3>
                        <p className="text-sm text-slate-400 mt-1">Myths vs facts about nuclear energy</p>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
