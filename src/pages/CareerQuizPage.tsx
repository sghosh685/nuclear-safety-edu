import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Briefcase, ChevronRight, ChevronLeft, Check, RotateCcw, Share2,
    GraduationCap, DollarSign, TrendingUp, Sparkles, Home, CheckCircle
} from 'lucide-react';
import {
    QUIZ_QUESTIONS, calculateQuizResults, CAREER_COLORS,
    type CareerProfile, type QuizResult
} from '../data/careerData';

// ============================================================================
// STORAGE KEY
// ============================================================================
const STORAGE_KEY = 'nuclear_career_quiz_progress';

interface StoredState {
    currentQuestion: number;
    answers: Record<number, number>;
    timestamp: number;
}

const saveState = (state: Omit<StoredState, 'timestamp'>) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, timestamp: Date.now() }));
    } catch { /* Ignore storage errors */ }
};

const loadState = (): StoredState | null => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const state = JSON.parse(stored) as StoredState;
            // Check if state is less than 24 hours old
            if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
                return state;
            }
        }
    } catch { /* Ignore storage errors */ }
    return null;
};

const clearState = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch { /* Ignore storage errors */ }
};

// ============================================================================
// TOAST NOTIFICATION
// ============================================================================
const Toast = ({ message, isVisible }: { message: string; isVisible: boolean }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            >
                <div className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>{message}</span>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

// ============================================================================
// PROGRESS BAR
// ============================================================================
const QuizProgress = ({ current, total }: { current: number; total: number }) => (
    <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Question {current} of {total}</span>
            <span>{Math.round((current / total) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${(current / total) * 100}%` }}
                transition={{ duration: 0.3 }}
            />
        </div>
    </div>
);

// ============================================================================
// QUESTION CARD
// ============================================================================
const QuestionCard = ({
    question,
    selectedOption,
    onSelect
}: {
    question: typeof QUIZ_QUESTIONS[0];
    selectedOption: number | null;
    onSelect: (index: number) => void;
}) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
    >
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
            {question.question}
        </h2>

        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(index)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedOption === index
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-600'
                            }`}>
                            {selectedOption === index && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-base">{option.text}</span>
                    </div>
                </button>
            ))}
        </div>
    </motion.div>
);

