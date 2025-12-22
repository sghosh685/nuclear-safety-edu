import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Atom, AlertTriangle, ShieldCheck, BookOpen, HelpCircle, Scale, Zap } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const startHereSteps = [
    { step: 1, title: 'The Basics', subtitle: 'What is nuclear energy?', link: '/basics', icon: Zap, color: 'blue' },
    { step: 2, title: 'How It Works', subtitle: 'Reactor technology explained', link: '/reactors', icon: Atom, color: 'cyan' },
    { step: 3, title: 'What Could Go Wrong', subtitle: 'Historical accidents & lessons', link: '/accidents', icon: AlertTriangle, color: 'amber' },
    { step: 4, title: 'How We Stay Safe', subtitle: 'Safety principles & culture', link: '/safety', icon: ShieldCheck, color: 'emerald' },
];

export const HomePage = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-20"
        >
            {/* Hero Section - Enhanced */}
            <section className="text-center space-y-8 pt-8 pb-8 relative overflow-hidden">
                {/* Background atom animation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        className="w-96 h-96 rounded-full border border-blue-500/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500/30 rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                    <motion.div
                        className="absolute w-72 h-72 rounded-full border border-cyan-500/10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-500/30 rounded-full"
                        />
                    </motion.div>
                    <motion.div
                        className="absolute w-48 h-48 rounded-full border border-teal-500/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-teal-500/30 rounded-full"
                        />
                    </motion.div>
                </div>

                <motion.h1
                    variants={itemVariants}
                    className="relative text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 tracking-tight"
                >
                    Understanding Nuclear Energy
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="relative max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed px-4"
                >
                    Plain-language nuclear education for everyone. Not industry PR. Not fear-mongering.
                    Learn how nuclear power works, what the real risks are, and how safety systems protect us.
                </motion.p>

                {/* Key Stats */}
                <motion.div
                    variants={itemVariants}
                    className="relative flex flex-wrap justify-center gap-6 md:gap-12 pt-4"
                >
                    {[
                        { value: '10%', label: 'of world electricity', color: 'blue' },
                        { value: '440+', label: 'reactors operating', color: 'cyan' },
                        { value: '70+', label: 'years of experience', color: 'teal' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="text-center px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.15 }}
                        >
                            <div className={`text-3xl md:text-4xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                            <div className="text-xs md:text-sm text-slate-500 mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Start Here - Guided Path */}
            <motion.section variants={itemVariants} className="space-y-6">
                <div className="text-center">
                    <span className="inline-block px-4 py-1 bg-blue-500/10 text-blue-400 text-sm font-bold rounded-full border border-blue-500/30 mb-3">
                        NEW TO NUCLEAR?
                    </span>
                    <h2 className="text-3xl font-bold text-white">Start Here</h2>
                    <p className="text-slate-400 mt-2">Follow this path for a complete understanding</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {startHereSteps.map(({ step, title, subtitle, link, icon: Icon, color }) => (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: step * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                        >
                            <Link
                                to={link}
                                className={`block p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-${color}-500/50 transition-all relative overflow-hidden group`}
                            >
                                {/* Step Number */}
                                <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-${color}-500/10 flex items-center justify-center text-${color}-400 text-sm font-bold`}>
                                    {step}
                                </div>

                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center mb-4 text-${color}-400 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                                <p className="text-sm text-slate-500">{subtitle}</p>

                                <div className={`mt-4 flex items-center text-${color}-400 text-sm font-medium`}>
                                    Start <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Quick Access Cards */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">Explore by Topic</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants} className="group">
                        <Link to="/faq" className="block p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-purple-500/50 hover:bg-slate-900 transition-all">
                            <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                                <HelpCircle className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-100">Myths vs Facts</h3>
                            <p className="text-slate-400 text-sm">
                                Can a reactor explode like a bomb? Is all radiation deadly? Get clear answers.
                            </p>
                            <div className="mt-4 flex items-center text-purple-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                See FAQs <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="group">
                        <Link to="/pros-and-challenges" className="block p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900 transition-all">
                            <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                                <Scale className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-100">Pros & Challenges</h3>
                            <p className="text-slate-400 text-sm">
                                An honest look at nuclear's benefits and real challenges — no spin.
                            </p>
                            <div className="mt-4 flex items-center text-blue-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                Both sides <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="group">
                        <Link to="/quiz" className="block p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-green-500/50 hover:bg-slate-900 transition-all">
                            <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-400 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-100">Test Your Knowledge</h3>
                            <p className="text-slate-400 text-sm">
                                Interactive quizzes on reactors, safety, and historical events.
                            </p>
                            <div className="mt-4 flex items-center text-green-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                Take Quiz <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Trust Bar */}
            <motion.section
                variants={itemVariants}
                className="text-center py-8 border-t border-slate-800"
            >
                <p className="text-slate-500 text-sm mb-4">
                    Content based on information from trusted sources
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-slate-600">
                    {['IAEA', 'NRC', 'CNSC', 'EIA'].map((org) => (
                        <span key={org} className="font-semibold">{org}</span>
                    ))}
                </div>
                <Link to="/about" className="inline-block mt-4 text-blue-400 text-sm hover:underline">
                    Learn about our approach →
                </Link>
            </motion.section>
        </motion.div>
    );
};
