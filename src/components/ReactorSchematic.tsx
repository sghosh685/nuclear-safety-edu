import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipData {
    title: string;
    description: string;
}

const componentInfo: Record<string, TooltipData> = {
    'reactor-vessel': {
        title: 'Reactor Pressure Vessel',
        description: 'Heavy steel container housing the reactor core. Designed to withstand high pressure and temperature, with walls up to 25cm thick.',
    },
    'fuel-rods': {
        title: 'Fuel Assemblies',
        description: 'Bundles of fuel rods containing enriched uranium (UO₂) pellets. The nuclear fission chain reaction occurs here, generating heat.',
    },
    'control-rods': {
        title: 'Control Rods',
        description: 'Neutron-absorbing rods (typically boron or hafnium) that regulate the fission rate. Inserting them slows or stops the reaction.',
    },
    'coolant-inlet': {
        title: 'Coolant Inlet (Cold Leg)',
        description: 'Pressurized water returns from the steam generator at ~290°C to absorb heat from the core.',
    },
    'coolant-outlet': {
        title: 'Coolant Outlet (Hot Leg)',
        description: 'Heated water exits at ~325°C toward the steam generator. Kept under high pressure (~155 bar) to prevent boiling.',
    },
    'steam-generator': {
        title: 'Steam Generator',
        description: 'Heat exchanger where primary loop water transfers heat to the secondary loop, generating steam without mixing the two water supplies.',
    },
    'turbine': {
        title: 'Turbine Generator',
        description: 'Steam from the secondary loop spins the turbine at high speed, converting thermal energy to mechanical energy, then to electricity.',
    },
    'condenser': {
        title: 'Condenser',
        description: 'Cools and condenses steam back to water using cooling water from a river, lake, or cooling tower. The water is then recycled.',
    },
    'containment': {
        title: 'Containment Building',
        description: 'Reinforced concrete and steel structure designed to contain radioactive materials in case of an accident. Typically 1-1.5m thick.',
    },
    'primary-loop': {
        title: 'Primary Coolant Loop',
        description: 'Closed loop of pressurized water that transfers heat from the reactor core to the steam generator. Radioactive and kept sealed.',
    },
    'secondary-loop': {
        title: 'Secondary Loop',
        description: 'Non-radioactive water/steam loop that drives the turbine. Completely isolated from the primary loop.',
    },
};

// PWR Legend items
const pwrLegendItems = [
    { color: 'bg-slate-600', label: 'Containment' },
    { color: 'bg-gray-600', label: 'Reactor Vessel' },
    { color: 'bg-orange-500', label: 'Fuel Rods' },
    { color: 'bg-purple-600', label: 'Control Rods' },
    { color: 'bg-red-500', label: 'Hot Water' },
    { color: 'bg-blue-500', label: 'Cold Water' },
    { color: 'bg-slate-500', label: 'Steam Generator' },
    { color: 'bg-green-500', label: 'Turbine' },
    { color: 'bg-cyan-500', label: 'Condenser' },
];

