import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Atom, Zap, Sun, Heart, Plane, Home, ArrowRight, Radio, Activity, Shield } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const radiationSources = [
    { icon: Sun, name: 'Cosmic rays', dose: '0.4 mSv/year', desc: 'From the sun and outer space' },
    { icon: Home, name: 'Radon in homes', dose: '2.0 mSv/year', desc: 'Natural gas from the ground' },
    { icon: Heart, name: 'Human body', dose: '0.3 mSv/year', desc: 'Potassium-40 in your bones' },
    { icon: Plane, name: 'Flying', dose: '0.03 mSv/flight', desc: 'Cross-country flight' },
];

const medicalSources = [
    { name: 'Chest X-ray', dose: '0.1 mSv' },
    { name: 'Dental X-ray', dose: '0.005 mSv' },
    { name: 'CT scan (chest)', dose: '7 mSv' },
    { name: 'Mammogram', dose: '0.4 mSv' },
];

export const NuclearBasicsPage = () => {
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
                    <Atom className="w-16 h-16 text-blue-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Nuclear Basics</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Understanding atoms, radiation, and how nuclear plants make electricity — in plain language.
                </p>
            </section>

            {/* What is Nuclear Energy */}
            <motion.section {...fadeInUp} className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" /> What is Nuclear Energy?
                </h2>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
                    <p className="text-slate-300 leading-relaxed">
                        Everything is made of tiny particles called <strong>atoms</strong>. Most of the time, atoms are stable.
                        But some atoms (like uranium) are <strong>unstable</strong> — they naturally break apart over time, releasing energy.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        <strong>Nuclear fission</strong> is when we deliberately split these unstable atoms. When a uranium atom splits,
                        it releases a huge amount of heat. This heat boils water, the steam spins a turbine, and the turbine generates electricity.
                    </p>
                    <div className="theme-dark bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-4">
                        <p className="text-blue-300 text-sm">
                            <strong>Key point:</strong> A single uranium pellet (the size of your fingertip) contains as much energy as 17,000 cubic feet of natural gas or 1,780 pounds of coal.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* How a Plant Works - Simplified Steps */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-6 h-6 text-emerald-400" /> How a Nuclear Plant Makes Electricity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { step: 1, title: 'Fission', desc: 'Uranium atoms split, releasing heat', color: 'text-yellow-400' },
                        { step: 2, title: 'Heat', desc: 'Heat boils water into steam', color: 'text-orange-400' },
                        { step: 3, title: 'Turbine', desc: 'Steam spins a turbine', color: 'text-blue-400' },
                        { step: 4, title: 'Electricity', desc: 'Turbine powers a generator', color: 'text-emerald-400' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center relative"
                        >
                            <div className={`text-4xl font-bold ${item.color} mb-2`}>{item.step}</div>
                            <h3 className="font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                            {i < 3 && (
                                <ArrowRight className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-slate-600 w-6 h-6 z-10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Radiation in Everyday Life */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Radio className="w-6 h-6 text-purple-400" /> Radiation in Everyday Life
                </h2>
                <p className="text-slate-400">
                    Radiation is natural and everywhere. You receive about <strong>2-3 millisieverts (mSv) per year</strong> just from living on Earth.
                    Here's where it comes from:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {radiationSources.map((source, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-purple-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                <source.icon className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-white">{source.name}</h3>
                                    <span className="text-sm font-mono text-purple-400">{source.dose}</span>
                                </div>
                                <p className="text-xs text-slate-500">{source.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Medical Radiation */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-4">Medical Procedures</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {medicalSources.map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xl font-bold text-blue-400">{item.dose}</div>
                                <div className="text-xs text-slate-500">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="theme-dark bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4">
                    <p className="text-emerald-300 text-sm">
                        <strong>Perspective:</strong> Living near a nuclear plant for one year gives you less radiation (0.01 mSv)
                        than eating 100 bananas (0.01 mSv) or taking one cross-country flight (0.03 mSv).
                    </p>
                </div>
            </motion.section>

            {/* Defense in Depth */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-6 h-6 text-emerald-400" /> How Nuclear Plants Stay Safe
                </h2>
                <p className="text-slate-400">
                    Nuclear safety uses "defense in depth" — multiple barriers so that if one fails, others still protect you:
                </p>

                <div className="relative">
                    {[
                        { layer: 5, name: 'Emergency Plans', desc: 'Evacuation plans, responders ready', color: 'bg-blue-500/20 border-blue-500/40' },
                        { layer: 4, name: 'Containment Building', desc: '1-meter thick concrete & steel', color: 'bg-slate-700/50 border-slate-600' },
                        { layer: 3, name: 'Reactor Vessel', desc: 'Thick steel pressure vessel', color: 'bg-slate-600/50 border-slate-500' },
                        { layer: 2, name: 'Fuel Cladding', desc: 'Metal tubes around fuel pellets', color: 'bg-amber-600/30 border-amber-500/50' },
                        { layer: 1, name: 'Fuel Pellets', desc: 'Ceramic uranium holds most radioactivity', color: 'bg-amber-500/50 border-amber-400' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            className={`${item.color} border rounded-xl p-4 mb-2 ml-${i * 4}`}
                            style={{ marginLeft: `${i * 20}px` }}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-xs text-slate-400">Layer {item.layer}</span>
                                    <h4 className="font-bold text-white">{item.name}</h4>
                                </div>
                                <p className="text-xs text-slate-400 text-right max-w-[150px]">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Next Steps */}
            <section className="border-t border-slate-800 pt-8">
                <p className="text-slate-500 text-sm mb-4">Continue Learning</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/reactors"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">How Different Reactors Work</h3>
                        <p className="text-sm text-slate-400 mt-1">PWR, BWR, CANDU, and more</p>
                    </Link>
                    <Link
                        to="/faq"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">Common Questions</h3>
                        <p className="text-sm text-slate-400 mt-1">Myths vs facts about nuclear</p>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
