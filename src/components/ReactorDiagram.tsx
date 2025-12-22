import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReactorDiagramProps {
    reactorType: string;
}

interface TooltipData {
    title: string;
    description: string;
}

// Component info for each reactor type
const bwrComponents: Record<string, TooltipData> = {
    'reactor-vessel': {
        title: 'Reactor Pressure Vessel',
        description: 'Contains the reactor core where water boils directly. Operates at ~75 bar, lower than PWR. Steam separators at the top remove water droplets.',
    },
    'fuel-rods': {
        title: 'Fuel Assemblies',
        description: 'Bundles of enriched uranium fuel rods (3-5% U-235). Fission occurs here, heating water until it boils into steam.',
    },
    'steam-bubbles': {
        title: 'Boiling Water',
        description: 'Water boils directly in the reactor vessel. Steam bubbles rise and are collected at the top. This is the key difference from PWR.',
    },
    'turbine': {
        title: 'Turbine Generator',
        description: 'Steam from the reactor directly spins the turbine. Since this steam passed through the core, the turbine area requires radiation shielding.',
    },
    'condenser': {
        title: 'Condenser',
        description: 'Cools steam back to water for recycling. Uses external cooling water from a river, lake, or cooling tower.',
    },
    'generator': {
        title: 'Electrical Generator',
        description: 'Converts mechanical rotation from the turbine into electricity. Typically produces 1,000+ MWe per unit.',
    },
};

const canduComponents: Record<string, TooltipData> = {
    'calandria': {
        title: 'Calandria (Reactor Vessel)',
        description: 'Large cylindrical tank containing heavy water moderator at low pressure. Horizontal pressure tubes run through it carrying fuel and coolant.',
    },
    'pressure-tubes': {
        title: 'Horizontal Pressure Tubes',
        description: 'Each tube contains fuel bundles and pressurized heavy water coolant. This design allows refueling while the reactor runs.',
    },
    'fuel-bundles': {
        title: 'Natural Uranium Fuel',
        description: 'Short fuel bundles (~50cm) of natural uranium (0.7% U-235). No enrichment needed thanks to heavy water\'s excellent neutron economy.',
    },
    'heavy-water': {
        title: 'Heavy Water (D₂O)',
        description: 'Deuterium oxide absorbs fewer neutrons than regular water, allowing natural uranium fuel. Expensive (~$300/kg) but reusable.',
    },
    'steam-generator': {
        title: 'Steam Generator',
        description: 'Heat exchanger where primary heavy water transfers heat to secondary light water, generating steam for the turbine.',
    },
    'turbine': {
        title: 'Turbine Generator',
        description: 'Driven by non-radioactive steam from the secondary loop. CANDU uses conventional light water in the secondary side.',
    },
};

const rbmkComponents: Record<string, TooltipData> = {
    'graphite-stack': {
        title: 'Graphite Moderator Stack',
        description: '~1,700 tonnes of graphite blocks slow neutrons for fission. Graphite is flammable and burned during the Chernobyl accident.',
    },
    'pressure-channels': {
        title: 'Pressure Tubes / Channels',
        description: 'Vertical tubes containing fuel and water coolant run through the graphite. Water boils in the channels, generating steam.',
    },
    'fuel-rods': {
        title: 'Low-Enriched Uranium Fuel',
        description: 'Enriched to ~2% U-235. Fuel assemblies sit in pressure channels. Design allowed online refueling.',
    },
    'steam-drum': {
        title: 'Steam Drums',
        description: 'Steam-water mixture from channels enters drums where steam is separated and sent to turbines. Multiple drums per reactor.',
    },
    'no-containment': {
        title: '⚠️ No Containment Building',
        description: 'Original RBMK had no reinforced containment structure. When the reactor exploded at Chernobyl, radioactive material was released directly.',
    },
    'void-coefficient': {
        title: '⚠️ Positive Void Coefficient',
        description: 'CRITICAL FLAW: When water boils to steam (voids), fission rate INCREASES instead of decreasing. This caused the Chernobyl runaway reaction.',
    },
};

