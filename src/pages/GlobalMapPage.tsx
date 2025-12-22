import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, TrendingUp, TrendingDown, Minus, ArrowRight, MapPin } from 'lucide-react';

interface CountryData {
    country: string;
    reactors: number;
    trend: 'expanding' | 'stable' | 'phasing-out';
    notes: string;
    region: string;
}

const nuclearCountries: CountryData[] = [
    // Major Nuclear Countries
    { country: 'United States', reactors: 93, trend: 'stable', notes: 'Largest fleet, some new builds', region: 'North America' },
    { country: 'France', reactors: 56, trend: 'stable', notes: '~70% of electricity, building new EPRs', region: 'Europe' },
    { country: 'China', reactors: 55, trend: 'expanding', notes: 'Fastest growth, 20+ under construction', region: 'Asia' },
    { country: 'Russia', reactors: 37, trend: 'expanding', notes: 'Exports reactors worldwide', region: 'Europe/Asia' },
    { country: 'Japan', reactors: 33, trend: 'stable', notes: 'Restarting after Fukushima', region: 'Asia' },
    { country: 'South Korea', reactors: 25, trend: 'expanding', notes: 'Exporting APR1400 design', region: 'Asia' },
    { country: 'India', reactors: 23, trend: 'expanding', notes: 'Major expansion planned', region: 'Asia' },
    { country: 'Canada', reactors: 19, trend: 'stable', notes: 'CANDU technology, SMR projects', region: 'North America' },
    { country: 'Ukraine', reactors: 15, trend: 'stable', notes: 'Major contributor to grid', region: 'Europe' },
    { country: 'United Kingdom', reactors: 9, trend: 'expanding', notes: 'Building Hinkley Point C', region: 'Europe' },
    { country: 'Sweden', reactors: 6, trend: 'stable', notes: '40% of electricity', region: 'Europe' },
    { country: 'Belgium', reactors: 5, trend: 'phasing-out', notes: 'Phase-out planned by 2035', region: 'Europe' },
    { country: 'Germany', reactors: 0, trend: 'phasing-out', notes: 'Completed phase-out in 2023', region: 'Europe' },
    { country: 'UAE', reactors: 4, trend: 'expanding', notes: 'Barakah plant (Korean design)', region: 'Middle East' },
    { country: 'Finland', reactors: 5, trend: 'expanding', notes: 'Olkiluoto 3, first DGR', region: 'Europe' },
];

const globalStats = [
    { label: 'Operating Reactors', value: '440', color: 'emerald' },
    { label: 'Countries with Nuclear', value: '32', color: 'blue' },
    { label: 'Under Construction', value: '60+', color: 'amber' },
    { label: 'Share of Global Electricity', value: '~10%', color: 'purple' },
];

const TrendIcon = ({ trend }: { trend: 'expanding' | 'stable' | 'phasing-out' }) => {
    if (trend === 'expanding') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (trend === 'phasing-out') return <TrendingDown className="w-4 h-4 text-rose-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
};

export const GlobalMapPage = () => {
    const regions = ['North America', 'Europe', 'Asia', 'Europe/Asia', 'Middle East'];

    return (
        <motion.div
            className="max-w-5xl mx-auto space-y-16"
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
                    <Globe className="w-16 h-16 text-blue-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Nuclear Power Worldwide</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Nuclear energy powers countries across all continents. Here's the global picture.
                </p>
            </section>

            {/* Global Stats */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {globalStats.map((stat, i) => (
                    <div key={i} className={`bg-${stat.color}-900/20 border border-${stat.color}-500/30 rounded-xl p-5 text-center`}>
                        <div className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                        <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </motion.section>

            {/* Trend Legend */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-400">Expanding</span>
                </div>
                <div className="flex items-center gap-2">
                    <Minus className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">Stable</span>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                    <span className="text-slate-400">Phasing Out</span>
                </div>
            </div>

            {/* Countries by Region */}
            {regions.map((region) => {
                const countriesInRegion = nuclearCountries.filter(c => c.region === region);
                if (countriesInRegion.length === 0) return null;

                return (
                    <motion.section
                        key={region}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-slate-400" /> {region}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {countriesInRegion.map((country, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-white">{country.country}</h3>
                                        <TrendIcon trend={country.trend} />
                                    </div>
                                    <div className="text-2xl font-bold text-blue-400 mb-1">
                                        {country.reactors} <span className="text-sm font-normal text-slate-500">reactors</span>
                                    </div>
                                    <p className="text-xs text-slate-500">{country.notes}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                );
            })}

            {/* Canada Highlight */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-500/10 to-white/5 border border-red-500/30 rounded-2xl p-8"
            >
                <div className="flex items-start gap-4">
                    <span className="text-4xl">🍁</span>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Canada's Role</h3>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• <strong>CANDU technology</strong> developed and exported to 6 countries</li>
                            <li>• <strong>World's largest uranium producer</strong> (Saskatchewan)</li>
                            <li>• <strong>Leading SMR development</strong> — first grid-connected SMR operational by 2026</li>
                            <li>• <strong>Medical isotopes</strong> — supplies ~50% of world's medical imaging isotopes</li>
                        </ul>
                        <Link
                            to="/canada"
                            className="inline-flex items-center mt-4 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                        >
                            Learn about Nuclear in Canada <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* Key Trends */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                <h2 className="text-2xl font-bold text-white">Key Global Trends</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-5">
                        <h4 className="font-bold text-emerald-400 mb-2">Expansion</h4>
                        <p className="text-sm text-slate-300">
                            China, India, and Russia are leading new construction. UAE recently joined as a nuclear nation.
                            Many countries cite climate goals as the driver.
                        </p>
                    </div>
                    <div className="bg-rose-900/20 border border-rose-500/30 rounded-xl p-5">
                        <h4 className="font-bold text-rose-400 mb-2">Phase-outs</h4>
                        <p className="text-sm text-slate-300">
                            Germany completed its phase-out in 2023. Belgium plans to follow.
                            However, some countries are reconsidering due to energy security and climate.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Source */}
            <p className="text-center text-xs text-slate-600">
                Data: IAEA PRIS, World Nuclear Association (as of 2024). Reactor counts are approximate operating reactors.
            </p>
        </motion.div>
    );
};
