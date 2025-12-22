import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Search } from 'lucide-react';

interface GlossaryTerm {
    term: string;
    definition: string;
    category: string;
}

const glossaryTerms: GlossaryTerm[] = [
    // Safety & Regulation
    { term: 'ALARA', definition: 'As Low As Reasonably Achievable — the principle of keeping radiation exposure as low as practical, considering cost and benefits.', category: 'Safety' },
    { term: 'Containment', definition: 'A thick concrete and steel building around the reactor designed to prevent radioactive materials from escaping, even during severe accidents.', category: 'Safety' },
    { term: 'Defence in Depth', definition: 'Multiple independent layers of protection so that if one fails, others still work. Includes physical barriers, safety systems, and procedures.', category: 'Safety' },
    { term: 'INES', definition: 'International Nuclear and Radiological Event Scale — a 7-level rating from "anomaly" (1) to "major accident" (7), used to communicate severity.', category: 'Safety' },
    { term: 'Safety Culture', definition: 'An organization\'s shared attitudes and behaviors that prioritize safety over production, schedules, or cost. Everyone is responsible.', category: 'Safety' },
    { term: 'Negative Void Coefficient', definition: 'A safe reactor characteristic where steam bubbles cause power to DECREASE. Most modern reactors have this.', category: 'Safety' },
    { term: 'Positive Void Coefficient', definition: 'A dangerous characteristic where steam bubbles cause power to INCREASE. The RBMK reactor had this flaw.', category: 'Safety' },

    // Radiation
    { term: 'Becquerel (Bq)', definition: 'A unit measuring radioactive decay — one Bq means one atom decays per second. Named after Henri Becquerel.', category: 'Radiation' },
    { term: 'Sievert (Sv)', definition: 'A unit measuring radiation dose to the human body. 1 mSv (millisievert) = average dose from flying coast-to-coast twice.', category: 'Radiation' },
    { term: 'Half-life', definition: 'The time it takes for half of a radioactive substance to decay. Ranges from seconds to billions of years depending on the element.', category: 'Radiation' },
    { term: 'Background Radiation', definition: 'Natural radiation from cosmic rays, radon in soil, and radioactive elements in food/water. Average: 2-3 mSv/year.', category: 'Radiation' },
    { term: 'Ionizing Radiation', definition: 'Radiation energetic enough to remove electrons from atoms. Includes alpha, beta, gamma rays and neutrons.', category: 'Radiation' },

    // Reactor Technology
    { term: 'Fission', definition: 'Splitting a heavy atom (like uranium) into smaller atoms, releasing a large amount of energy as heat.', category: 'Technology' },
    { term: 'Fuel Rod', definition: 'A metal tube containing uranium fuel pellets. Many rods are bundled together to form a fuel assembly.', category: 'Technology' },
    { term: 'Control Rod', definition: 'Rods made of neutron-absorbing material (boron, cadmium). Inserting them slows/stops the nuclear reaction.', category: 'Technology' },
    { term: 'Moderator', definition: 'Material that slows down neutrons so they can sustain a chain reaction. Water, heavy water, or graphite.', category: 'Technology' },
    { term: 'Coolant', definition: 'Fluid that removes heat from the reactor core. Usually water, but can be gas, liquid metal, or molten salt.', category: 'Technology' },
    { term: 'PWR', definition: 'Pressurized Water Reactor — most common type worldwide. Uses ordinary water under high pressure as coolant and moderator.', category: 'Technology' },
    { term: 'BWR', definition: 'Boiling Water Reactor — second most common. Water boils directly in the reactor vessel to produce steam.', category: 'Technology' },
    { term: 'CANDU', definition: 'CANada Deuterium Uranium — Canadian design using heavy water moderator and natural uranium fuel.', category: 'Technology' },
    { term: 'RBMK', definition: 'Soviet design using graphite moderator and water coolant. Chernobyl was an RBMK. No longer built.', category: 'Technology' },
    { term: 'SMR', definition: 'Small Modular Reactor — new generation of smaller reactors (under 300 MW) that can be factory-built and shipped.', category: 'Technology' },

    // Waste & Fuel
    { term: 'Spent Fuel', definition: 'Nuclear fuel that has been used in a reactor and removed. Still radioactive but no longer efficient for power generation.', category: 'Waste' },
    { term: 'Dry Cask', definition: 'Concrete and steel container for storing spent fuel after it has cooled in pools. Designed for decades of safe storage.', category: 'Waste' },
    { term: 'Deep Geological Repository', definition: 'Underground facility (500m+ deep) for permanent disposal of high-level nuclear waste in stable rock.', category: 'Waste' },
    { term: 'Reprocessing', definition: 'Chemical treatment of spent fuel to extract reusable uranium and plutonium. Done in France, UK, Japan.', category: 'Waste' },

    // Organizations
    { term: 'IAEA', definition: 'International Atomic Energy Agency — UN body promoting safe, peaceful use of nuclear technology.', category: 'Organizations' },
    { term: 'NRC', definition: 'Nuclear Regulatory Commission — US federal agency regulating commercial nuclear power.', category: 'Organizations' },
    { term: 'CNSC', definition: 'Canadian Nuclear Safety Commission — Canada\'s independent nuclear regulator.', category: 'Organizations' },
    { term: 'WANO', definition: 'World Association of Nuclear Operators — industry group for sharing best practices and peer reviews.', category: 'Organizations' },
];

const categories = ['All', 'Safety', 'Radiation', 'Technology', 'Waste', 'Organizations'];

export const GlossaryPage = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const filteredTerms = glossaryTerms.filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(search.toLowerCase()) ||
            term.definition.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || term.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-12"
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
                    <Book className="w-16 h-16 text-indigo-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Glossary</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Plain-language definitions for nuclear energy terms.
                </p>
            </section>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search terms..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Terms List */}
            <div className="space-y-4">
                {filteredTerms.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">No terms found matching your search.</p>
                ) : (
                    filteredTerms.map((item, i) => (
                        <motion.div
                            key={item.term}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/30 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{item.term}</h3>
                                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">{item.definition}</p>
                                </div>
                                <span className="flex-shrink-0 px-2 py-1 bg-slate-800 text-slate-500 text-xs rounded">
                                    {item.category}
                                </span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <p className="text-center text-slate-500 text-sm">
                {filteredTerms.length} of {glossaryTerms.length} terms shown
            </p>
        </motion.div>
    );
};
