import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Calculator, MapPin, Home, Stethoscope, Plane, Leaf,
    ChevronRight, ChevronLeft, Check, AlertCircle, Info,
    Banana, Activity, Shield, Zap, RotateCcw, Share2,
    FileText, Atom, Keyboard
} from 'lucide-react';
import type { DoseInput, DoseResult } from '../data/doseData';
import {
    calculateDose, DEFAULT_INPUT,
    WIZARD_STEPS, REGION_NAMES, RISK_CATEGORIES, REFERENCE_VALUES,
    NUCLEAR_PLANT_OPTIONS, OCCUPATIONAL_DOSES
} from '../data/doseData';

// ============================================================================
// STORAGE KEY FOR PERSISTENCE
// ============================================================================
const STORAGE_KEY = 'dose-calculator-state';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Save state to localStorage
const saveState = (input: DoseInput, step: number) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, step, timestamp: Date.now() }));
    } catch (e) {
        console.warn('Could not save state to localStorage');
    }
};

// Load state from localStorage
const loadState = (): { input: DoseInput; step: number } | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            // Only restore if saved within last 24 hours
            if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
                return { input: data.input, step: data.step };
            }
        }
    } catch (e) {
        console.warn('Could not load state from localStorage');
    }
    return null;
};

// Clear saved state
const clearState = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('Could not clear localStorage');
    }
};

// ============================================================================
// KEYBOARD SHORTCUTS MODAL
// ============================================================================
const KeyboardShortcutsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    const shortcuts = [
        { key: 'Enter', action: 'Go to next step' },
        { key: 'Escape', action: 'Go to previous step' },
        { key: 'Tab', action: 'Navigate between inputs' },
        { key: '↑ / ↓', action: 'Adjust slider values' },
        { key: 'R', action: 'Reset calculator' },
        { key: '?', action: 'Show keyboard shortcuts' },
    ];

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-slate-700"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 mb-4">
                    <Keyboard className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Keyboard Shortcuts</h3>
                </div>
                <div className="space-y-2">
                    {shortcuts.map((s) => (
                        <div key={s.key} className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-slate-400">{s.action}</span>
                            <kbd className="px-2 py-1 bg-slate-700 rounded text-sm text-white font-mono">{s.key}</kbd>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

// ============================================================================
// PROGRESS BAR
// ============================================================================
const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
    <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;

            return (
                <div key={step} className="flex items-center">
                    <motion.div
                        className={`w - 10 h - 10 rounded - full flex items - center justify - center text - sm font - bold transition - colors ${isCompleted ? 'bg-emerald-500 text-white' : ''} ${isCurrent ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' : ''} ${!isCompleted && !isCurrent ? 'bg-slate-700 dark:bg-slate-700 text-slate-400' : ''} `}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {isCompleted ? <Check className="w-5 h-5" /> : step}
                    </motion.div>
                    {step < totalSteps && (
                        <div className={`w - 8 h - 1 mx - 1 rounded ${isCompleted ? 'bg-emerald-500' : 'bg-slate-700'} `} />
                    )}
                </div>
            );
        })}
    </div>
);

// ============================================================================
// DOSE PREVIEW
// ============================================================================
const DosePreview = ({ dose }: { dose: number }) => (
    <motion.div
        className="mt-6 p-4 bg-slate-800/50 dark:bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400 dark:text-slate-400">Current estimated dose:</span>
        </div>
        <div className="text-xl font-bold text-blue-400">
            {dose.toFixed(2)} <span className="text-sm font-normal text-slate-500">mSv/year</span>
        </div>
    </motion.div>
);

// ============================================================================
// INPUT COMPONENTS
// ============================================================================

