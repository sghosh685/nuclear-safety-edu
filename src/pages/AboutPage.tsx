import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Scale, MessageCircle, ExternalLink, CheckCircle, Info, ArrowRight } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const AboutPage = () => {
    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-16"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
        >
            {/* Hero */}
            <motion.section variants={fadeInUp} className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Why This Site Exists
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                    Nuclear energy is complicated. Public discussion is often either <span className="text-blue-400">too promotional</span> or <span className="text-rose-400">too fearful</span>.
                    We believe you deserve clear, honest explanations — so you can form your own opinion.
                </p>
            </motion.section>

            {/* Mission */}
            <motion.section variants={fadeInUp} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-rose-400" /> Our Mission
                </h2>
                <div className="space-y-4 text-slate-200 leading-relaxed">
                    <p>
                        This is an <strong>educational project</strong> to help anyone — students, curious citizens, and lifelong learners — understand nuclear energy and safety in plain language.
                    </p>
                    <p>
                        We are not selling anything. We are not affiliated with any nuclear company or anti-nuclear group.
                        Our goal is to explain <em>how things work</em> and <em>what actually happened</em> in past events,
                        so you can make informed decisions.
                    </p>
                </div>
            </motion.section>

            {/* How We Communicate */}
            <motion.section variants={fadeInUp} className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-emerald-400" /> How We Communicate
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { title: 'Plain Language', desc: 'Short sentences. No jargon without explanation. If a 12-year-old cannot understand it, we rewrite it.' },
                        { title: 'Honest About Uncertainty', desc: 'When something is debated among experts, we say so. We do not pretend to have all the answers.' },
                        { title: 'Respect Your Concerns', desc: 'Fear of radiation is natural. We take your questions seriously, not dismissively.' },
                        { title: 'Show Both Sides', desc: 'Nuclear has real benefits AND real challenges. We present both, clearly.' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Sources */}
            <motion.section variants={fadeInUp} className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-400" /> Our Sources
                </h2>
                <p className="text-slate-300">
                    All content is based on publicly available information from respected organizations:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'IAEA', full: 'International Atomic Energy Agency', url: 'https://www.iaea.org' },
                        { name: 'NRC', full: 'U.S. Nuclear Regulatory Commission', url: 'https://www.nrc.gov' },
                        { name: 'CNSC', full: 'Canadian Nuclear Safety Commission', url: 'https://www.cnsc-ccsn.gc.ca' },
                        { name: 'EIA', full: 'U.S. Energy Information Administration', url: 'https://www.eia.gov' },
                    ].map((source, i) => (
                        <motion.a
                            key={i}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group text-center"
                        >
                            <div className="text-lg font-bold text-blue-400 group-hover:text-blue-300">{source.name}</div>
                            <div className="text-xs text-slate-500 mt-1">{source.full}</div>
                            <ExternalLink className="w-3 h-3 text-slate-600 mx-auto mt-2 group-hover:text-blue-400 transition-colors" />
                        </motion.a>
                    ))}
                </div>
            </motion.section>

            {/* Important Disclaimer */}
            <motion.section variants={fadeInUp} className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-amber-400 mb-2">Important Note</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            This site is for <strong>educational purposes only</strong>. It is not official safety advice.
                            In any real emergency, always follow instructions from your local authorities and official emergency services.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Balance Statement */}
            <motion.section variants={fadeInUp} className="text-center space-y-6 py-8">
                <Scale className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    We believe that understanding — not fear, and not blind trust — leads to better decisions.
                    Nuclear energy is neither a miracle solution nor an existential threat. It is a technology with trade-offs, like any other.
                </p>
                <Link
                    to="/pros-and-challenges"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors gap-2"
                >
                    See the full picture <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.section>
        </motion.div>
    );
};
