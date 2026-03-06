"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

export function StartupLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading sequence for a premium feel
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 second impressive load sequence

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="startup-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
                >
                    {/* Animated Background Gradients */}
                    <div className="absolute inset-0 z-0">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[20%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-blue-500/20 blur-[100px]"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.05)] mb-8"
                        >
                            <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                        </motion.div>

                        {/* Text Animation */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                                className="text-4xl sm:text-5xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent"
                            >
                                Medico
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden mt-2">
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                                className="text-muted-foreground tracking-widest uppercase text-xs sm:text-sm font-medium"
                            >
                                Authorization System
                            </motion.p>
                        </div>

                        {/* Loading Bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-48 sm:w-64 h-1 bg-white/10 rounded-full mt-12 overflow-hidden"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="w-full h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
