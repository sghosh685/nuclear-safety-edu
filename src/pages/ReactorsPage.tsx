import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Thermometer, BatteryCharging, CheckCircle, XCircle, Globe } from 'lucide-react';
import { reactors } from '../data/reactors';
import { reactorExamples } from '../data/reactorExamples';
import { ReactorSchematic } from '../components/ReactorSchematic';
import { ReactorDiagram } from '../components/ReactorDiagram';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ReactorsPage = () => {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Reactor Types
                </h1>
                <p className="text-slate-400 text-lg">
                    <strong className="text-slate-200">Six main reactor designs power the world today.</strong> While all reactor types split atoms to generate heat and turn turbines, they differ in how they cool the core and control the reaction. These differences affect cost, safety, and fuel requirements.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reactors.map((reactor, index) => (
                    <motion.div
                        key={reactor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            to={`/reactors/${reactor.id}`}
                            className="block h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
                        >
                            <div className="h-40 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                                {/* Abstract visualization placeholder */}
                                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                <div className="text-6xl font-black text-slate-700/50 select-none group-hover:scale-110 transition-transform duration-500">
                                    {reactor.name}
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                                        {reactor.fullName}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-400">
                                        {reactor.description}
                                    </p>
                                </div>
                                <div className="flex gap-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <div className="flex items-center gap-1">
                                        <Thermometer className="w-4 h-4" />
                                        {reactor.coolant}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Comparison Table */}
            <div className="mt-12 bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white">Quick Comparison</h2>
                    <p className="text-sm text-slate-400 mt-1">Side-by-side view of all reactor types</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-4 py-3 text-left text-slate-400 font-medium">Feature</th>
                                <th className="px-4 py-3 text-center text-blue-400 font-bold">PWR</th>
                                <th className="px-4 py-3 text-center text-cyan-400 font-bold">BWR</th>
                                <th className="px-4 py-3 text-center text-purple-400 font-bold">CANDU</th>
                                <th className="px-4 py-3 text-center text-rose-400 font-bold">RBMK</th>
                                <th className="px-4 py-3 text-center text-amber-400 font-bold">HTGR</th>
                                <th className="px-4 py-3 text-center text-teal-400 font-bold">SMR</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="px-4 py-2 text-slate-400">Market Share</td>
                                <td className="px-4 py-2 text-center text-slate-300">~70%</td>
                                <td className="px-4 py-2 text-center text-slate-300">~20%</td>
                                <td className="px-4 py-2 text-center text-slate-300">~5%</td>
                                <td className="px-4 py-2 text-center text-slate-500">&lt;1%</td>
                                <td className="px-4 py-2 text-center text-slate-500">0%*</td>
                                <td className="px-4 py-2 text-center text-slate-500">0%*</td>
                            </tr>
                            <tr className="bg-slate-800/20">
                                <td className="px-4 py-2 text-slate-400">Coolant</td>
                                <td className="px-4 py-2 text-center text-slate-300">Light water</td>
                                <td className="px-4 py-2 text-center text-slate-300">Light water</td>
                                <td className="px-4 py-2 text-center text-slate-300">Heavy water</td>
                                <td className="px-4 py-2 text-center text-slate-300">Light water</td>
                                <td className="px-4 py-2 text-center text-slate-300">Helium</td>
                                <td className="px-4 py-2 text-center text-slate-300">Varies</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-slate-400">Moderator</td>
                                <td className="px-4 py-2 text-center text-slate-300">Light water</td>
                                <td className="px-4 py-2 text-center text-slate-300">Light water</td>
                                <td className="px-4 py-2 text-center text-slate-300">Heavy water</td>
                                <td className="px-4 py-2 text-center text-slate-300">Graphite</td>
                                <td className="px-4 py-2 text-center text-slate-300">Graphite</td>
                                <td className="px-4 py-2 text-center text-slate-300">Varies</td>
                            </tr>
                            <tr className="bg-slate-800/20">
                                <td className="px-4 py-2 text-slate-400">Fuel Enrichment</td>
                                <td className="px-4 py-2 text-center text-slate-300">3-5%</td>
                                <td className="px-4 py-2 text-center text-slate-300">3-5%</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Natural</td>
                                <td className="px-4 py-2 text-center text-slate-300">2%</td>
                                <td className="px-4 py-2 text-center text-slate-300">≤20%</td>
                                <td className="px-4 py-2 text-center text-slate-300">Varies</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-slate-400">Online Refueling</td>
                                <td className="px-4 py-2 text-center text-rose-400">No</td>
                                <td className="px-4 py-2 text-center text-rose-400">No</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Yes</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Yes</td>
                                <td className="px-4 py-2 text-center text-rose-400">No</td>
                                <td className="px-4 py-2 text-center text-slate-500">Varies</td>
                            </tr>
                            <tr className="bg-slate-800/20">
                                <td className="px-4 py-2 text-slate-400">Containment</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Yes</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Yes</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Yes</td>
                                <td className="px-4 py-2 text-center text-rose-400">No**</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Yes</td>
                                <td className="px-4 py-2 text-center text-emerald-400">Yes</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-slate-400">Typical Size</td>
                                <td className="px-4 py-2 text-center text-slate-300">1,000+ MW</td>
                                <td className="px-4 py-2 text-center text-slate-300">1,000+ MW</td>
                                <td className="px-4 py-2 text-center text-slate-300">600-900 MW</td>
                                <td className="px-4 py-2 text-center text-slate-300">1,000 MW</td>
                                <td className="px-4 py-2 text-center text-slate-300">250-600 MW</td>
                                <td className="px-4 py-2 text-center text-slate-300">&lt;300 MW</td>
                            </tr>
                            <tr className="bg-slate-800/20">
                                <td className="px-4 py-2 text-slate-400">Best For</td>
                                <td className="px-4 py-2 text-center text-slate-300">Baseload</td>
                                <td className="px-4 py-2 text-center text-slate-300">Baseload</td>
                                <td className="px-4 py-2 text-center text-slate-300">No enrichment</td>
                                <td className="px-4 py-2 text-center text-slate-500">(Obsolete)</td>
                                <td className="px-4 py-2 text-center text-slate-300">Industrial heat</td>
                                <td className="px-4 py-2 text-center text-slate-300">Remote/modular</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-3 bg-slate-800/30 text-xs text-slate-500">
                    * HTGR and SMR are next-generation; few commercial units exist yet<br />
                    ** Original RBMK had no containment; design no longer built
                </div>
            </div>
        </div>
    );
};

export const ReactorDetail = () => {
    const { id } = useParams<{ id: string }>();
    const reactor = reactors.find(r => r.id === id);

    if (!reactor) {
        return <div className="text-center py-20 text-slate-500">Reactor not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Breadcrumbs items={[
                { label: 'Reactors', href: '/reactors' },
                { label: reactor.name }
            ]} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{reactor.fullName}</h1>
                    <p className="text-xl text-slate-300 leading-relaxed">{reactor.description}</p>

                    {/* Key Feature Callout */}
                    {reactor.keyFeature && (
                        <div className="theme-dark bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Key Feature</span>
                            <p className="text-blue-200 mt-1">{reactor.keyFeature}</p>
                        </div>
                    )}
                </div>

                {/* Diagram - Full Width */}
                <div className="theme-dark bg-slate-900 rounded-2xl border border-slate-800 p-4 overflow-hidden">
                    <h2 className="text-lg font-semibold text-white mb-4">How It Works</h2>
                    {reactor.id === 'pwr' ? (
                        <ReactorSchematic />
                    ) : (
                        <ReactorDiagram reactorType={reactor.id} />
                    )}
                </div>

                {/* Two Column: Specs + Advantages/Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Technical Specs */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <BatteryCharging className="w-5 h-5 text-yellow-400" /> Technical Specs
                        </h3>
                        <dl className="space-y-4">
                            <div className="flex justify-between">
                                <dt className="text-sm text-slate-500">Coolant</dt>
                                <dd className="font-medium text-slate-200">{reactor.coolant}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-slate-500">Moderator</dt>
                                <dd className="font-medium text-slate-200">{reactor.moderator}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Right Column: Empty for balance or future content */}
                    <div className="hidden md:block" />
                </div>

                {/* Advantages */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Advantages
                    </h3>
                    <ul className="space-y-3">
                        {reactor.pros.map((pro, i) => (
                            <li key={i} className="text-slate-300 flex items-start gap-3">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                                <span>{pro}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Challenges */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-rose-500/20">
                    <h3 className="text-lg font-semibold text-rose-400 mb-4 flex items-center gap-2">
                        <XCircle className="w-5 h-5" /> Challenges
                    </h3>
                    <ul className="space-y-3">
                        {reactor.cons.map((con, i) => (
                            <li key={i} className="text-slate-300 flex items-start gap-3">
                                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
                                <span>{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Real-World Examples */}
                {reactorExamples[reactor.id] && reactorExamples[reactor.id].length > 0 && (
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5" /> Real-World Examples
                        </h3>
                        <div className="space-y-4">
                            {reactorExamples[reactor.id].map((example, i) => (
                                <div key={i} className="border-l-2 border-blue-500/30 pl-4">
                                    <div className="font-semibold text-white">{example.name}</div>
                                    <div className="text-sm text-slate-400">{example.location}</div>
                                    <div className="text-sm text-slate-500 mt-1">{example.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