const htgrComponents: Record<string, TooltipData> = {
    'reactor-core': {
        title: 'Graphite Core with TRISO Fuel',
        description: 'Graphite blocks contain TRISO fuel particles. Core operates at up to 950°C, much hotter than water-cooled reactors.',
    },
    'triso-fuel': {
        title: 'TRISO Fuel Particles',
        description: 'Tiny uranium kernels coated in ceramic layers (pyrolytic carbon + silicon carbide). Each particle is its own containment—can\'t melt below 1,600°C.',
    },
    'helium-coolant': {
        title: 'Helium Gas Coolant',
        description: 'Inert gas that doesn\'t absorb neutrons or become radioactive. Transfers heat efficiently and remains stable at extreme temperatures.',
    },
    'heat-exchanger': {
        title: 'Heat Exchanger / Steam Generator',
        description: 'Hot helium transfers heat to water/steam (or directly to process applications). High temp enables industrial uses beyond electricity.',
    },
    'turbine': {
        title: 'Gas or Steam Turbine',
        description: 'Can use conventional steam turbine or direct helium gas turbine (Brayton cycle) for higher efficiency (~48% vs ~33% for LWRs).',
    },
    'industrial-heat': {
        title: 'Industrial Heat Applications',
        description: 'High temperatures enable hydrogen production, synthetic fuels, chemical processing, and desalination—uses impossible for water-cooled reactors.',
    },
};

const smrComponents: Record<string, TooltipData> = {
    'integrated-module': {
        title: 'Integrated Reactor Module',
        description: 'All major components (core, steam generators, pressurizer) in one factory-built vessel. Shipped to site fully assembled.',
    },
    'reactor-core': {
        title: 'Compact Reactor Core',
        description: 'Smaller core (~50-300 MWe) with lower power density. Uses similar fuel to large reactors but in a more compact arrangement.',
    },
    'steam-generator': {
        title: 'Integral Steam Generators',
        description: 'Steam generators built into the reactor vessel, eliminating external piping. Fewer components = fewer potential leak points.',
    },
    'passive-cooling': {
        title: 'Passive Safety Systems',
        description: 'Natural circulation removes decay heat without pumps or power. Gravity and convection handle emergencies automatically.',
    },
    'containment': {
        title: 'Underground Containment',
        description: 'Many SMR designs can be installed partially underground for added protection against external threats.',
    },
    'modular-design': {
        title: 'Factory Manufacturing',
        description: 'Built in factories with quality control, then trucked/shipped to site. Reduces construction time from ~10 years to ~3 years.',
    },
};