export const ReactorSchematic = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    const handleMouseEnter = (componentId: string) => {
        setActiveComponent(componentId);
    };

    const handleMouseLeave = () => {
        setActiveComponent(null);
    };

    return (
        <div className="w-full theme-dark">
            <div className="relative w-full aspect-[4/3] bg-slate-900/50 rounded-t-2xl border border-slate-800 border-b-0 p-4 overflow-hidden">
                <h3 className="text-center text-slate-400 text-sm mb-2">Hover over components</h3>

                <svg
                    viewBox="0 0 800 500"
                    className="w-full h-full"
                    style={{ maxHeight: '400px' }}
                >
                    {/* Background Grid */}
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                        </pattern>
                        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="steamGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.7" />
                        </linearGradient>
                        <linearGradient id="heatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Containment Building */}
                    <g
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => handleMouseEnter('containment')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <path
                            d="M 50 450 L 50 150 Q 50 80 120 80 L 280 80 Q 350 80 350 150 L 350 450 Z"
                            fill={activeComponent === 'containment' ? '#1e3a5f' : '#0f172a'}
                            stroke={activeComponent === 'containment' ? '#3b82f6' : '#334155'}
                            strokeWidth="3"
                        />
                        <text x="200" y="470" textAnchor="middle" className="fill-slate-500 text-xs">Containment</text>
                    </g>

                    {/* Reactor Vessel */}
                    <g
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => handleMouseEnter('reactor-vessel')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <rect
                            x="120" y="180" width="160" height="220"
                            rx="10"
                            fill={activeComponent === 'reactor-vessel' ? '#374151' : '#1f2937'}
                            stroke={activeComponent === 'reactor-vessel' ? '#60a5fa' : '#4b5563'}
                            strokeWidth="4"
                        />
                        <text x="200" y="420" textAnchor="middle" className="fill-slate-400 text-xs">Reactor Vessel</text>
                    </g>

                    {/* Fuel Rods - with glow animation */}
                    <g
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('fuel-rods')}
                        onMouseLeave={handleMouseLeave}
                    >
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.rect
                                key={i}
                                x={145 + i * 25}
                                y="220"
                                width="12"
                                height="140"
                                rx="2"
                                fill={activeComponent === 'fuel-rods' ? '#fbbf24' : '#f59e0b'}
                                animate={{
                                    opacity: [0.7, 1, 0.7],
                                    filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
                                }}
                                transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                            />
                        ))}
                        <text x="200" y="380" textAnchor="middle" className="fill-orange-300 text-xs font-medium">Fuel</text>
                    </g>

                    {/* Control Rods - with subtle movement animation */}
                    <g
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('control-rods')}
                        onMouseLeave={handleMouseLeave}
                    >
                        {[0, 1, 2].map((i) => (
                            <g key={i}>
                                <motion.rect
                                    x={160 + i * 35}
                                    width="8"
                                    height="100"
                                    fill={activeComponent === 'control-rods' ? '#a78bfa' : '#7c3aed'}
                                    animate={{ y: [140, 145, 140] }}
                                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <rect
                                    x={155 + i * 35}
                                    y="130"
                                    width="18"
                                    height="15"
                                    fill="#4b5563"
                                />
                            </g>
                        ))}
                        <text x="200" y="125" textAnchor="middle" className="fill-purple-300 text-xs">Control Rods</text>
                    </g>

                    {/* Primary Loop - Hot Leg with flow animation */}
                    <g
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('coolant-outlet')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <path
                            d="M 280 220 L 380 220 L 380 150 L 420 150"
                            fill="none"
                            stroke={activeComponent === 'coolant-outlet' ? '#ef4444' : '#dc2626'}
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                        {/* Flow particles */}
                        <motion.circle
                            r="4"
                            fill="#fca5a5"
                            animate={{
                                offsetDistance: ['0%', '100%'],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            style={{ offsetPath: 'path("M 280 220 L 380 220 L 380 150 L 420 150")' }}
                        />
                        <text x="340" y="200" className="fill-red-400 text-xs">Hot →</text>
                    </g>

                    {/* Primary Loop - Cold Leg with flow animation */}
                    <g
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('coolant-inlet')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <path
                            d="M 280 350 L 380 350 L 380 320 L 420 320"
                            fill="none"
                            stroke={activeComponent === 'coolant-inlet' ? '#3b82f6' : '#2563eb'}
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                        {/* Flow particles */}
                        <motion.circle
                            r="4"
                            fill="#93c5fd"
                            animate={{
                                offsetDistance: ['100%', '0%'],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            style={{ offsetPath: 'path("M 280 350 L 380 350 L 380 320 L 420 320")' }}
                        />
                        <text x="340" y="370" className="fill-blue-400 text-xs">← Cold</text>
                    </g>

                    {/* Steam Generator with steam bubbles */}
                    <g
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('steam-generator')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <rect
                            x="420" y="120" width="80" height="230"
                            rx="8"
                            fill={activeComponent === 'steam-generator' ? '#475569' : '#334155'}
                            stroke={activeComponent === 'steam-generator' ? '#94a3b8' : '#64748b'}
                            strokeWidth="3"
                        />
                        {/* U-tubes inside */}
                        {[0, 1, 2].map((i) => (
                            <path
                                key={i}
                                d={`M ${440 + i * 15} 150 L ${440 + i * 15} 300 Q ${440 + i * 15} 320 ${455 + i * 15} 320 L ${470 + i * 15} 320 Q ${485 + i * 15} 320 ${485 + i * 15} 300 L ${485 + i * 15} 150`}
                                fill="none"
                                stroke="#94a3b8"
                                strokeWidth="2"
                            />
                        ))}
                        {/* Steam bubbles rising */}
                        {[0, 1, 2].map((i) => (
                            <motion.circle
                                key={i}
                                cx={440 + i * 20}
                                r="3"
                                fill="#e2e8f0"
                                animate={{
                                    cy: [280, 140, 120],
                                    opacity: [0, 0.8, 0],
                                    scale: [0.5, 1, 0.3]
                                }}
                                transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity }}
                            />
                        ))}
                        <text x="460" y="370" textAnchor="middle" className="fill-slate-400 text-xs">Steam Gen</text>
                    </g>

                    {/* Secondary Loop - Steam Out with flow */}
                    <motion.path
                        d="M 460 120 L 460 80 L 580 80 L 580 200"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="8"
                        strokeDasharray="10 5"
                        animate={{ strokeDashoffset: [0, -30] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('secondary-loop')}
                        onMouseLeave={handleMouseLeave}
                    />

                    {/* Turbine with spinning animation */}
                    <g
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('turbine')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <ellipse
                            cx="620" cy="230"
                            rx="60" ry="40"
                            fill={activeComponent === 'turbine' ? '#475569' : '#374151'}
                            stroke={activeComponent === 'turbine' ? '#22c55e' : '#4ade80'}
                            strokeWidth="3"
                        />
                        {/* Spinning turbine blades */}
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            style={{ transformOrigin: '620px 230px' }}
                        >
                            {[0, 45, 90, 135].map((angle) => (
                                <line
                                    key={angle}
                                    x1="620" y1="230"
                                    x2={620 + 50 * Math.cos((angle * Math.PI) / 180)}
                                    y2={230 + 30 * Math.sin((angle * Math.PI) / 180)}
                                    stroke="#22c55e"
                                    strokeWidth="3"
                                />
                            ))}
                        </motion.g>
                        <text x="620" y="290" textAnchor="middle" className="fill-green-400 text-xs">Turbine</text>
                    </g>

                    {/* Generator */}
                    <motion.rect
                        x="700" y="200" width="60" height="60" rx="5"
                        fill="#1e3a5f"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        animate={{
                            boxShadow: ['0 0 10px #fbbf24', '0 0 20px #fbbf24', '0 0 10px #fbbf24']
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.text
                        x="730" y="235"
                        textAnchor="middle"
                        className="fill-blue-400 text-[10px]"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        GEN
                    </motion.text>
                    <path d="M 680 230 L 700 230" stroke="#22c55e" strokeWidth="4" />

                    {/* Condenser */}
                    <g
                        className="cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('condenser')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <rect
                            x="560" y="320" width="120" height="60"
                            rx="5"
                            fill={activeComponent === 'condenser' ? '#1e3a5f' : '#0f172a'}
                            stroke={activeComponent === 'condenser' ? '#06b6d4' : '#0891b2'}
                            strokeWidth="2"
                        />
                        <text x="620" y="355" textAnchor="middle" className="fill-cyan-400 text-xs">Condenser</text>
                    </g>

                    {/* Cooling Water */}
                    <motion.path
                        d="M 560 380 L 560 420 L 480 420 L 480 350"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="6"
                        strokeDasharray="8 4"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Labels */}
                    <text x="200" y="60" textAnchor="middle" className="fill-slate-300 text-sm font-semibold">PRIMARY LOOP</text>
                    <text x="620" y="60" textAnchor="middle" className="fill-slate-300 text-sm font-semibold">SECONDARY LOOP</text>

                    {/* Electricity output with lightning animation */}
                    <g>
                        <path d="M 760 230 L 790 230" stroke="#fbbf24" strokeWidth="3" />
                        <polygon points="785,225 795,230 785,235" fill="#fbbf24" />
                        <motion.text
                            x="790" y="250"
                            className="fill-yellow-400 text-[10px]"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            ⚡ Grid
                        </motion.text>
                    </g>
                </svg>

                {/* Tooltip */}
                <AnimatePresence>
                    {activeComponent && componentInfo[activeComponent] && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-2 left-4 right-4 bg-slate-800/95 border border-slate-700 rounded-xl p-3 shadow-xl"
                        >
                            <h4 className="text-sm font-bold text-white mb-1">
                                {componentInfo[activeComponent].title}
                            </h4>
                            <p className="text-xs text-slate-300">
                                {componentInfo[activeComponent].description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Legend - directly below diagram */}
            <div className="bg-slate-800/50 rounded-b-2xl border border-slate-800 border-t-0 px-4 py-3 flex flex-wrap gap-3 text-xs">
                {pwrLegendItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded ${item.color}`} />
                        <span className="text-slate-400">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
