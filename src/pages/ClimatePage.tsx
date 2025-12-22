import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Thermometer, Factory, Globe, TrendingDown, CheckCircle } from 'lucide-react';

const carbonData = [
    { source: 'Coal', emissions: 820, color: 'bg-gray-500' },
    { source: 'Natural Gas', emissions: 490, color: 'bg-orange-500' },
    { source: 'Solar PV', emissions: 45, color: 'bg-yellow-400' },
    { source: 'Hydro', emissions: 24, color: 'bg-blue-400' },
    { source: 'Nuclear', emissions: 12, color: 'bg-cyan-400' },
    { source: 'Wind', emissions: 11, color: 'bg-emerald-400' },
];

export const ClimatePage = () => {
    const maxEmissions = Math.max(...carbonData.map(d => d.emissions));

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
                    <Leaf className="w-16 h-16 text-emerald-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Nuclear & Climate Change</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Can nuclear energy help address climate change? Here's what the science says.
                </p>
            </section>

            {/* Carbon Comparison */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-emerald-400" /> Lifecycle Carbon Emissions
                </h2>
                <p className="text-slate-400">
                    Carbon emissions include construction, fuel, operation, and decommissioning — the full lifecycle.
                </p>
                <div className="space-y-3">
                    {carbonData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-24 text-sm text-slate-300">{item.source}</div>
                            <div className="flex-grow bg-slate-800 rounded-full h-8 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.emissions / maxEmissions) * 100}%` }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className={`h-full ${item.color} flex items-center justify-end pr-2`}
                                >
                                    <span className="text-xs font-bold text-white drop-shadow">{item.emissions}g</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="text-xs text-slate-500">
                    CO₂ equivalent per kWh of electricity. Source: IPCC 2014, NREL, Our World in Data.
                </p>
            </motion.section>

            {/* Key Insight */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8"
            >
                <p className="text-xl text-emerald-300 text-center font-medium leading-relaxed">
                    "Nuclear power produces about the same lifecycle emissions as wind —
                    <strong> 50-70x less than natural gas</strong> and <strong>70-100x less than coal</strong>."
                </p>
            </motion.section>

            {/* Net-Zero Role */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-6 h-6 text-blue-400" /> Role in Net-Zero Pathways
                </h2>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                    <p className="text-slate-300 leading-relaxed">
                        The <strong>Intergovernmental Panel on Climate Change (IPCC)</strong> and <strong>International Energy Agency (IEA)</strong>
                        include nuclear power in most scenarios for reaching net-zero emissions by 2050.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <h4 className="font-bold text-blue-400 mb-2">Why nuclear helps</h4>
                            <ul className="text-sm text-slate-300 space-y-1">
                                <li>• 24/7 clean power regardless of weather</li>
                                <li>• Complements variable renewables</li>
                                <li>• Small land footprint</li>
                                <li>• Long operating lifetime (40-80 years)</li>
                            </ul>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                            <h4 className="font-bold text-purple-400 mb-2">IEA Net Zero Scenario</h4>
                            <ul className="text-sm text-slate-300 space-y-1">
                                <li>• Nuclear capacity doubles by 2050</li>
                                <li>• Provides ~10% of global electricity</li>
                                <li>• Avoided emissions: 2+ Gt CO₂/year</li>
                                <li>• Critical for hard-to-decarbonize sectors</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Real-World Example */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Factory className="w-6 h-6 text-amber-400" /> Real-World Success: Ontario
                </h2>
                <div className="bg-gradient-to-r from-red-500/10 to-white/5 border border-red-500/30 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <span className="text-4xl">🍁</span>
                        <div className="space-y-4">
                            <p className="text-slate-300 leading-relaxed">
                                In 2003, Ontario's electricity was 25% coal. By 2014, coal was gone — replaced primarily by:
                            </p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-cyan-400">Nuclear</div>
                                    <div className="text-xs text-slate-500">~60% of generation</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-400">Hydro</div>
                                    <div className="text-xs text-slate-500">~25% of generation</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-emerald-400">Wind/Solar</div>
                                    <div className="text-xs text-slate-500">Growing rapidly</div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm">
                                <strong>Result:</strong> One of the largest greenhouse gas reductions from the power sector in North American history —
                                equivalent to taking 7 million cars off the road.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* The Debate */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Thermometer className="w-6 h-6 text-rose-400" /> The Honest Debate
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6">
                        <h4 className="font-bold text-emerald-400 mb-3">Pro-nuclear climate argument</h4>
                        <ul className="text-sm text-slate-300 space-y-2">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> We need all clean energy tools</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Renewables alone face storage limits</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Closing nuclear = more fossil fuels</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> SMRs can decarbonize industry</li>
                        </ul>
                    </div>
                    <div className="bg-rose-900/20 border border-rose-500/30 rounded-xl p-6">
                        <h4 className="font-bold text-rose-400 mb-3">Skeptical perspective</h4>
                        <ul className="text-sm text-slate-300 space-y-2">
                            <li className="flex gap-2"><span className="text-rose-400">•</span> Nuclear is slow and expensive to build</li>
                            <li className="flex gap-2"><span className="text-rose-400">•</span> Renewables + storage may be cheaper</li>
                            <li className="flex gap-2"><span className="text-rose-400">•</span> Waste and safety concerns remain</li>
                            <li className="flex gap-2"><span className="text-rose-400">•</span> Money could go to faster solutions</li>
                        </ul>
                    </div>
                </div>
                <p className="text-slate-400 text-sm text-center">
                    This is a genuine policy debate. We present both sides so you can form your own view.
                </p>
            </motion.section>

            {/* Bottom Line */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 text-center"
            >
                <h3 className="text-xl font-bold text-white mb-4">The Scientific Consensus</h3>
                <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Most climate scientists and energy agencies agree: <strong>nuclear is a low-carbon energy source</strong>
                    that can contribute to addressing climate change. The debate is about cost, speed, and priorities — not whether nuclear is clean.
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
                        <p className="text-sm text-slate-400 mt-1">Full comparison of all major energy options</p>
                    </Link>
                    <Link
                        to="/pros-and-challenges"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">Pros & Challenges</h3>
                        <p className="text-sm text-slate-400 mt-1">Balanced look at nuclear energy trade-offs</p>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
