'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Star,
    Zap,
} from 'lucide-react';
import { FaShieldAlt, FaUserFriends } from 'react-icons/fa';
import { siteMap, type CyberVaultHeroData } from '@/data';

const heroIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap,
    ArrowRight,
    FaShieldAlt,
    FaUserFriends,
};

interface HeroSectionProps {
    data?: CyberVaultHeroData;
    onEnquireClick?: () => void;
}

export default function HeroSection({ data: propData, onEnquireClick }: HeroSectionProps = {}) {
    const data = propData || siteMap.hero;
    const BadgeIcon = heroIconMap[data.badge.icon] || Zap;
    const CtaIcon = heroIconMap[data.ctaButton.icon] || ArrowRight;

    const handleCtaClick = () => {
        if (onEnquireClick) {
            onEnquireClick();
        } else if (typeof window !== 'undefined') {
            window.location.href = data.ctaButton.href;
        }
    };

    return (
        <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-[#020817] text-white overflow-hidden flex items-center py-8 lg:py-14 font-sans">

            {/* Background Hero Banner Image */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                    src={data.backgroundImage.src}
                    alt={data.backgroundImage.alt}
                    fill
                    priority
                    quality={95}
                    sizes="100vw"
                    className="object-cover object-right md:object-center select-none"
                />

                {/* Dark cyber gradient overlays for high contrast text readability and smooth edge blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/85 to-transparent sm:w-3/4 lg:w-3/5" />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />

            {/* Ambient Radial Glows */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none" />

            {/* Cyber Grid Lines Overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none"
            />

            {/* Floating Ambient Circuit Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]"
                        style={{
                            top: `${20 + i * 12}%`,
                            left: `${15 + (i * 15) % 70}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.9, 0.3],
                            scale: [1, 1.4, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main Container */}
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

                    {/* Left Column: Text & CTA */}
                    <div className="lg:col-span-6 space-y-6 text-left">

                        {/* Top Subtitle Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center space-x-3"
                        >
                            <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-400/90 flex items-center gap-1.5">
                                <BadgeIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                                {data.badge.text}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]"
                        >
                            <span className="text-white block">{data.title.prefix}</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                                {data.title.highlight}
                            </span>
                        </motion.h1>

                        {/* Description Paragraph */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-gray-300 text-lg leading-relaxed max-w-xl"
                        >
                            {data.description}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="pt-2"
                        >
                            <motion.button
                                onClick={handleCtaClick}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(14, 165, 233, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center justify-between space-x-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white py-3.5 px-7 rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 cursor-pointer"
                            >
                                <span className="text-base tracking-wide pl-1">{data.ctaButton.label}</span>
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 group-hover:translate-x-1 transition-transform duration-300 shadow-md">
                                    <CtaIcon className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                                </div>
                            </motion.button>
                        </motion.div>

                        {/* Bottom Trust Bar (Google Rating & Reviews) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300"
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-white">{data.trustBar.ratingLabel}</span>
                                <span className="text-white text-base">{data.trustBar.score}</span>
                                <div className="flex items-center text-amber-400">
                                    {[...Array(data.trustBar.starsCount)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                            </div>

                            <div className="hidden sm:block h-4 w-[1px] bg-slate-700" />

                            <div className="text-gray-400">
                                {data.trustBar.reviewPrefix} <span className="text-white">{data.trustBar.reviewsCount}</span>
                            </div>
                        </motion.div>

                    </div>

                    {/* Right Column: Interactive Live Security Scanner & Telemetry HUD */}
                    <div className="lg:col-span-6 relative flex flex-col items-center justify-center pt-8 lg:pt-0 min-h-[440px] lg:min-h-[520px]">

                        {/* Ambient Hologram Glow around central area */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/15 rounded-full blur-[100px]" />
                        </div>

                        {/* Interactive Rotating Cyber Radar Reticle */}
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center pointer-events-none">
                            {/* Outer Radar Coordinate Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 sm:inset-6 rounded-full border border-cyan-500/20 border-dashed"
                            />

                            {/* Rotating Radar Sweep Line */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 sm:inset-6 rounded-full overflow-hidden"
                            >
                                <div className="w-1/2 h-1/2 ml-auto origin-bottom-left bg-gradient-to-br from-cyan-400/25 via-blue-500/10 to-transparent" />
                            </motion.div>

                            {/* Mid Pulse Ring */}
                            <motion.div
                                animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-16 sm:inset-20 rounded-full border border-blue-500/30"
                            />

                            {/* Target Crosshairs */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                                <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
                            </div>
                        </div>

                        {/* Floating Live Status Cards */}
                        {data.floatingStats.map((stat, idx) => {
                            const StatIcon = heroIconMap[stat.icon] || FaShieldAlt;
                            const isTop = idx === 0;

                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`absolute ${isTop ? 'top-2 sm:top-6' : 'bottom-2 sm:bottom-6'} right-0 z-20 backdrop-blur-xl border border-cyan-500/40 p-3 sm:p-3.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-3 cursor-pointer`}
                                >
                                    <div className="flex items-center justify-center text-cyan-400 shrink-0">
                                        <StatIcon className="w-4 h-4 lg:w-12 lg:h-12 text-cyan-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm lg:text-4xl text-white font-bold">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm lg:text-sm text-cyan-300">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                    </div>

                </div>
            </div>
        </section>
    );
}