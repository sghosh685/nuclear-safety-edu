import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Radio, Home, Phone, Pill, Info, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const steps = [
    {
        icon: Radio,
        title: 'Stay Informed',
        description: 'Turn on your radio or TV. Follow official channels (government, emergency services). Do NOT rely on social media rumors.',
    },
    {
        icon: Home,
        title: 'Shelter in Place',
        description: 'If told to shelter, go indoors. Close all windows and doors. Turn off ventilation. The walls of your home provide significant protection from radiation.',
    },
    {
        icon: Phone,
        title: 'Do Not Self-Evacuate',
        description: 'Unless authorities tell you to leave, stay where you are. Evacuating on your own can put you in more danger and clog roads needed by emergency responders.',
    },
    {
        icon: Pill,
        title: 'Potassium Iodide (KI)',
        description: 'Authorities may distribute KI pills to block radioactive iodine from entering your thyroid. Only take them if instructed by officials.',
    },
];

export const EmergencyPage = () => {
    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Warning Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-amber-900/30 border-2 border-amber-500/50 rounded-2xl p-6"
            >
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                    <div>
                        <h2 className="text-xl font-bold text-amber-400 mb-2">This Page Is For Education Only</h2>
                        <p className="text-slate-300 leading-relaxed">
                            In a <strong>real emergency</strong>, always follow instructions from your <strong>local authorities</strong> and official emergency services.
                            This page explains general concepts so you understand what might happen — it is NOT a substitute for official guidance.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Header */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">
                    Understanding Nuclear Emergencies
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    What happens if there is a nuclear incident? Knowing the basics can help you stay calm and follow instructions effectively.
                </p>
            </section>

            {/* Good News Box */}
            <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6"
            >
                <div className="flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-emerald-400 mb-2">The Good News</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Nuclear emergencies are extremely rare. Even when they occur, simple actions like staying indoors dramatically reduce your exposure.
                            In most scenarios, the biggest risk is panic, not radiation. Authorities have detailed plans and will guide you.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Key Steps */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white">What Authorities Might Tell You</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <step.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Sheltering Works */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-4">
                <h2 className="text-xl font-bold text-white">Why Staying Indoors Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-blue-400">50%</div>
                        <p className="text-sm text-slate-400">radiation blocked by a car</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-emerald-400">90%</div>
                        <p className="text-sm text-slate-400">blocked by a typical house</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-400">99%</div>
                        <p className="text-sm text-slate-400">blocked by a basement or concrete building</p>
                    </div>
                </div>
                <p className="text-slate-400 text-sm text-center pt-4">
                    Source: U.S. Department of Homeland Security / Ready.gov
                </p>
            </section>

            {/* Official Resources */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Info className="w-5 h-5 text-slate-400" /> Official Resources
                </h2>
                <p className="text-slate-400 text-sm">
                    For real emergency planning and up-to-date information, visit your country's official sources:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: 'Ready.gov (USA)', url: 'https://www.ready.gov/nuclear-explosion' },
                        { name: 'CNSC (Canada)', url: 'https://www.cnsc-ccsn.gc.ca/eng/resources/emergency-management-and-safety/' },
                        { name: 'IAEA Emergency', url: 'https://www.iaea.org/topics/emergency-preparedness-and-response' },
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

            {/* CTA */}
            <div className="text-center pt-8 border-t border-slate-800">
                <p className="text-slate-400 text-sm mb-4">Want to understand how safety systems prevent emergencies?</p>
                <Link
                    to="/safety"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors gap-2"
                >
                    Learn about safety principles <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
};