const NumberInput = ({
    value, onChange, label, icon: Icon, min = 0, max = 100, unit = '', description = ''
}: {
    value: number;
    onChange: (v: number) => void;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    min?: number;
    max?: number;
    unit?: string;
    description?: string;
}) => {
    // Validation: prevent values outside range
    const handleChange = (newValue: number) => {
        if (newValue < min) newValue = min;
        if (newValue > max) newValue = max;
        onChange(newValue);
    };

    return (
        <div className="bg-slate-800/50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
                <Icon className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white dark:text-white">{label}</span>
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={() => handleChange(value - 1)}
                    className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white font-bold transition-colors disabled:opacity-50"
                    disabled={value <= min}
                    aria-label={`Decrease ${label} `}
                >
                    −
                </button>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white dark:text-white">{value}</div>
                    {unit && <div className="text-xs text-slate-500">{unit}</div>}
                </div>
                <button
                    onClick={() => handleChange(value + 1)}
                    className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white font-bold transition-colors disabled:opacity-50"
                    disabled={value >= max}
                    aria-label={`Increase ${label} `}
                >
                    +
                </button>
            </div>
            {description && <p className="text-xs text-slate-500 mt-2 text-center">{description}</p>}
            {value >= max && <p className="text-xs text-amber-400 mt-1 text-center">Maximum reached</p>}
        </div>
    );
};

const SelectInput = ({
    value, onChange, label, icon: Icon, options, description = ''
}: {
    value: string;
    onChange: (v: string) => void;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    options: { value: string; label: string }[];
    description?: string;
}) => (
    <div className="bg-slate-800/50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-3 mb-3">
            <Icon className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-white dark:text-white">{label}</span>
        </div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        {description && <p className="text-xs text-slate-500 mt-2">{description}</p>}
    </div>
);

const ToggleInput = ({
    value, onChange, label, icon: Icon
}: {
    value: boolean;
    onChange: (v: boolean) => void;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}) => (
    <button
        onClick={() => onChange(!value)}
        className={`bg - slate - 800 / 50 rounded - xl p - 4 border transition - colors flex items - center gap - 3 w - full ${value ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'} `}
        aria-pressed={value}
    >
        <Icon className={`w - 5 h - 5 ${value ? 'text-blue-400' : 'text-slate-500'} `} />
        <span className={`font - medium ${value ? 'text-white' : 'text-slate-400'} `}>{label}</span>
        <div className="ml-auto">
            <div className={`w - 12 h - 6 rounded - full p - 1 transition - colors ${value ? 'bg-blue-500' : 'bg-slate-700'} `}>
                <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ x: value ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    </button>
);

