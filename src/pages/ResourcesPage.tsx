import { motion } from 'framer-motion';
import { ExternalLink, Book, Video, Headphones, GraduationCap, Building, Globe } from 'lucide-react';

interface Resource {
    name: string;
    url: string;
    description: string;
}

interface ResourceCategory {
    title: string;
    icon: React.ElementType;
    color: string;
    description: string;
    resources: Resource[];
}

const resourceCategories: ResourceCategory[] = [
    {
        title: 'Official Regulators & Agencies',
        icon: Building,
        color: 'blue',
        description: 'Primary sources from nuclear regulators and international bodies.',
        resources: [
            { name: 'IAEA Nuclear Safety', url: 'https://www.iaea.org/topics/nuclear-safety', description: 'International Atomic Energy Agency safety publications and standards' },
            { name: 'CNSC Learning Portal', url: 'https://www.cnsc-ccsn.gc.ca/eng/resources/learning-portal/', description: 'Canadian Nuclear Safety Commission educational resources' },
            { name: 'US NRC Public Reading Room', url: 'https://www.nrc.gov/reading-rm.html', description: 'Nuclear Regulatory Commission documents and educational materials' },
            { name: 'EIA Nuclear Explained', url: 'https://www.eia.gov/energyexplained/nuclear/', description: 'US Energy Information Administration nuclear energy explainer' },
        ],
    },
    {
        title: 'Educational Organizations',
        icon: GraduationCap,
        color: 'emerald',
        description: 'Non-profit and educational institutions with nuclear content.',
        resources: [
            { name: 'World Nuclear Association', url: 'https://world-nuclear.org/', description: 'Industry association with extensive educational resources' },
            { name: 'Nuclear Energy Institute', url: 'https://www.nei.org/', description: 'US industry group with public information resources' },
            { name: 'Canadian Nuclear Association', url: 'https://cna.ca/', description: 'Canadian industry association with learning materials' },
            { name: 'TeachNuclear.ca', url: 'https://teachnuclear.ca/', description: 'Free educational resources for Canadian teachers and students' },
            { name: 'NuclearFAQ.ca', url: 'https://www.nuclearfaq.ca/', description: 'Detailed technical FAQ by a Canadian nuclear engineer' },
        ],
    },
    {
        title: 'Data & Research',
        icon: Globe,
        color: 'purple',
        description: 'Statistics, research, and data visualization on energy.',
        resources: [
            { name: 'Our World in Data: Nuclear', url: 'https://ourworldindata.org/nuclear-energy', description: 'Comprehensive data on nuclear energy, safety, and emissions' },
            { name: 'IEA Nuclear Power', url: 'https://www.iea.org/fuels-and-technologies/nuclear', description: 'International Energy Agency nuclear analysis and projections' },
            { name: 'IPCC Energy Chapter', url: 'https://www.ipcc.ch/', description: 'Climate science on energy sources including nuclear' },
        ],
    },
    {
        title: 'Books',
        icon: Book,
        color: 'amber',
        description: 'Recommended reading for deeper understanding.',
        resources: [
            { name: 'Power to Save the World', url: 'https://www.amazon.com/Power-Save-World-About-Nuclear/dp/0307386759', description: 'Gwyneth Cravens\' journey from skeptic to supporter' },
            { name: 'Atomic Accidents', url: 'https://www.amazon.com/Atomic-Accidents-Meltdowns-Disasters-Mountains/dp/1605986801', description: 'James Mahaffey\'s detailed history of nuclear incidents' },
            { name: 'The Grid', url: 'https://www.amazon.com/Grid-Fraying-Between-Americans-Energy/dp/1632865688', description: 'Gretchen Bakke on electricity infrastructure and its future' },
            { name: 'Midnight in Chernobyl', url: 'https://www.amazon.com/Midnight-Chernobyl-Greatest-Nuclear-Disaster/dp/1501134639', description: 'Adam Higginbotham\'s definitive Chernobyl account' },
        ],
    },
    {
        title: 'Documentaries & Videos',
        icon: Video,
        color: 'rose',
        description: 'Visual content for understanding nuclear energy.',
        resources: [
            { name: 'Pandora\'s Promise', url: 'https://www.imdb.com/title/tt1992193/', description: 'Documentary following environmentalists who changed their view on nuclear' },
            { name: 'Into Eternity', url: 'https://www.imdb.com/title/tt1194612/', description: 'Documentary about Finland\'s Onkalo nuclear waste repository' },
            { name: 'Chernobyl (HBO)', url: 'https://www.imdb.com/title/tt7366338/', description: 'Drama miniseries (mostly accurate, some creative license)' },
            { name: 'Kyle Hill (YouTube)', url: 'https://www.youtube.com/c/KyleHillScience', description: 'Science communicator with excellent nuclear content' },
            { name: 'Illinois EnergyProf', url: 'https://www.youtube.com/c/IllinoisEnergyProf', description: 'University lectures on nuclear engineering' },
        ],
    },
    {
        title: 'Podcasts',
        icon: Headphones,
        color: 'cyan',
        description: 'Audio content for learning on the go.',
        resources: [
            { name: 'Titans of Nuclear', url: 'https://www.titansofnuclear.com/', description: 'Interviews with nuclear industry leaders and experts' },
            { name: 'Decouple Podcast', url: 'https://www.decouple.fm/', description: 'Nuclear energy and climate discussions' },
            { name: 'The Energy Gang', url: 'https://www.greentechmedia.com/podcast/the-energy-gang', description: 'General energy podcast often covering nuclear topics' },
        ],
    },
];

export const ResourcesPage = () => {
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
                    <Book className="w-16 h-16 text-teal-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Learn More</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Curated resources from trusted sources. We're not the only voice — go deeper with official regulators, researchers, and educators.
                </p>
            </section>

            {/* Resource Categories */}
            <div className="space-y-12">
                {resourceCategories.map((category, catIndex) => (
                    <motion.section
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.1 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-${category.color}-500/10 flex items-center justify-center`}>
                                <category.icon className={`w-5 h-5 text-${category.color}-400`} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{category.title}</h2>
                                <p className="text-sm text-slate-500">{category.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.resources.map((resource, i) => (
                                <a
                                    key={i}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-medium text-white group-hover:text-teal-400 transition-colors">
                                                {resource.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">{resource.description}</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-teal-400 flex-shrink-0 transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* Disclaimer */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <p className="text-slate-500 text-sm">
                    We link to these resources because we find them credible and educational.
                    We have no financial relationship with any of them. Always verify information with multiple sources.
                </p>
            </section>
        </motion.div>
    );
};
