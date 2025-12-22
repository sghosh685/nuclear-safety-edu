import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Atom, ExternalLink, ArrowRight, Building, AlertTriangle, Users } from 'lucide-react';

const plants = [
    { name: 'Bruce Power', location: 'Tiverton, Ontario', units: 8, type: 'CANDU', status: 'Operating' },
    { name: 'Pickering', location: 'Pickering, Ontario', units: 6, type: 'CANDU', status: 'Operating' },
    { name: 'Darlington', location: 'Clarington, Ontario', units: 4, type: 'CANDU', status: 'Operating' },
    { name: 'Point Lepreau', location: 'New Brunswick', units: 1, type: 'CANDU', status: 'Operating' },
];

export const NuclearCanadaPage = () => {
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
                    className="inline-block"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto">
                        <span className="text-3xl">🍁</span>
                    </div>
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Nuclear in Canada</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Canada has a unique nuclear story — powered by homegrown CANDU technology and overseen by one of the world's most respected regulators.
                </p>
            </section>

            {/* Quick Stats */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { value: '15%', label: 'of Canada\'s electricity' },
                    { value: '19', label: 'operating reactors' },
                    { value: '60%', label: 'of Ontario\'s power' },
                    { value: '0', label: 'major accidents' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                ))}
            </motion.section>

            {/* CANDU Explanation */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Atom className="w-6 h-6 text-cyan-400" /> The CANDU Reactor
                </h2>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
                    <p className="text-slate-300 leading-relaxed">
                        <strong>CANDU</strong> stands for <strong>CANada Deuterium Uranium</strong>. It's a uniquely Canadian design
                        developed in the 1950s-60s that has been exported to countries like South Korea, Romania, and Argentina.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                            <h4 className="font-bold text-cyan-400 mb-2">What Makes It Special</h4>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li className="flex gap-2"><span className="text-cyan-400">•</span> Uses natural uranium (not enriched)</li>
                                <li className="flex gap-2"><span className="text-cyan-400">•</span> Heavy water moderator (D₂O)</li>
                                <li className="flex gap-2"><span className="text-cyan-400">•</span> Can refuel while running</li>
                                <li className="flex gap-2"><span className="text-cyan-400">•</span> Horizontal fuel channels</li>
                            </ul>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                            <h4 className="font-bold text-emerald-400 mb-2">Safety Features</h4>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Two independent shutdown systems</li>
                                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Negative void coefficient (safe)</li>
                                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Robust containment</li>
                                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Passive cooling capabilities</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Nuclear Plants Map */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-rose-400" /> Where Are Canada's Nuclear Plants?
                </h2>
                <div className="space-y-4">
                    {plants.map((plant, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-rose-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                                <Building className="w-6 h-6 text-rose-400" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-white">{plant.name}</h3>
                                <p className="text-xs text-slate-500">{plant.location}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-rose-400">{plant.units} units</div>
                                <div className="text-xs text-slate-500">{plant.type}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="text-slate-500 text-sm">
                    Most of Canada's nuclear capacity is in Ontario, which gets about 60% of its electricity from nuclear power.
                </p>
            </motion.section>

            {/* CNSC */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-6 h-6 text-emerald-400" /> Who Oversees Nuclear Safety?
                </h2>
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-emerald-400">CNSC</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Canadian Nuclear Safety Commission</h3>
                            <p className="text-slate-400 text-sm">Independent federal regulator since 2000</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold text-emerald-400 mb-2">What They Do</h4>
                            <ul className="text-sm text-slate-300 space-y-1">
                                <li>• License all nuclear facilities</li>
                                <li>• Conduct regular inspections</li>
                                <li>• Enforce safety regulations</li>
                                <li>• Review emergency plans</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-400 mb-2">Public Resources</h4>
                            <ul className="text-sm text-slate-300 space-y-1">
                                <li>• Free learning portal</li>
                                <li>• Public meetings & transparency</li>
                                <li>• Emergency preparedness info</li>
                                <li>• Myth-busting materials</li>
                            </ul>
                        </div>
                    </div>

                    <a
                        href="https://www.cnsc-ccsn.gc.ca/eng/resources/learning-portal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-6 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-medium transition-colors"
                    >
                        Visit CNSC Learning Portal <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </motion.section>

            {/* Emergency Preparedness */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-amber-400" /> Emergency Preparedness
                </h2>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                    <p className="text-slate-300 leading-relaxed mb-6">
                        Communities near nuclear plants have detailed emergency plans. In Ontario, the <strong>Provincial Nuclear Emergency Response Plan (PNERP)</strong> coordinates
                        local, provincial, and federal response.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                            <Users className="w-6 h-6 text-amber-400 mb-2" />
                            <h4 className="font-bold text-white mb-1">Potassium Iodide (KI)</h4>
                            <p className="text-xs text-slate-400">Pre-distributed to homes within 10km of plants</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                            <AlertTriangle className="w-6 h-6 text-amber-400 mb-2" />
                            <h4 className="font-bold text-white mb-1">Alert Systems</h4>
                            <p className="text-xs text-slate-400">Sirens, alerts, and public notification systems</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                            <Shield className="w-6 h-6 text-amber-400 mb-2" />
                            <h4 className="font-bold text-white mb-1">Regular Drills</h4>
                            <p className="text-xs text-slate-400">Plants and communities practice emergency response</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* External Links */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">Learn More (Official Sources)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { name: 'CNSC Learning Portal', url: 'https://www.cnsc-ccsn.gc.ca/eng/resources/learning-portal/' },
                        { name: 'Nuclear FAQ (Canadian)', url: 'https://www.nuclearfaq.ca' },
                        { name: 'Ontario Power Generation', url: 'https://www.opg.com/powering-ontario/our-generation/nuclear/' },
                        { name: 'Canadian Nuclear Association', url: 'https://cna.ca' },
                    ].map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
                        >
                            <span className="text-slate-300 group-hover:text-white transition-colors">{link.name}</span>
                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </a>
                    ))}
                </div>
            </section>

            {/* Next Steps */}
            <section className="border-t border-slate-800 pt-8">
                <p className="text-slate-500 text-sm mb-4">Continue Learning</p>
                <Link
                    to="/reactors/candu"
                    className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-colors group"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Deep Dive: CANDU Reactor</h3>
                            <p className="text-sm text-slate-400 mt-1">Technical details and how it compares to other designs</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                </Link>
            </section>
        </motion.div>
    );
};
