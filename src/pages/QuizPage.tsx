import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, Trophy, ArrowRight, HelpCircle, Atom, ShieldCheck, AlertTriangle, BarChart3 } from 'lucide-react';
import { reactorQuiz, safetyQuiz, accidentsQuiz } from '../data/quizzes';
import type { Quiz } from '../types';

interface ScoreRecord {
    quizId: string;
    score: number;
    total: number;
    date: string;
}

const quizOptions = [
    { quiz: reactorQuiz, icon: Atom, color: 'blue', description: 'Test your knowledge of reactor designs' },
    { quiz: safetyQuiz, icon: ShieldCheck, color: 'emerald', description: 'Learn about safety principles' },
    { quiz: accidentsQuiz, icon: AlertTriangle, color: 'amber', description: 'Understand lessons from history' },
];

export const QuizPage = () => {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [scoreHistory, setScoreHistory] = useState<ScoreRecord[]>([]);

    // Load score history from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('nuclear-edu-scores');
        if (saved) {
            setScoreHistory(JSON.parse(saved));
        }
    }, []);

    const saveScore = (quizId: string, score: number, total: number) => {
        const newRecord: ScoreRecord = {
            quizId,
            score,
            total,
            date: new Date().toISOString().split('T')[0],
        };
        const updated = [...scoreHistory, newRecord].slice(-10); // Keep last 10
        setScoreHistory(updated);
        localStorage.setItem('nuclear-edu-scores', JSON.stringify(updated));
    };

    const handleOptionClick = (index: number) => {
        if (isAnswered || !selectedQuiz) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === selectedQuiz.questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (!selectedQuiz) return;
        if (currentQuestionIndex + 1 < selectedQuiz.questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            saveScore(selectedQuiz.id, score + (selectedOption === selectedQuiz.questions[currentQuestionIndex].correctAnswer ? 1 : 0), selectedQuiz.questions.length);
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
        setSelectedQuiz(null);
    };

    const getBestScore = (quizId: string) => {
        const quizScores = scoreHistory.filter(s => s.quizId === quizId);
        if (quizScores.length === 0) return null;
        return Math.max(...quizScores.map(s => Math.round((s.score / s.total) * 100)));
    };

    // Quiz Selection Screen
    if (!selectedQuiz) {
        return (
            <div className="space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Test Your Knowledge
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Choose a quiz category to test what you've learned. Your high scores are saved locally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quizOptions.map(({ quiz, icon: Icon, color, description }) => {
                        const bestScore = getBestScore(quiz.id);
                        return (
                            <motion.button
                                key={quiz.id}
                                onClick={() => setSelectedQuiz(quiz)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-6 bg-slate-900 border border-slate-800 rounded-2xl text-left hover:border-${color}-500/50 transition-all group`}
                            >
                                <div className={`w-12 h-12 bg-${color}-500/10 rounded-xl flex items-center justify-center mb-4 text-${color}-400 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                                <p className="text-slate-400 text-sm mb-4">{description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">{quiz.questions.length} questions</span>
                                    {bestScore !== null && (
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${color}-500/10 text-${color}-400`}>
                                            Best: {bestScore}%
                                        </span>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Score History */}
                {scoreHistory.length > 0 && (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-purple-400" /> Recent Attempts
                        </h3>
                        <div className="space-y-2">
                            {scoreHistory.slice(-5).reverse().map((record, i) => (
                                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-800 last:border-0">
                                    <span className="text-slate-400">{record.date}</span>
                                    <span className="text-slate-300">{quizOptions.find(q => q.quiz.id === record.quizId)?.quiz.title}</span>
                                    <span className={`font-medium ${record.score / record.total >= 0.8 ? 'text-emerald-400' : record.score / record.total >= 0.6 ? 'text-yellow-400' : 'text-rose-400'}`}>
                                        {record.score}/{record.total} ({Math.round((record.score / record.total) * 100)}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const question = selectedQuiz.questions[currentQuestionIndex];

    // Results Screen
    if (showResult) {
        const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
        return (
            <div className="max-w-xl mx-auto text-center space-y-8 py-12">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-12 space-y-6"
                >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${percentage >= 80 ? 'bg-emerald-500/10' : percentage >= 60 ? 'bg-yellow-500/10' : 'bg-rose-500/10'}`}>
                        <Trophy className={`w-12 h-12 ${percentage >= 80 ? 'text-emerald-500' : percentage >= 60 ? 'text-yellow-500' : 'text-rose-500'}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                        {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
                    </h2>
                    <div className="space-y-2">
                        <p className="text-slate-400">You scored</p>
                        <p className={`text-5xl font-extrabold ${percentage >= 80 ? 'text-emerald-400' : percentage >= 60 ? 'text-yellow-400' : 'text-rose-400'}`}>
                            {score} / {selectedQuiz.questions.length}
                        </p>
                        <p className="text-sm text-slate-500">{percentage}% Correct</p>
                    </div>

                    <div className="flex gap-4 justify-center mt-8">
                        <button
                            onClick={resetQuiz}
                            className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-colors gap-2"
                        >
                            Choose Another Quiz
                        </button>
                        <button
                            onClick={() => {
                                setShowResult(false);
                                setCurrentQuestionIndex(0);
                                setSelectedOption(null);
                                setIsAnswered(false);
                                setScore(0);
                            }}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Try Again
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Quiz Question Screen
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <button
                    onClick={resetQuiz}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                    ← Back to Quizzes
                </button>
                <h1 className="text-xl font-bold text-white">{selectedQuiz.title}</h1>
                <div className="text-sm font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">
                    {currentQuestionIndex + 1} / {selectedQuiz.questions.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex) / selectedQuiz.questions.length) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8"
                >
                    <h3 className="text-xl font-semibold text-slate-100 leading-relaxed">
                        {question.question}
                    </h3>

                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            let stateClasses = "hover:bg-slate-800 border-slate-700 hover:border-blue-500/50";

                            if (isAnswered) {
                                if (index === question.correctAnswer) {
                                    stateClasses = "bg-emerald-900/20 border-emerald-500/50 text-emerald-100";
                                } else if (index === selectedOption) {
                                    stateClasses = "bg-rose-900/20 border-rose-500/50 text-rose-100";
                                } else {
                                    stateClasses = "opacity-50 border-slate-800";
                                }
                            } else if (selectedOption === index) {
                                stateClasses = "bg-blue-900/20 border-blue-500 text-blue-100";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={isAnswered}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${stateClasses} ${isAnswered ? '' : 'text-slate-300'}`}
                                >
                                    <span>{option}</span>
                                    {isAnswered && index === question.correctAnswer && (
                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    )}
                                    {isAnswered && index === selectedOption && index !== question.correctAnswer && (
                                        <XCircle className="w-5 h-5 text-rose-500" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 space-y-2"
                        >
                            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                                <HelpCircle className="w-4 h-4" /> Explanation
                            </div>
                            <p className="text-slate-300 text-sm">
                                {question.explanation}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`
            flex items-center px-6 py-3 rounded-full font-semibold transition-all
            ${isAnswered
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
                >
                    {currentQuestionIndex + 1 === selectedQuiz.questions.length ? 'Finish Quiz' : 'Next Question'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    );
};
