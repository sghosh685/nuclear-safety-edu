import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Atom } from 'lucide-react';

export const NotFoundPage = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8 max-w-lg mx-auto px-4"
            >
                {/* Animated 404 */}
                <div className="relative">
                    <motion.div
                        className="text-[150px] font-black text-slate-800 leading-none select-none"
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(59, 130, 246, 0.3)',
                                '0 0 40px rgba(59, 130, 246, 0.5)',
                                '0 0 20px rgba(59, 130, 246, 0.3)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        404
                    </motion.div>
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <Atom className="w-24 h-24 text-blue-500/20" />
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-slate-100">
                        Page Not Found
                    </h1>
                    <p className="text-slate-400">
                        The page you're looking for doesn't exist or has been moved.
                        Unlike a nuclear reactor, this page has experienced a complete meltdown.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <Link
                        to="/reactors"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full font-semibold transition-colors"
                    >
                        <Search className="w-4 h-4" />
                        Explore Reactors
                    </Link>
                </div>

                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go back to previous page
                </button>
            </motion.div>
        </div>
    );
};