// Wrapper component for interactive diagrams with integrated legend
const InteractiveDiagram = ({
    children,
    activeComponent,
    componentInfo,
    title,
    legendItems
}: {
    children: React.ReactNode;
    activeComponent: string | null;
    componentInfo: Record<string, TooltipData>;
    title: string;
    legendItems?: { color: string; label: string }[];
}) => (
    <div className="w-full theme-dark">
        <div className="relative w-full h-72 sm:h-80 md:h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-xl overflow-hidden">
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-slate-400">
                    <span className="hidden sm:inline">Hover over</span>
                    <span className="sm:hidden">Tap</span> components
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-blue-400">{title}</span>
            </div>
            <div className="absolute inset-4 top-8 bottom-20">
                {children}
            </div>
            {/* Tooltip */}
            <AnimatePresence>
                {activeComponent && componentInfo[activeComponent] && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-2 left-2 right-2 bg-slate-800/95 border border-slate-700 rounded-lg p-3"
                    >
                        <h4 className="text-sm font-bold text-white mb-1">
                            {componentInfo[activeComponent].title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            {componentInfo[activeComponent].description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        {/* Legend - directly below diagram */}
        {legendItems && legendItems.length > 0 && (
            <div className="bg-slate-800/50 rounded-b-xl border-t border-slate-700 px-4 py-2 flex flex-wrap gap-4 text-xs">
                {legendItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded ${item.color}`} />
                        <span className="text-slate-400">{item.label}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// BWR Diagram - Interactive
const BWRDiagram = () => {
    const [active, setActive] = useState<string | null>(null);

    return (
        <InteractiveDiagram
            activeComponent={active}
            componentInfo={bwrComponents}
            title="BOILING WATER REACTOR"
            legendItems={[
                { color: 'bg-cyan-500', label: 'Reactor Vessel' },
                { color: 'bg-orange-400', label: 'Fuel Rods' },
                { color: 'bg-white/50', label: 'Steam Bubbles' },
                { color: 'bg-yellow-500', label: 'Generator' },
            ]}
        >
            <div className="h-full flex items-center justify-center gap-8 px-8">
                {/* Reactor Vessel with Boiling - Larger */}
                <div
                    className={`relative w-40 h-56 rounded-xl border-2 cursor-pointer transition-all ${active === 'reactor-vessel' ? 'bg-cyan-500/30 border-cyan-400' : 'bg-cyan-500/20 border-cyan-500/50'
                        }`}
                    onMouseEnter={() => setActive('reactor-vessel')}
                    onMouseLeave={() => setActive(null)}
                >
                    {/* Steam separators at top */}
                    <div className="absolute top-2 inset-x-4 h-6 border-b border-cyan-400/30 flex items-center justify-center">
                        <span className="text-[8px] text-cyan-300">Steam Separators</span>
                    </div>
                    {/* Steam bubbles */}
                    <div
                        className="absolute top-10 inset-x-4 h-16 cursor-pointer"
                        onMouseEnter={() => setActive('steam-bubbles')}
                        onMouseLeave={() => setActive(null)}
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-4 h-4 rounded-full ${active === 'steam-bubbles' ? 'bg-white/70' : 'bg-white/40'}`}
                                style={{ left: `${5 + i * 18}%` }}
                                animate={{ y: [0, -25, -40], opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, delay: i * 0.25, repeat: Infinity }}
                            />
                        ))}
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] text-white/60">Boiling</span>
                    </div>
                    {/* Fuel rods - larger */}
                    <div
                        className="absolute bottom-6 inset-x-6 flex justify-center gap-2 cursor-pointer"
                        onMouseEnter={() => setActive('fuel-rods')}
                        onMouseLeave={() => setActive(null)}
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                className={`w-3 h-20 rounded ${active === 'fuel-rods' ? 'bg-orange-300' : 'bg-orange-400'}`}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, delay: i * 0.12, repeat: Infinity }}
                            />
                        ))}
                    </div>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-orange-300 font-medium">Fuel Core</span>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium">Reactor Vessel</span>
                </div>

                {/* Steam flow path */}
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        className="text-cyan-400 text-base font-bold"
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        Steam →
                    </motion.div>
                    <span className="text-[9px] text-slate-500">(Direct to turbine)</span>
                </div>

                {/* Turbine - Larger */}
                <div className="flex flex-col items-center">
                    <motion.div
                        className={`relative w-24 h-24 cursor-pointer`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        onMouseEnter={() => setActive('turbine')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className={`w-full h-full border-4 rounded-full flex items-center justify-center ${active === 'turbine' ? 'border-green-400 bg-green-500/20' : 'border-green-500/50'
                            }`}>
                            <div className="w-6 h-6 bg-green-500 rounded-full" />
                        </div>
                    </motion.div>
                    <span className="mt-2 text-xs text-green-400 font-medium">Turbine</span>
                </div>

                {/* Arrow */}
                <motion.span
                    className="text-slate-400 text-lg"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                >→</motion.span>

                {/* Generator - Larger */}
                <div
                    className={`relative w-20 h-24 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${active === 'generator' ? 'bg-yellow-500/30 border-yellow-400' : 'bg-yellow-500/20 border-yellow-500/50'
                        }`}
                    onMouseEnter={() => setActive('generator')}
                    onMouseLeave={() => setActive(null)}
                >
                    <motion.span
                        className="text-yellow-400 text-3xl"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        ⚡
                    </motion.span>
                    <span className="text-xs text-yellow-400 font-medium mt-1">GEN</span>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400">Generator</span>
                </div>

                {/* Grid output */}
                <div className="flex flex-col items-center">
                    <motion.span
                        className="text-yellow-400 text-sm"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >→ Grid</motion.span>
                </div>
            </div>
        </InteractiveDiagram>
    );
};

