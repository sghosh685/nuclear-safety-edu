import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Calculator, MapPin, Home, Stethoscope, Plane, Leaf,
    ChevronRight, ChevronLeft, Check, AlertCircle, Info,
    Banana, Activity, Shield, Zap, RotateCcw
} from 'lucide-react';
import type { DoseInput, DoseResult } from '../data/doseData';
import {
    calculateDose, DEFAULT_INPUT,
    WIZARD_STEPS, REGION_NAMES, RISK_CATEGORIES, REFERENCE_VALUES
} from '../data/doseData';

// Progress Bar Component
const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
    <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;

            return (
                <div key={step} className="flex items-center">
                    <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isCompleted ? 'bg-emerald-500 text-white' : ''} ${isCurrent ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' : ''} ${!isCompleted && !isCurrent ? 'bg-slate-700 text-slate-400' : ''}`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {isCompleted ? <Check className="w-5 h-5" /> : step}
                    </motion.div>
                    {step < totalSteps && (
                        <div className={`w-8 h-1 mx-1 rounded ${isCompleted ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                    )}
                </div>
            );
        })}
    </div>
);

// Dose Preview Component
const DosePreview = ({ dose }: { dose: number }) => (
    <motion.div
        className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400">Current estimated dose:</span>
        </div>
        <div className="text-xl font-bold text-blue-400">
            {dose.toFixed(2)} <span className="text-sm font-normal text-slate-500">mSv/year</span>
        </div>
    </motion.div>
);

// Number Input with +/- buttons
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
}) => (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-3 mb-3">
            <Icon className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-white">{label}</span>
        </div>
        <div className="flex items-center justify-between">
            <button
                onClick={() => onChange(Math.max(min, value - 1))}
                className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white font-bold transition-colors"
                disabled={value <= min}
            >
                −
            </button>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">{value}</div>
                {unit && <div className="text-xs text-slate-500">{unit}</div>}
            </div>
            <button
                onClick={() => onChange(Math.min(max, value + 1))}
                className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white font-bold transition-colors"
                disabled={value >= max}
            >
                +
            </button>
        </div>
        {description && <p className="text-xs text-slate-500 mt-2 text-center">{description}</p>}
    </div>
);

// Select Input
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
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-3 mb-3">
            <Icon className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-white">{label}</span>
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

// Toggle Input
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
        className={`bg-slate-800/50 rounded-xl p-4 border transition-colors flex items-center gap-3 w-full ${value ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'}`}
    >
        <Icon className={`w-5 h-5 ${value ? 'text-blue-400' : 'text-slate-500'}`} />
        <span className={`font-medium ${value ? 'text-white' : 'text-slate-400'}`}>{label}</span>
        <div className="ml-auto">
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-blue-500' : 'bg-slate-700'}`}>
                <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ x: value ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    </button>
);

// Slider Input
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
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">{label}</span>
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
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{min} {unit}</span>
            <span>{max} {unit}</span>
        </div>
    </div>
);

// Step 1: Location
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

        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <strong className="text-blue-400">Why altitude matters:</strong> Cosmic radiation increases with altitude.
                    People living in Denver (1,600m) receive about 50% more cosmic radiation than those at sea level.
                </div>
            </div>
        </div>
    </div>
);

// Step 2: Home
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
                    <strong className="text-amber-400">Radon is #1:</strong> Radon gas (from natural uranium in soil)
                    accounts for about half of all natural radiation exposure. Testing your home is the only way to know your level.
                </div>
            </div>
        </div>
    </div>
);

// Step 3: Medical
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

        <div className="p-4 bg-rose-900/20 border border-rose-500/30 rounded-xl">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <strong className="text-rose-400">Medical doses are beneficial:</strong> The benefit of diagnosing
                    medical conditions typically far outweighs the small radiation risk. Never skip needed medical imaging.
                </div>
            </div>
        </div>
    </div>
);

// Step 4: Travel
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
                    <strong className="text-cyan-400">At cruising altitude:</strong> Cosmic radiation is about 100x
                    higher than at sea level. A transatlantic flight gives roughly the same dose as 1 chest X-ray.
                </div>
            </div>
        </div>
    </div>
);

