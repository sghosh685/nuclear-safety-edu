// Search index for site-wide search functionality
export interface SearchItem {
    title: string;
    description: string;
    path: string;
    category: 'reactor' | 'accident' | 'page' | 'concept';
    keywords?: string[];
}

export const searchIndex: SearchItem[] = [
    // Reactors
    { title: 'PWR - Pressurized Water Reactor', description: 'Most common reactor worldwide (70%)', path: '/reactors/pwr', category: 'reactor', keywords: ['pressurized', 'water', 'primary loop', 'secondary loop'] },
    { title: 'BWR - Boiling Water Reactor', description: 'Simpler design with direct steam (20%)', path: '/reactors/bwr', category: 'reactor', keywords: ['boiling', 'steam', 'single loop'] },
    { title: 'CANDU', description: 'Canadian reactor using natural uranium', path: '/reactors/candu', category: 'reactor', keywords: ['canada', 'deuterium', 'heavy water', 'natural uranium', 'online refueling'] },
    { title: 'RBMK', description: 'Soviet design used at Chernobyl', path: '/reactors/rbmk', category: 'reactor', keywords: ['soviet', 'chernobyl', 'graphite', 'void coefficient'] },
    { title: 'HTGR - High-Temperature Gas Reactor', description: 'Next-gen design for industrial heat (950°C)', path: '/reactors/htgr', category: 'reactor', keywords: ['helium', 'triso', 'pebble bed', 'high temperature'] },
    { title: 'SMR - Small Modular Reactor', description: 'Factory-built modular reactors (<300 MWe)', path: '/reactors/smr', category: 'reactor', keywords: ['modular', 'small', 'factory', 'nuscale'] },

    // Accidents
    { title: 'Chernobyl Disaster (1986)', description: 'INES Level 7 - Worst nuclear accident', path: '/accidents/chernobyl', category: 'accident', keywords: ['soviet', 'ukraine', 'rbmk', 'explosion', 'graphite fire'] },
    { title: 'Fukushima Daiichi (2011)', description: 'INES Level 7 - Tsunami-triggered meltdowns', path: '/accidents/fukushima', category: 'accident', keywords: ['japan', 'tsunami', 'earthquake', 'meltdown', 'bwr'] },
    { title: 'Three Mile Island (1979)', description: 'INES Level 5 - Partial meltdown in USA', path: '/accidents/tmi', category: 'accident', keywords: ['tmi', 'pennsylvania', 'usa', 'partial meltdown', 'pwr'] },

    // Main Pages
    { title: 'Reactor Types', description: 'Compare 6 major reactor designs', path: '/reactors', category: 'page', keywords: ['compare', 'types', 'designs'] },
    { title: 'Nuclear Accidents', description: 'Major accidents and lessons learned', path: '/accidents', category: 'page', keywords: ['history', 'disasters', 'lessons'] },
    { title: 'Safety Principles', description: 'Defense in depth and safety systems', path: '/safety', category: 'page', keywords: ['defense in depth', 'barriers', 'containment'] },
    { title: 'Safety Culture', description: 'Human factors and organizational safety', path: '/safety-culture', category: 'page', keywords: ['human factors', 'culture', 'organization'] },
    { title: 'Nuclear Basics', description: 'Introduction to nuclear energy', path: '/basics', category: 'page', keywords: ['fission', 'atoms', 'energy', 'introduction', 'beginner'] },
    { title: 'Quiz', description: 'Test your nuclear knowledge', path: '/quiz', category: 'page', keywords: ['test', 'questions', 'learn'] },
    { title: 'Myths vs Facts', description: 'Common misconceptions debunked', path: '/faq', category: 'page', keywords: ['faq', 'myths', 'misconceptions', 'questions'] },
    { title: 'Pros & Challenges', description: 'Honest look at nuclear energy trade-offs', path: '/pros-and-challenges', category: 'page', keywords: ['advantages', 'disadvantages', 'benefits', 'drawbacks'] },
    { title: 'Nuclear in Canada', description: 'Canada\'s nuclear industry and CANDU', path: '/canada', category: 'page', keywords: ['candu', 'ontario', 'bruce', 'pickering', 'darlington'] },
    { title: 'Climate & Nuclear', description: 'Role of nuclear in decarbonization', path: '/climate', category: 'page', keywords: ['climate change', 'carbon', 'emissions', 'green'] },
    { title: 'Nuclear Waste', description: 'Managing spent fuel and waste', path: '/waste', category: 'page', keywords: ['spent fuel', 'storage', 'disposal', 'radioactive'] },

    // Key Concepts
    { title: 'Defense in Depth', description: 'Multiple layers of safety barriers', path: '/safety', category: 'concept', keywords: ['barriers', 'redundancy', 'safety layers'] },
    { title: 'Void Coefficient', description: 'How steam affects reactor power', path: '/reactors/rbmk', category: 'concept', keywords: ['positive', 'negative', 'feedback', 'steam'] },
    { title: 'Containment Building', description: 'Final barrier against radiation release', path: '/safety', category: 'concept', keywords: ['barrier', 'concrete', 'dome'] },
    { title: 'SCRAM', description: 'Emergency reactor shutdown', path: '/safety', category: 'concept', keywords: ['shutdown', 'emergency', 'control rods'] },
    { title: 'Meltdown', description: 'Core overheating and fuel damage', path: '/accidents', category: 'concept', keywords: ['core damage', 'overheating', 'fuel'] },
    { title: 'INES Scale', description: 'International Nuclear Event Scale (0-7)', path: '/accidents', category: 'concept', keywords: ['level', 'rating', 'severity'] },
    { title: 'TRISO Fuel', description: 'Accident-tolerant fuel particles', path: '/reactors/htgr', category: 'concept', keywords: ['pebble', 'ceramic', 'coating'] },
    { title: 'Heavy Water', description: 'Deuterium oxide (D₂O) moderator', path: '/reactors/candu', category: 'concept', keywords: ['d2o', 'deuterium', 'moderator'] },
];

// Helper function to search the index
export const searchContent = (query: string): SearchItem[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const terms = lowerQuery.split(/\s+/).filter(t => t.length > 1);

    return searchIndex
        .map(item => {
            let score = 0;
            const titleLower = item.title.toLowerCase();
            const descLower = item.description.toLowerCase();
            const keywordsLower = item.keywords?.join(' ').toLowerCase() || '';

            // Exact title match = highest score
            if (titleLower.includes(lowerQuery)) score += 100;

            // Partial matches
            terms.forEach(term => {
                if (titleLower.includes(term)) score += 50;
                if (descLower.includes(term)) score += 20;
                if (keywordsLower.includes(term)) score += 30;
            });

            return { item, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(({ item }) => item);
};
