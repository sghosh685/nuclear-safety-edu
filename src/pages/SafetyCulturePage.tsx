import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Shield, AlertTriangle, MessageCircle, Eye, CheckCircle, History } from 'lucide-react';

const safetyCulturePrinciples = [
    {
        icon: Users,
        title: 'Everyone Is Responsible',
        description: 'Safety is not just the job of the safety department — it belongs to everyone from the CEO to the newest technician.',
        example: 'Any employee can stop work if they see a safety concern, without fear of punishment.',
    },
    {
        icon: MessageCircle,
        title: 'Questioning Attitude',
        description: 'Staff are trained to ask "why?" and challenge assumptions. Complacency is the enemy of safety.',
        example: '"That\'s how we\'ve always done it" is never an acceptable answer if something seems wrong.',
    },
    {
        icon: Eye,
        title: 'Conservative Decision-Making',
        description: 'When uncertain, choose the safer option. Don\'t rush or take shortcuts under pressure.',
        example: 'Delay a restart by hours rather than skip a check that might reveal a problem.',
    },
    {
        icon: AlertTriangle,
        title: 'Near-Miss Reporting',
        description: 'Report and learn from close calls, not just actual incidents. Every near-miss is a lesson.',
        example: 'A worker trips over a cable but isn\'t hurt — still reported so the cable gets secured.',
    },
    {
        icon: Shield,
        title: 'Peer Review & Oversight',
        description: 'Regular checks by colleagues, supervisors, and external reviewers catch errors before they become problems.',
        example: 'WANO peer reviews every plant every 4 years with international teams.',
    },
];

const beforeAfter = [
    {
        era: 'Before TMI & Chernobyl',
        items: [
            'Operators sometimes overrode safety systems',
            'Production schedules could pressure safety decisions',
            'Limited international cooperation',
            'Near-misses often went unreported',
        ],
        color: 'rose',
    },
    {
        era: 'After Major Accidents',
        items: [
            'Safety culture formally defined and measured',
            'Stop-work authority for all employees',
            'WANO created for global peer reviews',
            'Mandatory near-miss reporting programs',
        ],
        color: 'emerald',
    },
];

export const SafetyCulturePage = () => {
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
                    <Users className="w-16 h-16 text-emerald-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Nuclear Safety Culture</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Safety isn't just hardware — it's how people think, communicate, and make decisions every day.
                </p>
            </section>

            {/* What Is Safety Culture */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8"
            >
                <h2 className="text-2xl font-bold text-emerald-400 mb-4">What Is Safety Culture?</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                    Safety culture is an organization's shared <strong>attitudes, values, and behaviors</strong> that prioritize safety
                    above production, cost, or schedule. It's the answer to: "What happens when no one is watching?"
                </p>
                <p className="text-slate-400 text-sm">
                    A strong safety culture means employees feel empowered to raise concerns, question procedures,
                    and stop work if something seems wrong — without fear of blame or punishment.
                </p>
            </motion.section>

            {/* Core Principles */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white">Core Principles in Practice</h2>
                <div className="space-y-4">
                    {safetyCulturePrinciples.map((principle, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <principle.icon className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-2">{principle.title}</h3>
                                    <p className="text-sm text-slate-400 mb-3">{principle.description}</p>
                                    <div className="bg-slate-800/50 rounded-lg p-3">
                                        <p className="text-xs text-slate-300">
                                            <strong className="text-emerald-400">Example:</strong> {principle.example}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Before & After */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <History className="w-6 h-6 text-slate-400" /> How Safety Culture Evolved
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {beforeAfter.map((era, i) => (
                        <div key={i} className={`bg-${era.color}-900/20 border border-${era.color}-500/30 rounded-xl p-6`}>
                            <h3 className={`font-bold text-${era.color}-400 mb-4`}>{era.era}</h3>
                            <ul className="space-y-2">
                                {era.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                                        {era.color === 'emerald' ? (
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        ) : (
                                            <span className="text-rose-400">✗</span>
                                        )}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* How It's Measured */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-4"
            >
                <h2 className="text-xl font-bold text-white">How Safety Culture Is Measured</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Safety Indicators', desc: 'Track near-misses, corrective actions, training completion' },
                        { title: 'Employee Surveys', desc: 'Anonymous surveys on speaking up, management commitment' },
                        { title: 'Peer Reviews', desc: 'WANO and IAEA teams visit and provide independent assessment' },
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-slate-800/50 rounded-lg">
                            <h4 className="font-semibold text-blue-400 mb-1">{item.title}</h4>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Canada */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-red-500/10 to-white/5 border border-red-500/30 rounded-2xl p-6"
            >
                <div className="flex items-start gap-3">
                    <span className="text-3xl">🍁</span>
                    <div>
                        <h3 className="font-bold text-white mb-2">Safety Culture in Canada</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            The CNSC monitors safety culture at Canadian plants, not just equipment.
                            Licensees must demonstrate a positive safety culture through regular assessments,
                            training, and reporting. The CNSC has enforcement authority if culture degrades.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Bottom Line */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 text-center"
            >
                <h3 className="text-xl font-bold text-white mb-4">The Bottom Line</h3>
                <p className="text-slate-300 max-w-2xl mx-auto">
                    The most advanced safety systems in the world are useless if the people operating them
                    cut corners, ignore warnings, or fear speaking up. <strong>Safety culture ensures humans are as reliable as the equipment.</strong>
                </p>
            </motion.section>

            {/* Next Steps */}
            <section className="border-t border-slate-800 pt-8">
                <p className="text-slate-500 text-sm mb-4">Continue Learning</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/safety"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">IAEA Safety Principles</h3>
                        <p className="text-sm text-slate-400 mt-1">The formal framework behind safety culture</p>
                    </Link>
                    <Link
                        to="/accidents"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500/50 transition-colors group"
                    >
                        <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">Learn from Accidents</h3>
                        <p className="text-sm text-slate-400 mt-1">How failures drove safety culture improvements</p>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};
