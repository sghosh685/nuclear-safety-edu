import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Building, Users, Scale, TrendingDown, ShieldOff, Clock, Zap, AlertTriangle, Trash, ArrowRight, Lightbulb, BookOpen } from 'lucide-react';
import { safetyPrinciples } from '../data/safetyPrinciples';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Shield,
    Building,
    Users,
    Scale,
    TrendingDown,
    ShieldOff,
    Clock,
    Zap,
    AlertTriangle,
    Trash,
};

export const SafetyPage = () => {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300">
                    Safety Principles
                </h1>
                <p className="text-slate-400 text-lg">
                    The IAEA Fundamental Safety Principles provide the basis for nuclear safety worldwide. Here they are explained in plain language.
                </p>
            </div>

            {/* Quick Overview Box */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-blue-400">If You Only Have 5 Minutes</h3>
                </div>
                <p className="text-slate-200 leading-relaxed mb-4">
                    Nuclear safety boils down to: <strong>the operator is responsible</strong> for keeping things safe, the <strong>government watches over them</strong>, and everyone uses the concept of <strong>"defense in depth"</strong> — multiple barriers so that if one fails, others keep us safe.
                </p>
                <p className="text-slate-400 text-sm">
                    Scroll down to learn about all 10 principles with real-world examples.
                </p>
            </div>

            {/* Principles Grid */}
            <div className="space-y-6">
                {safetyPrinciples.map((principle, index) => {
                    const Icon = principle.icon ? iconMap[principle.icon] || Shield : Shield;
                    return (
                        <motion.div
                            key={principle.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all"
                        >
                            <div className="p-6 md:p-8">
                                {/* Header Row */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-400">
                                                {principle.id}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            {principle.plainTitle || principle.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Simple Explanation */}
                                {principle.simpleExplanation && (
                                    <p className="text-slate-200 text-lg leading-relaxed mb-6">
                                        {principle.simpleExplanation}
                                    </p>
                                )}

                                {/* Real Life Example */}
                                {principle.realLifeExample && (
                                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BookOpen className="w-4 h-4 text-slate-400" />
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Real-World Example</span>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            {principle.realLifeExample}
                                        </p>
                                    </div>
                                )}

                                {/* Formal Definition (collapsible feel) */}
                                <details className="mt-4 group">
                                    <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                                        See formal IAEA definition →
                                    </summary>
                                    <p className="mt-2 text-sm text-slate-400 italic pl-4 border-l-2 border-slate-700">
                                        {principle.description}
                                    </p>
                                </details>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Next Step Card */}
            <div className="border-t border-slate-800 pt-8 max-w-3xl mx-auto">
                <p className="text-slate-500 text-sm mb-4">Continue Learning</p>
                <Link
                    to="/quiz"
                    className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all group"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Test Your Knowledge</p>
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                Take the Safety Principles Quiz
                            </h3>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                </Link>
            </div>
        </div>
    );
};