const SliderInput = ({
    value, onChange, label, icon: Icon, min = 0, max = 100, step = 1, unit = ''
}: {
    value: number;
    onChange: (v: number) => void;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
}) => (
    <div className="bg-slate-800/50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white dark:text-white">{label}</span>
            </div>
            <span className="text-blue-400 font-bold">{value} {unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            aria-label={label}
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{min} {unit}</span>
            <span>{max} {unit}</span>
        </div>
    </div>
);

// ============================================================================
// STEP COMPONENTS
// ============================================================================

const StepLocation = ({ input, setInput }: { input: DoseInput; setInput: (i: DoseInput) => void }) => (
    <div className="space-y-6">
        <div className="text-center mb-8">
            <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Where Do You Live?</h2>
            <p className="text-slate-400 mt-2">Background radiation varies by location</p>
        </div>

        <SelectInput
            value={input.region}
            onChange={(v) => setInput({ ...input, region: v })}
            label="Region"
            icon={MapPin}
            options={Object.entries(REGION_NAMES).map(([value, label]) => ({ value, label }))}
            description="Different regions have varying natural background radiation."
        />

        <SliderInput
            value={input.altitudeMeters}
            onChange={(v) => setInput({ ...input, altitudeMeters: v })}
            label="Altitude"
            icon={Zap}
            min={0}
            max={4000}
            step={100}
            unit="m"
        />

        {/* Enhancement 7: Distance from Nuclear Plant */}
        <SelectInput
            value={input.nuclearPlantProximity}
            onChange={(v) => setInput({ ...input, nuclearPlantProximity: v as DoseInput['nuclearPlantProximity'] })}
            label="Distance from Nuclear Plant"
            icon={Atom}
            options={NUCLEAR_PLANT_OPTIONS}
            description="Nuclear plants emit negligible radiation - well below regulatory limits."
        />

        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <strong className="text-blue-400">Did you know?</strong> Nuclear plants contribute less than 0.1%
                    of public radiation exposure. The NRC limits public doses near plants to 1 mSv/year additional.
                </div>
            </div>
        </div>
    </div>
);

const StepHome = ({ input, setInput }: { input: DoseInput; setInput: (i: DoseInput) => void }) => (
    <div className="space-y-6">
        <div className="text-center mb-8">
            <Home className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Your Living Environment</h2>
            <p className="text-slate-400 mt-2">Building materials and radon affect indoor exposure</p>
        </div>

        <SelectInput
            value={input.homeType}
            onChange={(v) => setInput({ ...input, homeType: v as DoseInput['homeType'] })}
            label="Home Type"
            icon={Home}
            options={[
                { value: 'apartment', label: 'Apartment (Concrete Building)' },
                { value: 'house_concrete', label: 'House (Concrete/Masonry)' },
                { value: 'house_brick', label: 'House (Brick)' },
                { value: 'house_wood', label: 'House (Wood Frame)' },
            ]}
        />

        <ToggleInput
            value={input.hasBasement}
            onChange={(v) => setInput({ ...input, hasBasement: v })}
            label="I have a basement or spend time in one"
            icon={Home}
        />

        <SelectInput
            value={input.radonLevel}
            onChange={(v) => setInput({ ...input, radonLevel: v as DoseInput['radonLevel'] })}
            label="Radon Level in Your Area"
            icon={AlertCircle}
            options={[
                { value: 'unknown', label: "I don't know (use average)" },
                { value: 'low', label: 'Low radon area' },
                { value: 'average', label: 'Average radon area' },
                { value: 'high', label: 'High radon area' },
            ]}
            description="Radon is typically the largest source of natural radiation exposure."
        />

        <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-xl">
            <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <strong className="text-amber-400">Radon is reducible:</strong> Radon exposure can be significantly
                    reduced through home ventilation and basement sealing. Testing your home is the first step.
                </div>
            </div>
        </div>
    </div>
);

const StepMedical = ({ input, setInput }: { input: DoseInput; setInput: (i: DoseInput) => void }) => (
    <div className="space-y-6">
        <div className="text-center mb-8">
            <Stethoscope className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Medical Procedures</h2>
            <p className="text-slate-400 mt-2">How many did you have in the past year?</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <NumberInput value={input.chestXrays} onChange={(v) => setInput({ ...input, chestXrays: v })} label="Chest X-rays" icon={Activity} max={20} description="0.1 mSv each" />
            <NumberInput value={input.dentalXrays} onChange={(v) => setInput({ ...input, dentalXrays: v })} label="Dental X-rays" icon={Activity} max={20} description="0.005 mSv each" />
            <NumberInput value={input.mammograms} onChange={(v) => setInput({ ...input, mammograms: v })} label="Mammograms" icon={Activity} max={10} description="0.4 mSv each" />
            <NumberInput value={input.ctHead} onChange={(v) => setInput({ ...input, ctHead: v })} label="CT Scans (Head)" icon={Activity} max={10} description="2.0 mSv each" />
            <NumberInput value={input.ctChest} onChange={(v) => setInput({ ...input, ctChest: v })} label="CT Scans (Chest)" icon={Activity} max={10} description="7.0 mSv each" />
            <NumberInput value={input.ctAbdomen} onChange={(v) => setInput({ ...input, ctAbdomen: v })} label="CT Scans (Abdomen)" icon={Activity} max={10} description="10.0 mSv each" />
        </div>

        {/* Enhancement 3: Other Medical Procedures */}
        <NumberInput
            value={input.otherMedical}
            onChange={(v) => setInput({ ...input, otherMedical: v })}
            label="Other Scans (PET, Nuclear Medicine, Fluoroscopy)"
            icon={Activity}
            max={20}
            description="~0.5 mSv each average. Includes PET scans, nuclear medicine studies, fluoroscopy."
        />

        <div className="p-4 bg-rose-900/20 border border-rose-500/30 rounded-xl">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <strong className="text-rose-400">Medical doses are beneficial:</strong> The diagnostic benefit of medical imaging
                    far outweighs the small radiation risk. Never skip needed imaging based on radiation concerns.
                </div>
            </div>
        </div>
    </div>
);

const StepTravel = ({ input, setInput }: { input: DoseInput; setInput: (i: DoseInput) => void }) => (
    <div className="space-y-6">
        <div className="text-center mb-8">
            <Plane className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Air Travel</h2>
            <p className="text-slate-400 mt-2">How many flights did you take in the past year?</p>
        </div>

        <NumberInput value={input.shortFlights} onChange={(v) => setInput({ ...input, shortFlights: v })} label="Short Flights (< 3 hours)" icon={Plane} max={200} unit="flights" description="e.g., NYC → Chicago (0.01 mSv each)" />
        <NumberInput value={input.mediumFlights} onChange={(v) => setInput({ ...input, mediumFlights: v })} label="Medium Flights (3-6 hours)" icon={Plane} max={100} unit="flights" description="e.g., NYC → LA (0.03 mSv each)" />
        <NumberInput value={input.longFlights} onChange={(v) => setInput({ ...input, longFlights: v })} label="Long Flights (> 6 hours)" icon={Plane} max={50} unit="flights" description="e.g., NYC → London (0.07 mSv each)" />

        <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <strong className="text-cyan-400">Airline crew perspective:</strong> Airline crew members receive about
                    {OCCUPATIONAL_DOSES.airline_crew} mSv/year on average from cosmic radiation - well within safe limits.
                </div>
            </div>
        </div>
    </div>
);

const StepLifestyle = ({ input, setInput }: { input: DoseInput; setInput: (i: DoseInput) => void }) => (
    <div className="space-y-6">
        <div className="text-center mb-8">
            <Leaf className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Lifestyle Factors</h2>
            <p className="text-slate-400 mt-2">Diet and habits that contribute to dose</p>
        </div>

        <SliderInput value={input.smokingPacks} onChange={(v) => setInput({ ...input, smokingPacks: v })} label="Cigarette Smoking" icon={AlertCircle} min={0} max={2} step={0.5} unit="packs/day" />

        {input.smokingPacks > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                        <strong className="text-red-400">Health priority:</strong> Smoking delivers radiation via polonium-210 and
                        has many other health risks. Quitting is the single best thing you can do for your health.
                    </div>
                </div>
            </motion.div>
        )}

        <SliderInput value={input.bananasPerWeek} onChange={(v) => setInput({ ...input, bananasPerWeek: v })} label="Bananas Eaten" icon={Banana} min={0} max={30} step={1} unit="per week" />
        <SliderInput value={input.brazilNutsPerWeek} onChange={(v) => setInput({ ...input, brazilNutsPerWeek: v })} label="Brazil Nuts (Handfuls)" icon={Leaf} min={0} max={10} step={1} unit="per week" />

        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <strong className="text-green-400">The Banana Equivalent Dose:</strong> Bananas contain potassium-40,
                    making them slightly radioactive. Scientists use "BED" as a fun way to compare tiny doses -
                    eat your bananas without worry!
                </div>
            </div>
        </div>
    </div>
);

