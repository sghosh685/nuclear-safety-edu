import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Leaf, Clock, ShieldCheck, AlertTriangle, Trash2, DollarSign, Users, ArrowRight, Scale } from 'lucide-react';

const benefits = [
    {
        icon: Leaf,
        title: 'Low Carbon Emissions',
        description: 'Nuclear power produces almost no greenhouse gases during operation. A typical nuclear plant prevents millions of tons of CO₂ per year compared to coal.',
        stat: '~12g CO₂/kWh',
        statLabel: 'lifecycle emissions (similar to wind)',
    },
    {
        icon: Zap,
        title: 'Reliable Baseload Power',
        description: 'Unlike solar and wind, nuclear plants run 24/7 regardless of weather. They provide steady "baseload" power that keeps the grid stable.',
        stat: '~93%',
        statLabel: 'capacity factor (highest of any source)',
    },
    {
        icon: Clock,
        title: 'High Energy Density',
        description: 'A single uranium fuel pellet (the size of a fingertip) contains as much energy as 17,000 cubic feet of natural gas or 1,780 pounds of coal.',
        stat: '1 pellet = 17,000 ft³ gas',
        statLabel: 'energy equivalence',
    },
    {
        icon: ShieldCheck,
        title: 'Strong Safety Record',
        description: 'Per unit of energy produced, nuclear has caused fewer deaths than coal, oil, gas, or even hydropower. Modern designs include passive safety systems.',
        stat: '0.03 deaths/TWh',
        statLabel: 'vs 24.6 for coal (Our World in Data)',
    },
];

const challenges = [
    {
        icon: AlertTriangle,
        title: 'Accidents and Public Fear',
        description: 'Though rare, accidents like Chernobyl and Fukushima caused lasting fear. Public perception often overestimates nuclear risks compared to statistical reality.',
        link: '/accidents',
        linkText: 'Learn about accidents',
    },
    {
        icon: Trash2,
        title: 'Radioactive Waste',
        description: 'Spent nuclear fuel remains radioactive for thousands of years. While the volume is small, permanent disposal solutions (like deep geological repositories) are still being built.',
        link: null,
        linkText: null,
    },
    {
        icon: DollarSign,
        title: 'High Upfront Costs',
        description: 'Nuclear plants are expensive to build ($10–20 billion) and often face delays. However, they are cheap to operate for 40–60 years once running.',
        link: null,
        linkText: null,
    },
    {
        icon: Users,
        title: 'Proliferation Concerns',
        description: 'The same technology that powers reactors can theoretically be misused for weapons. Strict international safeguards (IAEA) monitor nuclear materials.',
        link: null,
        linkText: null,
    },
];

export const ProsAndChallengesPage = () => {
    return (
        <motion.div
            className="max-w-5xl mx-auto space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <section className="text-center space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <Scale className="w-16 h-16 text-slate-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Nuclear Energy: The Full Picture
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Every energy source has trade-offs. Here is an honest look at what nuclear power does well, and where it faces real challenges.
                </p>
            </section>

            {/* Benefits Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-400">Benefits</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                                    <div className="pt-2 border-t border-slate-800">
                                        <div className="text-xl font-bold text-emerald-400">{item.stat}</div>
                                        <div className="text-xs text-slate-500">{item.statLabel}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Challenges Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-amber-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-amber-400">Challenges</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {challenges.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-6 h-6 text-amber-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                                    {item.link && (
                                        <Link
                                            to={item.link}
                                            className="inline-flex items-center text-sm text-amber-400 hover:text-amber-300 transition-colors"
                                        >
                                            {item.linkText} <ArrowRight className="w-3 h-3 ml-1" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Bottom Line */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 text-center space-y-4"
            >
                <h3 className="text-2xl font-bold text-white">The Bottom Line</h3>
                <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Nuclear power is a low-carbon, reliable energy source with an excellent safety record <em>per unit of energy</em>.
                    Its challenges — waste, cost, and public trust — are real but manageable with proper regulation and technology.
                    Whether nuclear is "worth it" depends on how societies weigh these trade-offs against climate goals and energy needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link
                        to="/safety"
                        className="inline-flex items-center px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-medium transition-colors"
                    >
                        Learn safety principles
                    </Link>
                    <Link
                        to="/faq"
                        className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-colors"
                    >
                        Common questions <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
            </motion.section>
        </motion.div>
    );
};