// Step 5: Lifestyle
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
                        <strong className="text-red-400">Important:</strong> Smoking delivers radiation directly to lung tissue via polonium-210 in tobacco.
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
                    making them slightly radioactive. Scientists use "BED" as a fun way to compare tiny doses.
                </div>
            </div>
        </div>
    </div>
);

// Results Component
const Results = ({ result, onReset }: { result: DoseResult; onReset: () => void }) => {
    const riskInfo = RISK_CATEGORIES[result.riskCategory];
    const maxDose = 20;
    const gaugePercent = Math.min((result.totalDose / maxDose) * 100, 100);

    const breakdownItems = [
        { label: 'Cosmic', value: result.breakdown.cosmic, color: 'bg-blue-500' },
        { label: 'Terrestrial', value: result.breakdown.terrestrial, color: 'bg-amber-500' },
        { label: 'Radon', value: result.breakdown.radon, color: 'bg-orange-500' },
        { label: 'Internal', value: result.breakdown.internal, color: 'bg-green-500' },
        { label: 'Medical', value: result.breakdown.medical, color: 'bg-rose-500' },
        { label: 'Travel', value: result.breakdown.travel, color: 'bg-cyan-500' },
        { label: 'Smoking', value: result.breakdown.smoking, color: 'bg-red-600' },
        { label: 'Dietary', value: result.breakdown.dietary, color: 'bg-lime-500' },
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

    return (
        <div className="space-y-8">
            <div className="text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                    <Calculator className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white">Your Annual Radiation Dose</h2>
                <p className="text-slate-400 mt-2">Based on your inputs</p>
            </div>

            <motion.div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="relative w-48 h-24 mx-auto mb-6 overflow-hidden">
                    <div className="absolute inset-0 border-[12px] border-slate-700 rounded-t-full" />
                    <motion.div
                        className="absolute inset-0 border-[12px] border-blue-500 rounded-t-full origin-bottom"
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
                            <div className="w-24 text-sm text-slate-400">{item.label}</div>
                            <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                                <motion.div
                                    className={`h-full ${item.color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.value / result.totalDose) * 100}%` }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                />
                            </div>
                            <div className="w-20 text-right text-sm text-white font-medium">{item.value.toFixed(2)} mSv</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Context */}
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
                        </ul>
                    </div>
                    <div>
                        <strong className="text-blue-400">Important Notes:</strong>
                        <ul className="mt-2 space-y-1">
                            <li>• Dose ≠ Danger. Context matters.</li>
                            <li>• Our bodies repair low-level radiation damage.</li>
                            <li>• Effects are only seen above ~100 mSv.</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            <div className="text-center text-xs text-slate-500 max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> This calculator provides educational estimates based on population averages.
                Individual doses may vary. For precise measurements, consult a health physicist. Sources: UNSCEAR 2008, NCRP 160, EPA, ACR.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onReset} className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                    <RotateCcw className="w-5 h-5" />
                    Recalculate
                </button>
                <Link to="/safety" className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors">
                    Learn About Nuclear Safety
                    <ChevronRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

// Main Component
export const DoseCalculatorPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [input, setInput] = useState<DoseInput>(DEFAULT_INPUT);
    const [showResults, setShowResults] = useState(false);

    const currentResult = useMemo(() => calculateDose(input), [input]);

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(1);
        setInput(DEFAULT_INPUT);
        setShowResults(false);
    };

    const stepComponents = [
        <StepLocation key={1} input={input} setInput={setInput} />,
        <StepHome key={2} input={input} setInput={setInput} />,
        <StepMedical key={3} input={input} setInput={setInput} />,
        <StepTravel key={4} input={input} setInput={setInput} />,
        <StepLifestyle key={5} input={input} setInput={setInput} />,
    ];

    if (showResults) {
        return (
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Results result={currentResult} onReset={handleReset} />
            </motion.div>
        );
    }

    return (
        <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                    <Calculator className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Radiation Dose Calculator</h1>
                <p className="text-slate-400 mt-2">Estimate your annual radiation exposure from various sources</p>
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
        </motion.div>
    );
};
