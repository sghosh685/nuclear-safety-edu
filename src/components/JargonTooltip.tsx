import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

// Jargon definitions for inline tooltips
const jargonDefinitions: Record<string, { short: string; full: string }> = {
    'neutron economy': {
        short: 'How efficiently neutrons sustain the chain reaction',
        full: 'A measure of how efficiently a reactor uses neutrons. Better neutron economy means less fuel enrichment needed.',
    },
    'void coefficient': {
        short: 'How reactor power changes when steam bubbles form',
        full: 'Describes whether power increases (+) or decreases (-) when coolant boils to steam. Negative is safe, positive is dangerous.',
    },
    'positive void coefficient': {
        short: '⚠️ Dangerous: power INCREASES when coolant boils',
        full: 'A reactor design flaw where steam bubbles cause the fission rate to accelerate. The RBMK at Chernobyl had this flaw.',
    },
    'negative void coefficient': {
        short: '✅ Safe: power DECREASES when coolant boils',
        full: 'A safe reactor characteristic where steam bubbles naturally slow the reaction. Most modern reactors have this.',
    },
    'moderator': {
        short: 'Material that slows neutrons for efficient fission',
        full: 'Slows fast neutrons so they can sustain a chain reaction. Common moderators: water, heavy water, graphite.',
    },
    'coolant': {
        short: 'Fluid that removes heat from the reactor core',
        full: 'Carries heat from the reactor to generate steam. Usually water, but can be gas, liquid metal, or molten salt.',
    },
    'heavy water': {
        short: 'D₂O — water with deuterium instead of hydrogen',
        full: 'Water where hydrogen atoms are replaced with deuterium (H-2). Absorbs fewer neutrons, enabling natural uranium fuel.',
    },
    'enriched uranium': {
        short: 'Uranium with increased U-235 content (3-5%)',
        full: 'Natural uranium is 0.7% U-235. Enrichment increases this to 3-5% for power reactors, making fission easier.',
    },
    'TRISO': {
        short: 'Tri-structural isotropic fuel particles',
        full: 'Tiny uranium kernels coated in ceramic layers. Each particle is its own containment—designed to withstand 1,600°C.',
    },
    'passive safety': {
        short: 'Safety systems that work without power or human action',
        full: 'Uses natural forces (gravity, convection) to cool the reactor during emergencies. No pumps or electricity needed.',
    },
    'capacity factor': {
        short: 'Percentage of maximum possible electricity generated',
        full: 'A 90% capacity factor means the plant operated at 90% of its maximum output over a year. Nuclear typically: 90%+.',
    },
    'online refueling': {
        short: 'Replacing fuel while the reactor runs',
        full: 'CANDU and RBMK can add/remove fuel without shutting down. PWR and BWR must stop for refueling.',
    },
    'containment': {
        short: 'Reinforced building around the reactor',
        full: 'A thick concrete/steel structure designed to contain radioactive materials even during severe accidents.',
    },
    'decay heat': {
        short: 'Heat produced by radioactive decay after shutdown',
        full: 'Even after the chain reaction stops, fuel remains hot from radioactive decay. Must be cooled for days/weeks.',
    },
};

interface JargonTooltipProps {
    term: string;
    children?: React.ReactNode;
}

export const JargonTooltip = ({ term, children }: JargonTooltipProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const definition = jargonDefinitions[term.toLowerCase()];

    if (!definition) {
        return <span>{children || term}</span>;
    }

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <span className="border-b border-dashed border-blue-400/50 text-blue-300 cursor-help">
                {children || term}
            </span>
            {isOpen && (
                <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-xl text-left">
                    <span className="block text-xs font-bold text-blue-400 mb-1">{term}</span>
                    <span className="block text-xs text-slate-300">{definition.short}</span>
                    <Link
                        to="/glossary"
                        className="block mt-2 text-[10px] text-slate-500 hover:text-blue-400"
                    >
                        View in glossary →
                    </Link>
                    {/* Arrow */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-700" />
                </span>
            )}
        </span>
    );
};

// Component to highlight jargon automatically in text
export const HighlightJargon = ({ text }: { text: string }) => {
    // Sort terms by length (longest first) to prevent partial matches
    const terms = Object.keys(jargonDefinitions).sort((a, b) => b.length - a.length);

    let result: React.ReactNode[] = [text];

    terms.forEach(term => {
        result = result.flatMap((part, i) => {
            if (typeof part !== 'string') return part;

            const regex = new RegExp(`\\b(${term})\\b`, 'gi');
            const parts = part.split(regex);

            return parts.map((p, j) => {
                if (p.toLowerCase() === term.toLowerCase()) {
                    return <JargonTooltip key={`${i}-${j}`} term={term}>{p}</JargonTooltip>;
                }
                return p;
            });
        });
    });

    return <>{result}</>;
};

// Simple icon trigger for inline help
export const HelpTooltip = ({ term }: { term: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const definition = jargonDefinitions[term.toLowerCase()];

    if (!definition) return null;

    return (
        <span
            className="relative inline-block ml-1"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <HelpCircle className="w-4 h-4 text-slate-500 hover:text-blue-400 cursor-help inline" />
            {isOpen && (
                <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl text-left">
                    <span className="block text-[10px] font-bold text-blue-400">{term}</span>
                    <span className="block text-[10px] text-slate-300 mt-1">{definition.short}</span>
                </span>
            )}
        </span>
    );
};