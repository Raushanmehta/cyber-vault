'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    ShieldCheck,
    Settings,
    ArrowUpRight,
} from 'lucide-react';
import ProcessCard from '@/components/cards/ProcessCard';
import { siteMap, type CyberVaultProcessData } from '@/data';

const processIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Search,
    ShieldCheck,
    Settings,
    ArrowUpRight,
};

interface ProcessSectionProps {
    data?: CyberVaultProcessData;
    onContactClick?: () => void;
}

export default function ProcessSection({ data: propData, onContactClick }: ProcessSectionProps = {}) {
    const data = propData || siteMap.process;
    const ActionIcon = processIconMap[data.contactButton.icon] || ArrowUpRight;

    const handleContactAction = () => {
        if (onContactClick) {
            onContactClick();
        } else if (typeof window !== 'undefined') {
            window.location.href = data.contactButton.href;
        }
    };

    return (
        <section className="relative py-8 lg:py-14 bg-[#020817] text-white overflow-hidden font-sans border-b border-blue-900/30">

            {/* Ambient Radial Lighting Effects */}
            <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

            {/* Background Cyber Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">

                    {/* Header Left Column */}
                    <div className="lg:col-span-7 space-y-4">

                        {/* Tag Badge Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-800/60 rounded-full px-4 py-1.5 shadow-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-sm tracking-wide text-blue-200">
                                {data.tagBadge}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.2]"
                        >
                            {data.title.prefix}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300 font-extrabold drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                                {data.title.highlight}
                            </span>
                        </motion.h2>

                    </div>

                    {/* Header Right Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-4 pt-2 lg:pt-14"
                    >
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md lg:text-left">
                            {data.description}
                        </p>

                        <motion.button
                            onClick={handleContactAction}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(37, 99, 235, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-3 px-6 rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 text-sm cursor-pointer"
                        >
                            <span>{data.contactButton.label}</span>
                            <ActionIcon className="w-4 h-4 stroke-[2.5]" />
                        </motion.button>
                    </motion.div>

                </div>

                {/* Process Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3  lg:gap-0 relative">

                    {data.steps.map((step, index) => {
                        const IconComponent = processIconMap[step.icon] || Search;

                        return (
                            <div key={step.stepNumber} className="relative flex flex-col justify-between">

                                {/* Vertical Separator Lines with Glowing Node (Desktop) */}
                                {index !== data.steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-4 bottom-4 right-0 w-[1px] bg-gradient-to-b from-blue-900/10 via-blue-700/50 to-blue-900/10 z-10">
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-[4px] w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                                    </div>
                                )}

                                <ProcessCard
                                    step={{
                                        ...step,
                                        icon: IconComponent
                                    }}
                                    index={index}
                                    totalSteps={data.steps.length}
                                />

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}