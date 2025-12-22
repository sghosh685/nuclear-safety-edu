import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Wind, Sun, Droplet, Flame, Atom, Check, X, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface EnergySource {
    name: string;
    icon: LucideIcon;
    color: string;
    carbon: string;
    carbonRating: 'low' | 'medium' | 'high';
    reliability: string;
    reliabilityRating: 'low' | 'medium' | 'high';
    landUse: string;
    landRating: 'low' | 'medium' | 'high';
    waste: string;
    wasteRating: 'low' | 'medium' | 'high';
    cost: string;
    costRating: 'low' | 'medium' | 'high';
    bestFor: string;
}

const energySources: EnergySource[] = [
    {
        name: 'Nuclear',
        icon: Atom,
        color: 'blue',
        carbon: '12g/kWh',
        carbonRating: 'low',
        reliability: '24/7 baseload',
        reliabilityRating: 'high',
        landUse: '1 km²/TWh',
        landRating: 'low',
        waste: 'Small, contained',
        wasteRating: 'medium',
        cost: 'High build, low run',
        costRating: 'medium',
        bestFor: 'Stable, clean baseload power in any weather',
    },
    {
        name: 'Solar',
        icon: Sun,
        color: 'yellow',
        carbon: '45g/kWh',
        carbonRating: 'low',
        reliability: 'Daytime only',
        reliabilityRating: 'low',
        landUse: '20 km²/TWh',
        landRating: 'high',
        waste: 'Panel disposal',
        wasteRating: 'medium',
        cost: 'Dropping fast',
        costRating: 'low',
        bestFor: 'Sunny regions, rooftops, distributed power',
    },
    {
        name: 'Wind',
        icon: Wind,
        color: 'cyan',
        carbon: '11g/kWh',
        carbonRating: 'low',
        reliability: 'Variable',
        reliabilityRating: 'low',
        landUse: '70 km²/TWh',
        landRating: 'high',
        waste: 'Blade disposal',
        wasteRating: 'low',
        cost: 'Competitive',
        costRating: 'low',
        bestFor: 'Windy regions, offshore, paired with storage',
    },
    {
        name: 'Hydro',
        icon: Droplet,
        color: 'blue',
        carbon: '24g/kWh',
        carbonRating: 'low',
        reliability: 'Seasonal',
        reliabilityRating: 'high',
        landUse: 'Reservoir impact',
        landRating: 'high',
        waste: 'Ecological impact',
        wasteRating: 'medium',
        cost: 'Low once built',
        costRating: 'low',
        bestFor: 'Regions with rivers, storage, balancing grids',
    },
    {
        name: 'Natural Gas',
        icon: Flame,
        color: 'orange',
        carbon: '490g/kWh',
        carbonRating: 'high',
        reliability: 'On-demand',
        reliabilityRating: 'high',
        landUse: '2 km²/TWh',
        landRating: 'low',
        waste: 'CO₂, methane',
        wasteRating: 'high',
        cost: 'Low build',
        costRating: 'low',
        bestFor: 'Peaking, backup, transitional use',
    },
    {
        name: 'Coal',
        icon: Flame,
        color: 'gray',
        carbon: '820g/kWh',
        carbonRating: 'high',
        reliability: 'On-demand',
        reliabilityRating: 'high',
        landUse: '10 km²/TWh',
        landRating: 'medium',
        waste: 'Ash, CO₂, pollution',
        wasteRating: 'high',
        cost: 'Cheap fuel',
        costRating: 'low',
        bestFor: 'Being phased out globally for health/climate',
    },
];

const RatingIcon = ({ rating }: { rating: 'low' | 'medium' | 'high' }) => {
    if (rating === 'low') return <Check className="w-4 h-4 text-emerald-400" />;
    if (rating === 'medium') return <Minus className="w-4 h-4 text-amber-400" />;
    return <X className="w-4 h-4 text-rose-400" />;
};

