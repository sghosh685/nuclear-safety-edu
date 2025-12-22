import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
    isMyth?: boolean;
    mythStatement?: string;
}

const mythsAndFacts: FAQ[] = [
    {
        question: 'Can a nuclear reactor explode like an atomic bomb?',
        isMyth: true,
        mythStatement: 'Reactors can explode like nuclear bombs.',
        answer: 'No. A nuclear bomb requires highly enriched uranium (90%+) or plutonium, compressed with precision explosives. Reactor fuel is only 3-5% enriched — physically incapable of a nuclear explosion. Chernobyl had a steam explosion, not a nuclear one.',
    },
    {
        question: 'Does any amount of radiation cause harm?',
        isMyth: true,
        mythStatement: 'All radiation is deadly.',
        answer: 'We receive natural radiation every day from the sun, the ground, and even bananas. Risk depends on dose and duration. A chest X-ray gives about 0.1 mSv, while the average person receives 2-3 mSv per year from natural sources. Low doses have no proven health effects.',
    },
    {
        question: 'Is nuclear waste impossible to store safely?',
        isMyth: true,
        mythStatement: 'We have no solution for nuclear waste.',
        answer: 'Spent fuel is stored safely in pools and dry casks at reactor sites. Finland is building the world\'s first permanent deep repository (Onkalo). The total volume of all nuclear waste ever produced would fit on a football field, stacked a few meters high.',
    },
    {
        question: 'Is living near a nuclear plant dangerous?',
        isMyth: true,
        mythStatement: 'Living near a nuclear plant causes cancer.',
        answer: 'Multiple studies (NRC, European Commission) have found no increased cancer risk for people living near nuclear plants. You receive more radiation on a cross-country flight than from living next to a plant for a year.',
    },
];

const generalFAQs: FAQ[] = [
    {
        question: 'What is the difference between nuclear energy and nuclear weapons?',
        answer: 'Both use nuclear reactions, but the designs are fundamentally different. Reactors use low-enriched fuel and are designed to sustain a controlled chain reaction for heat. Weapons use highly enriched material and are designed for an instantaneous, uncontrolled release. You cannot accidentally turn a reactor into a bomb.',
    },
    {
        question: 'How long does nuclear waste remain dangerous?',
        answer: 'High-level waste (spent fuel) contains elements that remain radioactive for thousands of years. However, radioactivity decreases over time. After 40 years, spent fuel is 1,000 times less radioactive than when first removed. Deep geological repositories are designed to isolate waste until it is no longer hazardous.',
    },
    {
        question: 'Why do some countries use nuclear power and others don\'t?',
        answer: 'Decisions depend on energy needs, natural resources, public opinion, and policy choices. France gets 70% of its electricity from nuclear; Germany decided to phase it out. There is no single "right" answer — it is a societal choice with trade-offs.',
    },
    {
        question: 'What happens to a nuclear plant in an earthquake?',
        answer: 'Plants in seismic zones are designed to withstand earthquakes (e.g., Japan\'s plants shut down safely during the 2011 earthquake). The Fukushima disaster was caused by the tsunami that followed, which flooded backup generators. Lessons learned have led to improved protections.',
    },
    {
        question: 'Is nuclear energy renewable?',
        answer: 'Technically no, because uranium is finite. However, with current reserves and technology, there is enough uranium for hundreds of years. Advanced reactors and thorium could extend this to thousands of years. Nuclear is considered "clean" (low-carbon) but not "renewable."',
    },
];

export const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [section, setSection] = useState<'myths' | 'general'>('myths');

    const currentFAQs = section === 'myths' ? mythsAndFacts : generalFAQs;

    return (
        <motion.div
            className="max-w-3xl mx-auto space-y-12"
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
                    <HelpCircle className="w-16 h-16 text-purple-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">
                    Common Questions
                </h1>
                <p className="text-slate-400 text-lg">
                    Honest answers to what people really ask about nuclear energy.
                </p>
            </section>

            {/* Section Toggle */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => { setSection('myths'); setOpenIndex(null); }}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${section === 'myths'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                >
                    Myths vs Facts
                </button>
                <button
                    onClick={() => { setSection('general'); setOpenIndex(null); }}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${section === 'general'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                >
                    General Questions
                </button>
            </div>

            {/* FAQ List */}
            <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={section}
            >
                {currentFAQs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                {faq.isMyth && (
                                    <span className="flex-shrink-0 px-2 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded border border-rose-500/30">
                                        MYTH
                                    </span>
                                )}
                                <span className="font-semibold text-white">
                                    {faq.isMyth ? faq.mythStatement : faq.question}
                                </span>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 border-t border-slate-800">
                                        {faq.isMyth && (
                                            <div className="flex items-center gap-2 mt-4 mb-3">
                                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                <span className="text-sm font-bold text-emerald-400">FACT</span>
                                            </div>
                                        )}
                                        <p className="text-slate-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>

            {/* Still Have Questions */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center"
            >
                <Lightbulb className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Want to Learn More?</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Explore our other sections for deeper understanding.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/safety"
                        className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm transition-colors"
                    >
                        Safety Principles
                    </Link>
                    <Link
                        to="/reactors"
                        className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm transition-colors"
                    >
                        How Reactors Work
                    </Link>
                    <Link
                        to="/quiz"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-sm transition-colors"
                    >
                        Test Your Knowledge <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
            </motion.section>
        </motion.div>
    );
};