// CANDU Diagram - Interactive
const CANDUDiagram = () => {
    const [active, setActive] = useState<string | null>(null);

    return (
        <InteractiveDiagram
            activeComponent={active}
            componentInfo={canduComponents}
            title="CANDU REACTOR"
            legendItems={[
                { color: 'bg-purple-500', label: 'Calandria (D₂O)' },
                { color: 'bg-orange-500', label: 'Fuel Bundles' },
                { color: 'bg-slate-600', label: 'Pressure Tubes' },
                { color: 'bg-slate-500', label: 'Steam Generator' },
            ]}
        >
            <div className="h-full flex items-center justify-center gap-6 px-6">
                {/* Calandria with horizontal tubes - Larger */}
                <div
                    className={`relative w-64 h-48 rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${active === 'calandria' ? 'bg-purple-500/30 border-purple-400' : 'bg-purple-500/20 border-purple-500/50'
                        }`}
                    onMouseEnter={() => setActive('calandria')}
                    onMouseLeave={() => setActive(null)}
                >
                    {/* Heavy water label - larger */}
                    <div
                        className="absolute top-2 left-3 cursor-pointer"
                        onMouseEnter={() => setActive('heavy-water')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <span className="text-sm text-purple-300 font-bold">D₂O</span>
                        <span className="text-[9px] text-purple-400 block">Heavy Water</span>
                    </div>
                    {/* Pressure tubes - larger */}
                    <div
                        className="absolute inset-x-4 top-12 space-y-3 cursor-pointer"
                        onMouseEnter={() => setActive('pressure-tubes')}
                        onMouseLeave={() => setActive(null)}
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`h-6 rounded-full overflow-hidden relative ${active === 'pressure-tubes' ? 'bg-slate-500' : 'bg-slate-600/50'
                                }`}>
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[7px] text-slate-400">Pressure Tube</span>
                                {/* Fuel bundle moving */}
                                <motion.div
                                    className={`absolute h-full w-12 rounded-full ${active === 'fuel-bundles' ? 'bg-orange-400' : 'bg-orange-500/60'
                                        }`}
                                    animate={{ x: [-20, 220] }}
                                    transition={{ duration: 5, delay: i * 0.6, repeat: Infinity, ease: 'linear' }}
                                    onMouseEnter={() => setActive('fuel-bundles')}
                                />
                            </div>
                        ))}
                    </div>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-purple-300 font-medium">Online Refueling</span>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium">Calandria</span>
                </div>

                {/* Heat Transfer Arrow */}
                <div className="flex flex-col items-center gap-1">
                    <motion.span
                        className="text-purple-400 text-lg font-bold"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        Heat →
                    </motion.span>
                    <span className="text-[8px] text-slate-500">(Primary Loop)</span>
                </div>

                {/* Steam Generator - Larger */}
                <div
                    className={`relative w-20 h-40 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center ${active === 'steam-generator' ? 'bg-slate-600 border-slate-400' : 'bg-slate-700 border-slate-600'
                        }`}
                    onMouseEnter={() => setActive('steam-generator')}
                    onMouseLeave={() => setActive(null)}
                >
                    <span className="text-xs text-slate-300 font-medium">Steam</span>
                    <span className="text-xs text-slate-300 font-medium">Generator</span>
                    <motion.div
                        className="mt-2 text-white/50 text-lg"
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >↑↑</motion.div>
                    <span className="text-[8px] text-slate-500 mt-1">Steam Out</span>
                </div>

                {/* Secondary Loop Arrow */}
                <div className="flex flex-col items-center gap-1">
                    <motion.span
                        className="text-slate-400 text-lg"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    >→</motion.span>
                    <span className="text-[8px] text-slate-500">(Secondary)</span>
                </div>

                {/* Turbine - Larger */}
                <div className="flex flex-col items-center">
                    <motion.div
                        className={`relative w-20 h-20 cursor-pointer`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                        onMouseEnter={() => setActive('turbine')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className={`w-full h-full border-4 rounded-full flex items-center justify-center ${active === 'turbine' ? 'border-green-400 bg-green-500/20' : 'border-green-500/50'
                            }`}>
                            <div className="w-5 h-5 bg-green-500 rounded-full" />
                        </div>
                    </motion.div>
                    <span className="mt-2 text-xs text-green-400 font-medium">Turbine</span>
                    <span className="text-[8px] text-slate-500">(Light Water)</span>
                </div>
            </div>
        </InteractiveDiagram>
    );
};