// ============================================================================
// SHAREABLE RESULTS CARD GENERATOR
// ============================================================================
const generateShareableCard = (result: DoseResult): Promise<string> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 630;
        const ctx = canvas.getContext('2d')!;

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1200, 630);

        // Title
        ctx.fillStyle = '#3b82f6';
        ctx.font = 'bold 36px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('🍌 MY ANNUAL RADIATION DOSE', 600, 80);

        // Main dose value
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 120px system-ui';
        ctx.fillText(`${result.totalDose.toFixed(2)} `, 600, 220);

        ctx.font = 'bold 40px system-ui';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('mSv/year', 600, 280);

        // Risk category
        const riskInfo = RISK_CATEGORIES[result.riskCategory];
        ctx.font = 'bold 28px system-ui';
        ctx.fillStyle = riskInfo.color === 'emerald' ? '#10b981' :
            riskInfo.color === 'green' ? '#22c55e' :
                riskInfo.color === 'blue' ? '#3b82f6' :
                    riskInfo.color === 'amber' ? '#f59e0b' : '#ef4444';
        ctx.fillText(`${riskInfo.label}: ${riskInfo.description} `, 600, 340);

        // Comparisons
        ctx.font = '24px system-ui';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`= ${result.comparisons.bananaEquivalent.toLocaleString()} Bananas  •  ${result.comparisons.chestXrayEquivalent} Chest X - Rays  •  ${result.comparisons.percentOfWorkerLimit}% of Worker Limit`, 600, 420);

        // Breakdown bar
        const barY = 480;
        const barHeight = 40;
        const barWidth = 1000;
        const startX = 100;

        const sources = [
            { value: result.breakdown.radon, color: '#f97316' },
            { value: result.breakdown.cosmic, color: '#3b82f6' },
            { value: result.breakdown.terrestrial, color: '#f59e0b' },
            { value: result.breakdown.medical, color: '#ec4899' },
            { value: result.breakdown.internal, color: '#22c55e' },
            { value: result.breakdown.travel, color: '#06b6d4' },
            { value: result.breakdown.smoking, color: '#dc2626' },
        ].filter(s => s.value > 0);

        let currentX = startX;
        sources.forEach(source => {
            const width = (source.value / result.totalDose) * barWidth;
            ctx.fillStyle = source.color;
            ctx.fillRect(currentX, barY, width, barHeight);
            currentX += width;
        });

        // Footer
        ctx.fillStyle = '#64748b';
        ctx.font = '20px system-ui';
        ctx.fillText('Calculate yours at nuclear-safety-edu.vercel.app/dose-calculator', 600, 590);

        resolve(canvas.toDataURL('image/png'));
    });
};

