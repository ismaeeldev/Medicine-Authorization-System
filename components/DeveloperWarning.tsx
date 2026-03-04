"use client";

import { AlertTriangle, Lock, ShieldAlert, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function DeveloperWarning() {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-orange-900/10 blur-[100px] rounded-full" />
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-red-950/30 blur-[120px] rounded-full" />
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="bg-neutral-900/60 backdrop-blur-xl border border-red-900/30 shadow-2xl rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="w-24 h-24 bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-900/50 relative"
                    >
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-red-500/20 rounded-full blur-xl pointer-events-none"
                        />
                        <Lock className="w-10 h-10 text-red-500 relative z-10" />
                        <AlertTriangle className="w-5 h-5 text-orange-400 absolute bottom-0 right-0 z-20 bg-neutral-900 rounded-full" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight"
                    >
                        Access Suspended
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 text-neutral-400 text-sm sm:text-base mb-8"
                    >
                        <p>
                            This project is currently locked due to <strong className="text-red-400 font-semibold">Pending Developer Payment</strong>.
                        </p>
                        <p>
                            The application has been fully completed and deployed. To restore full access to the system, please clear the pending dues as soon as possible.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-neutral-950/50 rounded-2xl p-6 border border-neutral-800/50"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4 text-neutral-300 font-medium">
                            <ShieldAlert className="w-4 h-4 text-orange-500" />
                            <span>Contact Developer</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:contact@developer.com" className="flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 transition-colors py-3 px-4 rounded-xl text-white text-sm font-medium group">
                                <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                                Contact via Email
                            </a>
                            <a href="tel:+1234567890" className="flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 transition-colors py-3 px-4 rounded-xl text-white text-sm font-medium group">
                                <Phone className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                                Call Developer
                            </a>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}