// RBMK Diagram - Interactive with warnings
const RBMKDiagram = () => {
    const [active, setActive] = useState<string | null>(null);

    return (
        <InteractiveDiagram
            activeComponent={active}
            componentInfo={rbmkComponents}
            title="RBMK REACTOR"
            legendItems={[
                { color: 'bg-slate-600', label: 'Graphite Blocks' },
                { color: 'bg-blue-400', label: 'Water Channels' },
                { color: 'bg-rose-500', label: 'Safety Warnings' },
                { color: 'bg-slate-500', label: 'Steam Drum' },
            ]}
        >
            <div className="h-full flex items-center justify-center gap-10 px-8">
                {/* Graphite stack with channels - Larger */}
                <div
                    className={`relative w-48 h-52 rounded-xl border-2 cursor-pointer transition-all ${active === 'graphite-stack' ? 'bg-slate-600 border-slate-400' : 'bg-slate-700/50 border-slate-600'
                        }`}
                    onMouseEnter={() => setActive('graphite-stack')}
                    onMouseLeave={() => setActive(null)}
                >
                    <span className="absolute top-2 left-2 text-[10px] text-slate-300 font-medium">Graphite Moderator</span>
                    {/* Grid pattern for graphite */}
                    <div className="absolute inset-3 top-8 grid grid-cols-5 gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-sm flex items-center justify-center cursor-pointer ${active === 'pressure-channels' || active === 'graphite-stack' ? 'bg-slate-500' : 'bg-slate-600'
                                    }`}
                                onMouseEnter={() => i % 2 === 0 ? setActive('pressure-channels') : undefined}
                                onMouseLeave={() => setActive(null)}
                            >
                                {i % 2 === 0 && (
                                    <motion.div
                                        className={`w-2 h-6 rounded ${active === 'pressure-channels' ? 'bg-blue-400' : 'bg-blue-400/50'
                                            }`}
                                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                                        transition={{ duration: 1.5, delay: i * 0.04, repeat: Infinity }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <span className="absolute bottom-2 right-2 text-[9px] text-blue-300">Water Channels</span>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium whitespace-nowrap">Graphite Stack</span>
                </div>

                {/* Warning panel - key differentiator - Larger */}
                <div className="flex flex-col gap-4">
                    <motion.div
                        className={`bg-rose-500/10 border-2 rounded-lg p-4 text-center cursor-pointer transition-all ${active === 'no-containment' ? 'border-rose-400 bg-rose-500/20' : 'border-rose-500/50'
                            }`}
                        animate={{ borderColor: active === 'no-containment' ? undefined : ['rgba(244,63,94,0.5)', 'rgba(244,63,94,0.8)', 'rgba(244,63,94,0.5)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        onMouseEnter={() => setActive('no-containment')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className="text-2xl">⚠️</div>
                        <div className="text-xs text-rose-300 font-medium mt-1">No Containment</div>
                        <div className="text-[9px] text-rose-400">Building</div>
                    </motion.div>

                    <div
                        className={`bg-rose-500/10 border-2 rounded-lg p-4 text-center cursor-pointer transition-all ${active === 'void-coefficient' ? 'border-rose-400 bg-rose-500/20' : 'border-rose-500/50'
                            }`}
                        onMouseEnter={() => setActive('void-coefficient')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className="text-2xl">💥</div>
                        <div className="text-xs text-rose-300 font-medium mt-1">Positive Void</div>
                        <div className="text-[9px] text-rose-400">Coefficient</div>
                    </div>
                </div>

                {/* Steam drum - Larger */}
                <div className="flex flex-col items-center gap-3">
                    <div
                        className={`relative w-24 h-32 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center ${active === 'steam-drum' ? 'bg-slate-600 border-slate-400' : 'bg-slate-700 border-slate-600'
                            }`}
                        onMouseEnter={() => setActive('steam-drum')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <span className="text-sm text-slate-300 font-medium">Steam</span>
                        <span className="text-sm text-slate-300 font-medium">Drum</span>
                        <motion.div
                            className="mt-2 text-white/40"
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >↑↑</motion.div>
                    </div>
                    <span className="text-xs text-slate-400">To Turbines</span>
                </div>
            </div>
        </InteractiveDiagram>
    );
};

// HTGR Diagram - Interactive
const HTGRDiagram = () => {
    const [active, setActive] = useState<string | null>(null);

    return (
        <InteractiveDiagram
            activeComponent={active}
            componentInfo={htgrComponents}
            title="HIGH-TEMP GAS REACTOR"
            legendItems={[
                { color: 'bg-amber-500', label: 'TRISO Core' },
                { color: 'bg-slate-500', label: 'TRISO Pebbles' },
                { color: 'bg-amber-400', label: 'Helium Coolant' },
                { color: 'bg-slate-600', label: 'Heat Exchanger' },
            ]}
        >
            <div className="h-full flex items-center justify-center gap-8 px-8">
                {/* Reactor core with TRISO - Larger */}
                <div
                    className={`relative w-44 h-52 rounded-2xl border-2 cursor-pointer transition-all ${active === 'reactor-core' ? 'bg-amber-500/30 border-amber-400' : 'bg-amber-500/20 border-amber-500/50'
                        }`}
                    onMouseEnter={() => setActive('reactor-core')}
                    onMouseLeave={() => setActive(null)}
                >
                    <span className="absolute top-2 left-2 text-[10px] text-amber-300 font-medium">Pebble Bed</span>
                    {/* TRISO fuel pebbles - larger grid */}
                    <div
                        className="absolute inset-3 top-8 grid grid-cols-4 gap-2 cursor-pointer"
                        onMouseEnter={() => setActive('triso-fuel')}
                        onMouseLeave={() => setActive(null)}
                    >
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${active === 'triso-fuel' ? 'bg-slate-400 border-slate-300' : 'bg-slate-500 border-slate-400'
                                    }`}
                                animate={{ scale: [1, 1.08, 1] }}
                                transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
                            >
                                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">TRISO Particles</span>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium">Reactor Core</span>
                </div>

                {/* Helium flow - Larger */}
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onMouseEnter={() => setActive('helium-coolant')}
                    onMouseLeave={() => setActive(null)}
                >
                    <motion.span
                        className={`text-lg font-bold ${active === 'helium-coolant' ? 'text-amber-300' : 'text-amber-400'}`}
                        animate={{ x: [-4, 4, -4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        He ⇌
                    </motion.span>
                    <span className="text-xs text-slate-400">Helium</span>
                    <span className="text-[9px] text-amber-500">Coolant</span>
                </div>

                {/* Heat exchanger - Larger */}
                <div
                    className={`relative w-24 h-36 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center ${active === 'heat-exchanger' ? 'bg-amber-500/30 border-amber-400' : 'bg-gradient-to-b from-amber-500/20 to-slate-700 border-amber-500/30'
                        }`}
                    onMouseEnter={() => setActive('heat-exchanger')}
                    onMouseLeave={() => setActive(null)}
                >
                    <span className="text-sm text-slate-300 font-medium">Heat</span>
                    <span className="text-sm text-slate-300 font-medium">Exchanger</span>
                    <motion.div
                        className="mt-2 text-amber-400/60 text-lg"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >⇋</motion.div>
                </div>

                {/* Temperature badge - Larger */}
                <div
                    className={`flex flex-col items-center cursor-pointer`}
                    onMouseEnter={() => setActive('industrial-heat')}
                    onMouseLeave={() => setActive(null)}
                >
                    <div className={`border-2 rounded-lg px-4 py-3 ${active === 'industrial-heat' ? 'bg-amber-500/30 border-amber-400' : 'bg-amber-500/20 border-amber-500/50'
                        }`}>
                        <div className="text-amber-400 text-2xl font-bold">950°C</div>
                    </div>
                    <span className="text-xs text-slate-400 mt-2">Industrial</span>
                    <span className="text-[9px] text-amber-500">Heat Output</span>
                </div>

                {/* Turbine - Larger */}
                <div className="flex flex-col items-center">
                    <motion.div
                        className={`relative w-20 h-20 cursor-pointer`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        onMouseEnter={() => setActive('turbine')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className={`w-full h-full border-4 rounded-full flex items-center justify-center ${active === 'turbine' ? 'border-green-400 bg-green-500/20' : 'border-green-500/50'
                            }`}>
                            <div className="w-5 h-5 bg-green-500 rounded-full" />
                        </div>
                    </motion.div>
                    <span className="mt-2 text-xs text-green-400 font-medium">Turbine</span>
                </div>
            </div>
        </InteractiveDiagram>
    );
};

// SMR Diagram - Interactive
const SMRDiagram = () => {
    const [active, setActive] = useState<string | null>(null);

    return (
        <InteractiveDiagram
            activeComponent={active}
            componentInfo={smrComponents}
            title="SMALL MODULAR REACTOR"
            legendItems={[
                { color: 'bg-teal-500', label: 'Integrated Module' },
                { color: 'bg-orange-400', label: 'Reactor Core' },
                { color: 'bg-slate-600', label: 'Steam Generator' },
                { color: 'bg-teal-400', label: 'Factory-Built' },
            ]}
        >
            <div className="h-full flex items-center justify-center gap-10 px-8">
                {/* Factory badge - Larger */}
                <div
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${active === 'modular-design' ? 'bg-teal-500/30 border-teal-400' : 'bg-teal-500/20 border-teal-500/50'
                        }`}
                    onMouseEnter={() => setActive('modular-design')}
                    onMouseLeave={() => setActive(null)}
                >
                    <div className="text-4xl">🏭</div>
                    <div className="text-sm text-teal-300 font-medium mt-2">Factory</div>
                    <div className="text-xs text-teal-400">Built</div>
                </div>

                {/* Integrated module - Larger */}
                <motion.div
                    className={`relative w-36 h-56 rounded-2xl border-2 cursor-pointer transition-all flex flex-col overflow-hidden ${active === 'integrated-module' ? 'bg-teal-500/30 border-teal-400' : 'bg-gradient-to-b from-teal-500/20 to-cyan-500/30 border-teal-500/50'
                        }`}
                    animate={{ boxShadow: ['0 0 15px rgba(20,184,166,0.2)', '0 0 30px rgba(20,184,166,0.4)', '0 0 15px rgba(20,184,166,0.2)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    onMouseEnter={() => setActive('integrated-module')}
                    onMouseLeave={() => setActive(null)}
                >
                    {/* Steam gen section */}
                    <div
                        className={`h-16 m-2 rounded-lg border-2 flex items-center justify-center cursor-pointer ${active === 'steam-generator' ? 'bg-slate-600 border-slate-400' : 'bg-slate-700/50 border-slate-600'
                            }`}
                        onMouseEnter={() => setActive('steam-generator')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <span className="text-xs text-slate-300 font-medium">Steam Gen</span>
                    </div>

                    {/* Core section */}
                    <div
                        className={`flex-1 mx-2 mb-2 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer ${active === 'reactor-core' ? 'bg-orange-500/30 border-orange-400' : 'bg-orange-500/20 border-orange-500/30'
                            }`}
                        onMouseEnter={() => setActive('reactor-core')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-16 bg-orange-400 rounded"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-orange-300 font-medium mt-2">Reactor Core</span>
                    </div>

                    {/* Passive safety indicator */}
                    <div
                        className={`absolute bottom-2 inset-x-2 text-center cursor-pointer`}
                        onMouseEnter={() => setActive('passive-cooling')}
                        onMouseLeave={() => setActive(null)}
                    >
                        <span className={`text-xs font-medium ${active === 'passive-cooling' ? 'text-teal-300' : 'text-teal-400'}`}>✓ Passive Safe</span>
                    </div>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium whitespace-nowrap">Integrated Module</span>
                </motion.div>

                {/* Size comparison - Larger */}
                <div className="flex flex-col items-center gap-2">
                    <div className="text-teal-400 font-bold text-2xl">~77 MW</div>
                    <div className="text-xs text-slate-400">per module</div>
                    <div className="w-px h-6 bg-slate-600" />
                    <div className="text-xs text-slate-500">vs 1000+ MW</div>
                    <div className="text-[10px] text-slate-500">(traditional)</div>
                </div>

                {/* Containment - Larger */}
                <div
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${active === 'containment' ? 'bg-teal-500/30 border-teal-400' : 'bg-slate-700/50 border-slate-600'
                        }`}
                    onMouseEnter={() => setActive('containment')}
                    onMouseLeave={() => setActive(null)}
                >
                    <div className="text-4xl">🛡️</div>
                    <div className="text-sm text-slate-300 font-medium mt-2">Underground</div>
                    <div className="text-xs text-slate-400">Installation</div>
                </div>
            </div>
        </InteractiveDiagram>
    );
};

// PWR uses separate ReactorSchematic, but we add a simple interactive version here too
const PWRDiagram = () => {
    return (
        <div className="relative w-full h-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
            <p className="text-slate-400 text-sm">See interactive PWR schematic above</p>
        </div>
    );
};

export const ReactorDiagram = ({ reactorType }: ReactorDiagramProps) => {
    switch (reactorType) {
        case 'pwr':
            return <PWRDiagram />;
        case 'bwr':
            return <BWRDiagram />;
        case 'candu':
            return <CANDUDiagram />;
        case 'rbmk':
            return <RBMKDiagram />;
        case 'htgr':
            return <HTGRDiagram />;
        case 'smr':
            return <SMRDiagram />;
        default:
            return <PWRDiagram />;
    }
};