// ============================================================================
// CAREER CARD
// ============================================================================
const CareerCard = ({ career, rank, isTop = false }: { career: CareerProfile; rank: number; isTop?: boolean }) => {
    const colors = CAREER_COLORS[career.color] || CAREER_COLORS.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rank * 0.1 }}
            className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 ${isTop ? 'ring-2 ring-blue-500' : ''}`}
        >
            {isTop && (
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Best Match!</span>
                </div>
            )}

            <div className="flex items-start gap-4">
                <div className={`text-4xl ${isTop ? 'text-5xl' : ''}`}>{career.emoji}</div>
                <div className="flex-1">
                    <h3 className={`font-bold ${colors.text} ${isTop ? 'text-2xl' : 'text-xl'}`}>
                        {career.title}
                    </h3>
                    <p className="text-slate-400 mt-2 text-sm">{career.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-slate-300">{career.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-slate-300">{career.education}</span>
                        </div>
                    </div>

                    {isTop && (
                        <>
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {career.skills.map((skill) => (
                                        <span key={skill} className="px-2 py-1 bg-slate-700/50 rounded-lg text-xs text-slate-400">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-slate-300 mb-1">A Day in the Life</h4>
                                <p className="text-xs text-slate-400">{career.dayInLife}</p>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs text-slate-400">{career.growth}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// ============================================================================
// RESULTS PAGE
// ============================================================================
const ResultsPage = ({ result, onRetake }: { result: QuizResult; onRetake: () => void }) => {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleShare = useCallback(async () => {
        const text = `I took the Nuclear Career Quiz and I'm a ${result.topMatch.emoji} ${result.topMatch.title}! Find your nuclear career match:`;
        const url = 'https://nuclear-safety-edu.vercel.app/career-quiz';

        try {
            if (navigator.share) {
                await navigator.share({ title: 'My Nuclear Career Match', text, url });
                setToastMessage('Shared successfully!');
            } else {
                await navigator.clipboard.writeText(`${text}\n${url}`);
                setToastMessage('Link copied to clipboard!');
            }
        } catch {
            // User cancelled or error
            await navigator.clipboard.writeText(`${text}\n${url}`);
            setToastMessage('Link copied to clipboard!');
        }
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }, [result.topMatch]);

    return (
        <div className="space-y-8">
            <Toast message={toastMessage} isVisible={showToast} />

            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <Briefcase className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Your Nuclear Career Match</h1>
                <p className="text-slate-400 mt-2">Based on your answers, here are your top career matches</p>
            </div>

            {/* Top Match */}
            <CareerCard career={result.topMatch} rank={0} isTop />

            {/* Other Matches */}
            <div>
                <h3 className="text-lg font-semibold text-slate-300 mb-4">Also Consider</h3>
                <div className="space-y-4">
                    <CareerCard career={result.secondMatch} rank={1} />
                    <CareerCard career={result.thirdMatch} rank={2} />
                </div>
            </div>

            {/* Score Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6"
            >
                <h3 className="text-lg font-semibold text-white mb-2">Full Results</h3>
                <p className="text-xs text-slate-500 mb-4">Colors indicate career category: 🔵 Operations, 🟣 Engineering, 🟡 Safety, 🟢 Environment</p>
                <div className="space-y-3">
                    {result.scores.slice(0, 6).map((item, i) => {
                        const colors = CAREER_COLORS[item.career.color] || CAREER_COLORS.blue;
                        return (
                            <div key={item.career.id} className="flex items-center gap-3">
                                <span className="text-xl">{item.career.emoji}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className={colors.text}>{item.career.title}</span>
                                        <span className="text-slate-500">{item.percentage}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${colors.bg.replace('/20', '')}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.percentage}%` }}
                                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={onRetake}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                >
                    <RotateCcw className="w-5 h-5" />
                    Retake Quiz
                </button>
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
                >
                    <Share2 className="w-5 h-5" />
                    Share Results
                </button>
            </div>

            <div className="flex justify-center gap-6">
                <Link
                    to="/careers"
                    className="flex items-center justify-center gap-2 px-6 py-3 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                    Explore All Nuclear Careers
                    <ChevronRight className="w-5 h-5" />
                </Link>
            </div>

            <p className="text-center text-xs text-slate-500 max-w-xl mx-auto">
                This quiz is for educational purposes and provides general guidance based on your interests.
                Actual career paths may vary. Consult with career counselors and professionals in the field.
            </p>
        </div>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const CareerQuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [isRestored, setIsRestored] = useState(false);

    // Load saved state on mount
    useEffect(() => {
        const savedState = loadState();
        if (savedState && Object.keys(savedState.answers).length > 0) {
            setCurrentQuestion(savedState.currentQuestion);
            setAnswers(savedState.answers);
            setIsRestored(true);
        }
    }, []);

    // Save state on change
    useEffect(() => {
        if (Object.keys(answers).length > 0 && !showResults) {
            saveState({ currentQuestion, answers });
        }
    }, [currentQuestion, answers, showResults]);

    const result = useMemo(() => {
        if (!showResults) return null;
        return calculateQuizResults(answers);
    }, [answers, showResults]);

    const handleSelect = (optionIndex: number) => {
        setAnswers({ ...answers, [QUIZ_QUESTIONS[currentQuestion].id]: optionIndex });
        setIsRestored(false);
    };

    const handleNext = () => {
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
            clearState();
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleRetake = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        clearState();
    };

    if (showResults && result) {
        return (
            <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <ResultsPage result={result} onRetake={handleRetake} />
            </motion.div>
        );
    }

    const currentAnswer = answers[QUIZ_QUESTIONS[currentQuestion].id] ?? null;

    return (
        <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Exit/Home Link */}
            <div className="mb-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                    <Home className="w-4 h-4" />
                    Exit to Home
                </Link>
            </div>

            {/* Header */}
            {currentQuestion === 0 && (
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                        <Briefcase className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-white">Nuclear Career Quiz</h1>
                    <p className="text-slate-400 mt-2">Discover which nuclear industry career matches your interests and skills</p>
                    {isRestored && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Progress restored! Continue where you left off.
                        </motion.div>
                    )}
                </div>
            )}

            {currentQuestion > 0 && (
                <div className="mb-4">
                    <h1 className="text-xl font-semibold text-white text-center">Nuclear Career Quiz</h1>
                </div>
            )}

            <QuizProgress current={currentQuestion + 1} total={QUIZ_QUESTIONS.length} />

            <AnimatePresence mode="wait">
                <QuestionCard
                    key={currentQuestion}
                    question={QUIZ_QUESTIONS[currentQuestion]}
                    selectedOption={currentAnswer}
                    onSelect={handleSelect}
                />
            </AnimatePresence>

            {/* Navigation with back indicator */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${currentQuestion === 0
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                        }`}
                    title={currentQuestion > 0 ? 'Go back to previous question' : 'This is the first question'}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentAnswer === null}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${currentAnswer === null
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                >
                    {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next'}
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <p className="text-center text-xs text-slate-500 mt-6">
                Answer honestly - there are no wrong answers! Your progress is saved automatically.
            </p>
        </motion.div>
    );
};