export const CompareEnergyPage = () => {
    return (
        <motion.div
            className="max-w-6xl mx-auto space-y-16"
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
                    <Zap className="w-16 h-16 text-yellow-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Compare Energy Sources</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Every energy source has trade-offs. Here's an honest comparison to help you understand where each fits best.
                </p>
            </section>

            {/* Comparison Table */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto"
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800">
                            <th className="text-left p-4 text-slate-400 font-medium">Source</th>
                            <th className="text-left p-4 text-slate-400 font-medium">Carbon</th>
                            <th className="text-left p-4 text-slate-400 font-medium">Reliability</th>
                            <th className="text-left p-4 text-slate-400 font-medium">Land Use</th>
                            <th className="text-left p-4 text-slate-400 font-medium">Waste</th>
                            <th className="text-left p-4 text-slate-400 font-medium">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {energySources.map((source, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="border-b border-slate-800/50 hover:bg-slate-900/50"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <source.icon className={`w-5 h-5 text-${source.color}-400`} />
                                        <span className="font-medium text-white">{source.name}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <RatingIcon rating={source.carbonRating} />
                                        <span className="text-slate-300">{source.carbon}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <RatingIcon rating={source.reliabilityRating} />
                                        <span className="text-slate-300">{source.reliability}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <RatingIcon rating={source.landRating} />
                                        <span className="text-slate-300">{source.landUse}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <RatingIcon rating={source.wasteRating} />
                                        <span className="text-slate-300">{source.waste}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <RatingIcon rating={source.costRating} />
                                        <span className="text-slate-300">{source.cost}</span>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-xs text-slate-500 mt-2">
                    ✓ = advantage, − = neutral, ✗ = challenge. Data from IPCC, NREL, Our World in Data.
                </p>
            </motion.section>

            {/* Best For Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white">When Is Each Best?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {energySources.map((source, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <source.icon className={`w-5 h-5 text-${source.color}-400`} />
                                <span className="font-bold text-white">{source.name}</span>
                            </div>
                            <p className="text-sm text-slate-400">{source.bestFor}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Canada Context */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-red-500/10 to-white/5 border border-red-500/30 rounded-2xl p-8 space-y-4"
            >
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🍁</span>
                    <h2 className="text-2xl font-bold text-white">Canada's Energy Mix</h2>
                </div>
                <p className="text-slate-300 leading-relaxed">
                    Canada is fortunate to have one of the cleanest electricity grids in the world:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { source: 'Hydro', percent: '60%' },
                        { source: 'Nuclear', percent: '15%' },
                        { source: 'Gas', percent: '11%' },
                        { source: 'Wind/Solar', percent: '7%' },
                    ].map((item, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-bold text-red-400">{item.percent}</div>
                            <div className="text-sm text-slate-500">{item.source}</div>
                        </div>
                    ))}
                </div>
                <p className="text-slate-400 text-sm">
                    Ontario eliminated coal in 2014 by ramping up nuclear and renewables — one of the world's largest greenhouse gas reductions from the power sector.
                </p>
            </motion.section>

            {/* Key Insight */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 text-center"
            >
                <h3 className="text-xl font-bold text-white mb-4">The Key Insight</h3>
                <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    There is no single "best" energy source. A clean, reliable grid typically combines:
                    <br /><br />
                    <strong className="text-blue-400">Nuclear or hydro</strong> for 24/7 baseload +
                    <strong className="text-yellow-400"> Solar and wind</strong> for abundant clean energy +
                    <strong className="text-amber-400"> Storage or gas</strong> for flexibility.
                    <br /><br />
                    The debate isn't "nuclear OR renewables" — it's how to combine them effectively for a net-zero future.
                </p>
            </motion.section>

            {/* Next Steps */}
            <section className="border-t border-slate-800 pt-8">
                <p className="text-slate-500 text-sm mb-4">Continue Learning</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/climate"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">Nuclear & Climate</h3>
                        <p className="text-sm text-slate-400 mt-1">How nuclear fits into net-zero pathways</p>
                    </Link>
                    <Link
                        to="/waste"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">Nuclear Waste Explained</h3>
                        <p className="text-sm text-slate-400 mt-1">The full picture on waste management</p>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