// ============================================================================
// RESULTS COMPONENT
// ============================================================================
const Results = ({ result, onReset }: { result: DoseResult; onReset: () => void }) => {
    const riskInfo = RISK_CATEGORIES[result.riskCategory];
    const maxDose = 20;
    const gaugePercent = Math.min((result.totalDose / maxDose) * 100, 100);
    const [isSharing, setIsSharing] = useState(false);

    const breakdownItems = [
        { label: 'Radon', value: result.breakdown.radon, color: 'bg-orange-500' },
        { label: 'Cosmic', value: result.breakdown.cosmic, color: 'bg-blue-500' },
        { label: 'Terrestrial', value: result.breakdown.terrestrial, color: 'bg-amber-500' },
        { label: 'Internal', value: result.breakdown.internal, color: 'bg-green-500' },
        { label: 'Medical', value: result.breakdown.medical, color: 'bg-rose-500' },
        { label: 'Travel', value: result.breakdown.travel, color: 'bg-cyan-500' },
        { label: 'Smoking', value: result.breakdown.smoking, color: 'bg-red-600' },
        { label: 'Dietary', value: result.breakdown.dietary, color: 'bg-lime-500' },
        { label: 'Nuclear Plant', value: result.breakdown.nuclearPlant, color: 'bg-purple-500' },
    ].filter(item => item.value > 0.001);

    const getRiskColorClass = (color: string) => {
        const colors: Record<string, string> = {
            'emerald': 'bg-emerald-500/20 text-emerald-400',
            'green': 'bg-green-500/20 text-green-400',
            'blue': 'bg-blue-500/20 text-blue-400',
            'amber': 'bg-amber-500/20 text-amber-400',
            'red': 'bg-red-500/20 text-red-400',
        };
        return colors[color] || 'bg-slate-500/20 text-slate-400';
    };

    // Enhancement 1: Share functionality - now always downloads
    const handleShare = async () => {
        setIsSharing(true);
        try {
            const imageData = await generateShareableCard(result);

            // Always download the image for reliability
            const link = document.createElement('a');
            link.download = `my-radiation-dose-${result.totalDose.toFixed(1)}mSv.png`;
            link.href = imageData;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Also try native share if available (mobile)
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: 'My Annual Radiation Dose',
                        text: `My annual radiation dose is ${result.totalDose.toFixed(2)} mSv - that's ${result.comparisons.bananaEquivalent.toLocaleString()} bananas! 🍌`,
                        url: 'https://nuclear-safety-edu.vercel.app/dose-calculator',
                    });
                }
            } catch {
                // Native share not available or cancelled, image already downloaded
            }
        } catch (error) {
            console.error('Share failed:', error);
            alert('Could not generate share image. Please try the Print Report button instead.');
        }
        setIsSharing(false);
    };

    // Enhancement 8: PDF Export (simplified version)
    const handleDownloadPDF = () => {
        const printContent = `
      <html>
        <head>
          <title>My Radiation Dose Report</title>
          <style>
            body { font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #3b82f6; }
            .dose { font-size: 48px; font-weight: bold; color: #1e293b; }
            .breakdown { margin-top: 20px; }
            .bar { height: 20px; background: #e2e8f0; border-radius: 10px; overflow: hidden; margin: 8px 0; }
            .fill { height: 100%; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td, th { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
            .disclaimer { margin-top: 30px; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <h1>🍌 My Annual Radiation Dose Report</h1>
          <p class="dose">${result.totalDose.toFixed(2)} mSv/year</p>
          <p><strong>${riskInfo.label}:</strong> ${riskInfo.description}</p>
          
          <h2>Comparisons</h2>
          <table>
            <tr><td>Banana Equivalent</td><td>${result.comparisons.bananaEquivalent.toLocaleString()} bananas</td></tr>
            <tr><td>Chest X-Ray Equivalent</td><td>${result.comparisons.chestXrayEquivalent} X-rays</td></tr>
            <tr><td>% of Nuclear Worker Limit</td><td>${result.comparisons.percentOfWorkerLimit}%</td></tr>
            <tr><td>% of US Average</td><td>${result.comparisons.percentOfUSAverage}%</td></tr>
          </table>
          
          <h2>Dose Breakdown</h2>
          <table>
            ${breakdownItems.map(item => `<tr><td>${item.label}</td><td>${item.value.toFixed(3)} mSv</td></tr>`).join('')}
          </table>
          
          <h2>Reference Values</h2>
          <table>
            <tr><td>US Average Annual</td><td>${REFERENCE_VALUES.usAverageAnnual} mSv/year</td></tr>
            <tr><td>Natural Background</td><td>${REFERENCE_VALUES.naturalBackgroundOnly} mSv/year</td></tr>
            <tr><td>Nuclear Worker Limit</td><td>${REFERENCE_VALUES.nuclearWorkerLimit} mSv/year</td></tr>
          </table>
          
          <p class="disclaimer">
            <strong>Disclaimer:</strong> This calculator provides educational estimates based on population averages. 
            Individual doses may vary. For precise measurements, consult a health physicist.
            <br><br>Data sources: UNSCEAR 2008, NCRP 160, EPA, ACR, EURADOS.
            <br>Generated at: nuclear-safety-edu.vercel.app/dose-calculator
          </p>
        </body>
      </html>
    `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
    };

    // Celebratory animation for low doses
    const showCelebration = result.riskCategory === 'very_low' || result.riskCategory === 'low';

    return (
        <div className="space-y-8">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    {showCelebration ? (
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Calculator className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        </motion.div>
                    ) : (
                        <Calculator className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    )}
                </motion.div>
                <h2 className="text-3xl font-bold text-white">Your Annual Radiation Dose</h2>
                <p className="text-slate-400 mt-2">Based on your inputs</p>
            </div>

            <motion.div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="relative w-48 h-24 mx-auto mb-6 overflow-hidden">
                    <div className="absolute inset-0 border-[12px] border-slate-700 rounded-t-full" />
                    <motion.div
                        className={`absolute inset-0 border-[12px] rounded-t-full origin-bottom ${showCelebration ? 'border-emerald-500' : 'border-blue-500'}`}
                        style={{ clipPath: `inset(0 ${100 - gaugePercent}% 0 0)` }}
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: `inset(0 ${100 - gaugePercent}% 0 0)` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                </div>

                <motion.div className="text-5xl font-bold text-white mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    {result.totalDose.toFixed(2)}
                    <span className="text-xl text-slate-400 ml-2">mSv/year</span>
                </motion.div>

                <motion.div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getRiskColorClass(riskInfo.color)}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <Shield className="w-4 h-4" />
                    {riskInfo.label}: {riskInfo.description}
                </motion.div>
            </motion.div>

            {/* Comparisons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Banana className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{result.comparisons.bananaEquivalent.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">Banana Equivalent</div>
                </motion.div>

                <motion.div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Activity className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{result.comparisons.chestXrayEquivalent}</div>
                    <div className="text-xs text-slate-500">Chest X-Ray Equivalent</div>
                </motion.div>

                <motion.div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{result.comparisons.percentOfWorkerLimit}%</div>
                    <div className="text-xs text-slate-500">of Nuclear Worker Limit</div>
                </motion.div>

                <motion.div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{result.comparisons.percentOfUSAverage}%</div>
                    <div className="text-xs text-slate-500">of US Average</div>
                </motion.div>
            </div>

            {/* Breakdown Chart */}
            <motion.div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <h3 className="text-lg font-bold text-white mb-4">Dose Breakdown by Source</h3>
                <div className="space-y-3">
                    {breakdownItems.map((item, i) => (
                        <div key={item.label} className="flex items-center gap-3">
                            <div className="w-28 text-sm text-slate-400">{item.label}</div>
                            <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                                <motion.div
                                    className={`h-full ${item.color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.max((item.value / result.totalDose) * 100, 1)}%` }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                />
                            </div>
                            <div className="w-24 text-right text-sm text-white font-medium">{item.value.toFixed(3)} mSv</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Context - Climate/Sustainability Message */}
            <motion.div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-400" />
                    Putting It In Perspective
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                        <strong className="text-blue-400">Reference Values:</strong>
                        <ul className="mt-2 space-y-1">
                            <li>• US Average: {REFERENCE_VALUES.usAverageAnnual} mSv/year</li>
                            <li>• Natural Background: {REFERENCE_VALUES.naturalBackgroundOnly} mSv/year</li>
                            <li>• Nuclear Worker Limit: {REFERENCE_VALUES.nuclearWorkerLimit} mSv/year</li>
                            <li>• Airline Crew (avg): {OCCUPATIONAL_DOSES.airline_crew} mSv/year</li>
                        </ul>
                    </div>
                    <div>
                        <strong className="text-blue-400">Important Notes:</strong>
                        <ul className="mt-2 space-y-1">
                            <li>• Dose ≠ Danger. Context matters.</li>
                            <li>• Our bodies repair low-level radiation damage.</li>
                            <li>• Health effects only seen above ~100 mSv.</li>
                            <li>• Radon is the biggest reducible source.</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Climate context */}
            <motion.div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                        <strong className="text-emerald-400">Climate perspective:</strong> Nuclear power produces just 12g CO₂/kWh -
                        similar to wind and 40x less than natural gas. Understanding radiation helps inform energy policy decisions.
                    </div>
                </div>
            </motion.div>

            <div className="text-center text-xs text-slate-500 max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> This calculator provides educational estimates based on population averages.
                Individual doses may vary. For precise measurements, consult a health physicist.
                <br />Sources: UNSCEAR 2008, NCRP 160, EPA, ACR, EURADOS.
            </div>

            {/* Action Buttons - Enhancement 1 & 8 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onReset} className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                    <RotateCcw className="w-5 h-5" />
                    Recalculate
                </button>
                <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                    {isSharing ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                    Share Results
                </button>
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
                >
                    <FileText className="w-5 h-5" />
                    Print Report
                </button>
            </div>

            <div className="flex justify-center">
                <Link to="/safety" className="flex items-center justify-center gap-2 px-6 py-3 text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Learn About Nuclear Safety
                    <ChevronRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const DoseCalculatorPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [input, setInput] = useState<DoseInput>(DEFAULT_INPUT);
    const [showResults, setShowResults] = useState(false);
    const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Enhancement 6: Load saved state on mount
    useEffect(() => {
        const saved = loadState();
        if (saved) {
            setInput(saved.input);
            setCurrentStep(saved.step);
        }
    }, []);

    // Enhancement 6: Save state on change
    useEffect(() => {
        saveState(input, currentStep);
    }, [input, currentStep]);

    const currentResult = useMemo(() => calculateDose(input), [input]);

    const handleNext = useCallback(() => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
        }
    }, [currentStep]);

    const handleBack = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const handleReset = useCallback(() => {
        setCurrentStep(1);
        setInput(DEFAULT_INPUT);
        setShowResults(false);
        clearState();
        setShowResetConfirm(false);
    }, []);

    // Enhancement 5: Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't handle if user is typing in an input
            if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
                return;
            }

            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    if (!showResults) handleNext();
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (showResults) {
                        setShowResults(false);
                    } else {
                        handleBack();
                    }
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    setShowResetConfirm(true);
                    break;
                case '?':
                case '/':
                    // Handle both ? (Shift+/) and / key
                    if (e.shiftKey || e.key === '?') {
                        e.preventDefault();
                        setShowKeyboardHelp(true);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handleBack, showResults]);

    const stepComponents = [
        <StepLocation key={1} input={input} setInput={setInput} />,
        <StepHome key={2} input={input} setInput={setInput} />,
        <StepMedical key={3} input={input} setInput={setInput} />,
        <StepTravel key={4} input={input} setInput={setInput} />,
        <StepLifestyle key={5} input={input} setInput={setInput} />,
    ];

    if (showResults) {
        return (
            <motion.div ref={containerRef} className="max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Results result={currentResult} onReset={() => setShowResetConfirm(true)} />

                {/* Reset Confirmation Dialog */}
                <AnimatePresence>
                    {showResetConfirm && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowResetConfirm(false)}
                        >
                            <motion.div
                                className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full mx-4 border border-slate-700"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-xl font-bold text-white mb-2">Reset Calculator?</h3>
                                <p className="text-slate-400 mb-4">This will clear all your inputs and start over.</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowResetConfirm(false)}
                                        className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <KeyboardShortcutsModal isOpen={showKeyboardHelp} onClose={() => setShowKeyboardHelp(false)} />
            </motion.div>
        );
    }

    return (
        <motion.div ref={containerRef} className="max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                    <Calculator className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Radiation Dose Calculator</h1>
                <p className="text-slate-400 mt-2">Estimate your annual radiation exposure from various sources</p>
                <button
                    onClick={() => setShowKeyboardHelp(true)}
                    className="mt-2 text-xs text-slate-500 hover:text-slate-400 flex items-center gap-1 mx-auto"
                >
                    <Keyboard className="w-3 h-3" />
                    Press ? for keyboard shortcuts
                </button>
            </div>

            <ProgressBar currentStep={currentStep} totalSteps={5} />

            <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    {stepComponents[currentStep - 1]}
                </motion.div>
            </AnimatePresence>

            <DosePreview dose={currentResult.totalDose} />

            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${currentStep === 1 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors">
                    {currentStep === 5 ? 'See Results' : 'Next Step'}
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="text-center mt-6 text-sm text-slate-500">
                Step {currentStep} of 5: {WIZARD_STEPS[currentStep - 1].name}
            </div>

            {/* Keyboard Help Modal */}
            <KeyboardShortcutsModal isOpen={showKeyboardHelp} onClose={() => setShowKeyboardHelp(false)} />

            {/* Reset Confirmation */}
            <AnimatePresence>
                {showResetConfirm && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowResetConfirm(false)}
                    >
                        <motion.div
                            className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full mx-4 border border-slate-700"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-white mb-2">Reset Calculator?</h3>
                            <p className="text-slate-400 mb-4">This will clear all your inputs and start over.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium"
                                >
                                    Reset
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
