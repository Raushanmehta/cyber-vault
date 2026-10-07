"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Sparkles } from "lucide-react";
import { LuShieldHalf } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { GiNetworkBars } from "react-icons/gi";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import { siteMap, type CyberVaultWhyChooseUsData } from "@/data";

const whyChooseIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    LuShieldHalf,
    IoSettingsOutline,
    HiUserGroup,
    GiNetworkBars,
    Sparkles,
    CheckCircle2,
    Award,
};

interface WhyChooseUsSectionProps {
    data?: CyberVaultWhyChooseUsData;
}

export default function WhyChooseUsSection({ data: propData }: WhyChooseUsSectionProps = {}) {
    const data = propData || siteMap.whyChooseUs;
    const BadgeIcon = whyChooseIconMap[data.tagBadge.icon] || Sparkles;
    const ExperienceIcon = whyChooseIconMap[data.experienceBadge.icon] || Award;

    return (
        <section className="relative w-full bg-white py-8 lg:py-14 font-sans overflow-hidden">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-12 items-center">

                    {/* Left Column (7 Cols): Content, Highlights, and 2x2 Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 space-y-"
                    >
                        {/* Header Tagline & Headline */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-4"
                            >
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                <span className="text-sm font-bold tracking-wide flex items-center gap-1.5">
                                    <BadgeIcon className="w-3.5 h-3.5 text-blue-600" />
                                    {data.tagBadge.text}
                                </span>
                            </motion.div>

                            <AnimatedHeading
                                as="h2"
                                className="text-3xl sm:text-4xl lg:text-5xl text-[#091122] tracking-tight leading-[1.15]"
                            >
                                {data.title.prefix}{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    {data.title.highlight}
                                </span>
                            </AnimatedHeading>

                            <p className="mt-2 text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
                                {data.description}
                            </p>
                        </div>

                        {/* Light Blue Highlight Banner Card */}
                        <motion.div
                            whileHover={{ y: -4, boxShadow: "0 20px 35px -5px rgba(37, 99, 235, 0.12)" }}
                            transition={{ duration: 0.3 }}
                            data-cursor-card
                            className="bg-[#f3f7ff]/90 border border-blue-100/70 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm cursor-pointer"
                        >
                            {/* Circular Progress & Quote */}
                            <div className="flex items-center space-x-5 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-blue-100/80 pb-5 sm:pb-0 sm:pr-5">
                                {/* Circular Animated SVG Indicator */}
                                <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-blue-100"
                                            strokeWidth="3.5"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: data.highlightBanner.percentage / 100 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="text-blue-600"
                                            strokeWidth="3.5"
                                            strokeDasharray="100, 100"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <span className="absolute text-2xl font-extrabold text-[#091122]">
                                        {data.highlightBanner.percentage}%
                                    </span>
                                </div>

                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {data.highlightBanner.quote}
                                </p>
                            </div>

                            {/* Bullet Points */}
                            <div className="space-y-1 w-full sm:w-1/2">
                                {data.highlightBanner.bulletPoints.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.1 * idx }}
                                        className="flex items-center space-x-2.5"
                                    >
                                        <CheckCircle2 className="w-7 h-7 text-blue-600 flex-shrink-0 fill-blue-600 text-white" />
                                        <span className="text-sm font-semibold text-slate-800">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 2x2 Feature Pillars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            {data.featurePillars.map((pillar, index) => {
                                const Icon = whyChooseIconMap[pillar.icon] || LuShieldHalf;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        data-cursor-card
                                        className="group flex items-start space-x-4 py-2 rounded-2xl hover:bg-slate-50/80 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 border border-blue-100 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm lg:text-lg text-[#091122] group-hover:text-blue-600 transition-colors">
                                                {pillar.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Column (5 Cols): Asymmetric Image Grid with Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative grid grid-cols-2 gap-4"
                    >
                        {/* Left Main Tall Image */}
                        <motion.div
                            transition={{ duration: 0.3 }}
                            data-cursor-card
                            className="group relative rounded-3xl overflow-hidden shadow-xl h-[460px] sm:h-[600px] cursor-pointer"
                        >
                            <img
                                src={data.images.mainTall.src}
                                alt={data.images.mainTall.alt}
                                className="w-full h-full object-cover transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Right Stacked 2 Images */}
                        <div className="space-y-4 flex flex-col justify-end h-[460px] sm:h-[600px]">
                            <motion.div
                                transition={{ duration: 0.3 }}
                                data-cursor-card
                                className="group relative rounded-2xl overflow-hidden shadow-md h-[220px] sm:h-[260px] cursor-pointer"
                            >
                                <img
                                    src={data.images.stackedTop.src}
                                    alt={data.images.stackedTop.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-transparent pointer-events-none" />
                            </motion.div>

                            <motion.div
                                transition={{ duration: 0.3 }}
                                data-cursor-card
                                className="group relative rounded-2xl overflow-hidden shadow-md h-[220px] sm:h-[260px] cursor-pointer"
                            >
                                <img
                                    src={data.images.stackedBottom.src}
                                    alt={data.images.stackedBottom.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                        </div>

                        {/* Floating Experience Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            whileHover={{ scale: 1.04, y: -4, boxShadow: "0 25px 35px -5px rgba(3, 24, 70, 0.4)" }}
                            data-cursor-text={data.experienceBadge.years}
                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 z-20 bg-gradient-to-r from-[#031846] via-blue-600 to-cyan-500 rounded-2xl p-4 shadow-2xl flex items-center space-x-4 border border-white/20 text-white min-w-[260px] cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                                <ExperienceIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <span className="text-2xl font-black tracking-tight block leading-none">
                                    {data.experienceBadge.years}
                                </span>
                                <span className="text-xs font-medium text-blue-100 opacity-90 mt-1 block">
                                    {data.experienceBadge.label}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}