'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, ShieldCheck, Database, Headphones, Activity } from 'lucide-react';
import { siteMap, type CyberVaultOurImpactData } from '@/data';

const impactIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Users,
    ShieldCheck,
    Database,
    Headphones,
    Activity,
};

function AnimatedCounter({ value, suffix = '', prefix = '', isCustom, customText }: { value: number; suffix?: string; prefix?: string; isCustom?: boolean; customText?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && !isCustom) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const incrementTime = 30;
            const totalSteps = duration / incrementTime;
            const stepValue = end / totalSteps;

            const timer = setInterval(() => {
                start += stepValue;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value, isCustom]);

    if (isCustom && customText) {
        return <span ref={ref}>{customText}</span>;
    }

    return (
        <span ref={ref}>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

interface OurImpactSectionProps {
    data?: CyberVaultOurImpactData;
}

export default function OurImpactSection({ data: propData }: OurImpactSectionProps = {}) {
    const data = propData || siteMap.ourImpact;
    const TaglineIcon = impactIconMap[data.tagline.icon] || Activity;

    return (
        <section className="relative py-8 lg:py-14 bg-[#020817] text-white overflow-hidden font-sans border-y border-blue-900/30">

            {/* Background SOC Center Image with Ambient Darkness Overlays */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
                style={{
                    backgroundImage: `url('${data.backgroundImage}')`
                }}
            />

            {/* Cyber Grid Node Graphics - Left Bottom Corner */}
            <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none opacity-40">
                <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400">
                    <path d="M 10 190 Q 50 120 120 150 T 190 100" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M 0 170 Q 70 140 140 180" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="150" r="3" fill="#38bdf8" />
                    <circle cx="120" cy="150" r="4" fill="#38bdf8" className="animate-ping" />
                    <circle cx="120" cy="150" r="2" fill="#ffffff" />
                    <circle cx="190" cy="100" r="3" fill="#38bdf8" />
                </svg>
            </div>

            {/* Cyber Grid Node Graphics - Right Bottom Corner */}
            <div className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none opacity-40 transform scale-x-[-1]">
                <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400">
                    <path d="M 10 190 Q 50 120 120 150 T 190 100" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M 0 170 Q 70 140 140 180" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="150" r="3" fill="#38bdf8" />
                    <circle cx="120" cy="150" r="4" fill="#38bdf8" />
                    <circle cx="190" cy="100" r="3" fill="#38bdf8" />
                </svg>
            </div>

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">

                <div className="text-center max-w-3xl mx-auto space-y-2">

                    {/* Tagline Flanking Cyan Lines */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center space-x-3"
                    >
                        <div className="w-12 sm:w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-blue-500 rounded-full" />
                        <span className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] text-cyan-400 flex items-center gap-1.5">
                            <TaglineIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                            {data.tagline.text}
                        </span>
                        <div className="w-12 sm:w-12 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent rounded-full" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.2]"
                    >
                        {data.title.prefix}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                            {data.title.highlight}
                        </span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed"
                    >
                        {data.description}
                    </motion.p>

                </div>

                {/* Animated Stats Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {data.stats.map((stat, index) => {
                        const IconComponent = impactIconMap[stat.icon] || Users;
                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -6, boxShadow: "0 20px 35px -5px rgba(14, 165, 233, 0.2)" }}
                                data-cursor-card
                                className="group relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 hover:border-cyan-500/60 p-6 rounded-2xl transition-all duration-300 flex flex-col items-center text-center shadow-lg cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900/80 to-blue-950 border border-blue-700/60 flex items-center justify-center text-cyan-400 mb-4 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <IconComponent className="w-8 h-8" />
                                </div>

                                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2">
                                    <AnimatedCounter
                                        value={stat.numberValue}
                                        suffix={stat.suffix || ''}
                                        isCustom={stat.isCustomDisplay}
                                        customText={stat.customText}
                                    />
                                </div>

                                <div className="text-sm sm:text-base font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}