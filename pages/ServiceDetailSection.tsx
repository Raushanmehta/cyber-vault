"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Monitor,
    Settings,
    ArrowRight,
    ArrowUpRight,
    Database,
    Clock,
    Users,
    CheckCircle2,
    Bug,
    Laptop,
    Flame,
    Cloud,
    Lock,
    Search,
} from "lucide-react";
import { siteMap, type CyberVaultServicesData } from "@/data";
import CTACard from "@/components/cards/CtaCard";
import {
    fadeInUp,
    fadeInLeft,
    staggerContainer,
    staggerItem,
    cardHover,
    scaleIn,
    zoomIn,
    ambientGlowPulse,
    transitions,
} from "@/utils/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Shield,
    Monitor,
    Settings,
    Database,
    Clock,
    Users,
    CheckCircle2,
    Bug,
    Laptop,
    Flame,
    Cloud,
    Lock,
    Search,
};

interface ServiceDetailSectionProps {
    data?: CyberVaultServicesData;
    initialServiceId?: string;
}

export default function ServiceDetailSection({
    data: propData,
    initialServiceId,
}: ServiceDetailSectionProps = {}) {
    const servicesData = propData || siteMap.services;
    const servicesList = servicesData.servicesList || [];

    const [activeServiceId, setActiveServiceId] = useState<string>(() => {
        if (initialServiceId && servicesList.some((s) => s.id === initialServiceId)) {
            return initialServiceId;
        }
        return servicesList[0]?.id || "threat-detection";
    });

    useEffect(() => {
        if (initialServiceId && servicesList.some((s) => s.id === initialServiceId)) {
            setActiveServiceId(initialServiceId);
        }
    }, [initialServiceId, servicesList]);

    const activeService =
        servicesList.find((s) => s.id === activeServiceId) || servicesList[0];

    if (!activeService) {
        return null;
    }

    const handleServiceSelect = (serviceId: string) => {
        setActiveServiceId(serviceId);
        if (typeof window !== "undefined") {
            window.history.pushState(null, "", `/services/${serviceId}`);
        }
    };

    // Splitting service title to highlight last word or suffix
    const titleWords = activeService.title.split(" ");
    const prefixTitle = titleWords.slice(0, -1).join(" ");
    const highlightWord = titleWords[titleWords.length - 1];

    const sidebarCta = servicesData.sidebarCta || {
        badge: "Get In Touch",
        title: "Talk to Our",
        highlight: "Security Experts",
        description: "Have questions or need a customized solution? Our team is here to help you.",
        buttonText: "Let's Talk",
        buttonHref: "/get-a-quote",
        bgImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    };

    // Fallback pillars if not explicitly configured
    const pillars = activeService.pillars || [
        {
            icon: "Shield",
            title: "Proactive Defense",
            description: activeService.description,
        },
        {
            icon: "Monitor",
            title: "Continuous Visibility",
            description: activeService.detailedFeatures?.[0] || "Round-the-clock monitoring and telemetry analysis.",
        },
        {
            icon: "Settings",
            title: "Automated Response",
            description: activeService.detailedFeatures?.[1] || "Automated containment and real-time risk mitigation.",
        },
    ];

    // Fallback overview if not configured
    const overview = activeService.overview || {
        titlePrefix: "Comprehensive Protection for Modern",
        titleHighlight: "Work Environments",
        paragraphs: [
            activeService.description,
            activeService.benefits || "Protecting enterprise assets with advanced defense frameworks.",
        ],
        image: {
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
            alt: activeService.title,
        },
    };

    // Fallback key benefits if not configured
    const keyBenefits = activeService.keyBenefits || {
        titlePrefix: "Key",
        titleHighlight: "Benefits",
        description: activeService.benefits,
        items: (activeService.detailedFeatures || []).slice(0, 4).map((feat, idx) => ({
            icon: idx % 2 === 0 ? "Shield" : "Database",
            title: feat,
            description: "Engineered to deliver enterprise-grade cyber resilience and compliance.",
        })),
    };

    const bannerImage = activeService.bannerImage || {
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200",
        alt: activeService.title,
    };

    return (
        <section className="relative w-full bg-white py-8 lg:py-14 font-sans overflow-hidden">
            {/* Ambient Background Blur Glows from utils/animations */}
            <motion.div
                animate={ambientGlowPulse.animate}
                transition={ambientGlowPulse.transition}
                className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none -z-10"
            />
            <motion.div
                animate={ambientGlowPulse.animate}
                transition={{ ...ambientGlowPulse.transition, delay: 3 }}
                className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-cyan-100/40 rounded-full blur-[130px] pointer-events-none -z-10"
            />

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ================= LEFT SIDEBAR (4 Cols) ================= */}
                    <div className="lg:col-span-4 space-y-4 lg:space-y-6">
                        {/* Our Services Navigation Card */}
                        <motion.div
                            variants={fadeInLeft}
                            initial="hidden"
                            animate="visible"
                            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 sm:p-5 text-white text-xl sm:text-2xl font-bold tracking-tight">
                                {servicesData.tagline || "Our Services"}
                            </div>

                            <motion.div
                                variants={staggerContainer(0.06, 0.05)}
                                initial="hidden"
                                animate="visible"
                                className="space-y-1.5 p-3"
                            >
                                {servicesList.map((service) => {
                                    const isActive = activeService.id === service.id;
                                    return (
                                        <motion.button
                                            key={service.id}
                                            variants={staggerItem}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleServiceSelect(service.id)}
                                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm lg:text-base transition-all duration-200 cursor-pointer text-left ${isActive
                                                ? "bg-gradient-to-r from-[#edf4ff] to-[#f4f8ff] text-blue-600 font-bold shadow-xs border-l-4 border-blue-600"
                                                : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                                }`}
                                        >
                                            <span className="truncate pr-2">{service.title}</span>
                                            {isActive ? (
                                                <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                                            ) : (
                                                <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        </motion.div>

                        {/* Talk to Our Experts CTA Card */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...transitions.normal, delay: 0.15 }}
                        >
                            <CTACard data={sidebarCta} />
                        </motion.div>
                    </div>

                    {/* ================= RIGHT MAIN CONTENT AREA (8 Cols) ================= */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeService.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={transitions.fast}
                                className="space-y-6"
                            >
                                {/* Top Banner Image */}
                                <motion.div
                                    variants={scaleIn}
                                    initial="hidden"
                                    animate="visible"
                                    className="relative w-full h-[280px] sm:h-[360px] lg:h-[380px] rounded-2xl overflow-hidden shadow-md group"
                                >
                                    <Image
                                        src={bannerImage.src}
                                        alt={bannerImage.alt || activeService.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 850px"
                                        priority
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                                </motion.div>

                                {/* Breadcrumb Navigation */}
                                <motion.nav
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="flex items-center space-x-2 text-sm lg:text-base text-slate-500"
                                >
                                    <Link href="/" className="hover:text-blue-600 transition-colors">
                                        Home
                                    </Link>
                                    <span>/</span>
                                    <Link href="/services" className="hover:text-blue-600 transition-colors">
                                        Our Services
                                    </Link>
                                    <span>/</span>
                                    <span className="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">
                                        {activeService.title}
                                    </span>
                                </motion.nav>

                                {/* Main Heading & Intro Copy */}
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#091122] tracking-tight font-extrabold">
                                        {prefixTitle}{" "}
                                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                            {highlightWord}
                                        </span>
                                    </h1>
                                    <p className="mt-3 text-slate-600 text-sm lg:text-base leading-relaxed max-w-3xl">
                                        {activeService.description}
                                    </p>
                                </motion.div>

                                {/* 3 Pillar Features Banner Card */}
                                {pillars && pillars.length > 0 && (
                                    <motion.div
                                        variants={staggerContainer(0.12, 0.05)}
                                        initial="hidden"
                                        animate="visible"
                                        className="bg-[#f0f5ff]/80 rounded-2xl p-6 border border-blue-100/80 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs"
                                    >
                                        {pillars.map((pillar, index) => {
                                            const PillarIcon = iconMap[pillar.icon] || Shield;
                                            const isNotLast = index < pillars.length - 1;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    variants={fadeInUp}
                                                    whileHover={cardHover.whileHover}
                                                    className={`space-y-2 ${isNotLast ? "border-b md:border-b-0 md:border-r border-blue-100/80 pb-4 md:pb-0 md:pr-4" : ""}`}
                                                >
                                                    <div className="w-14 h-14 rounded-2xl bg-blue-100/80 flex items-center justify-center text-blue-600 shadow-xs">
                                                        <PillarIcon className="w-7 h-7" />
                                                    </div>
                                                    <h4 className="text-base font-bold text-slate-900">
                                                        {pillar.title}
                                                    </h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed">
                                                        {pillar.description}
                                                    </p>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                )}

                                {/* Comprehensive Protection Split Section */}
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                                >
                                    {/* Secondary Inset Image */}
                                    <motion.div
                                        variants={zoomIn}
                                        whileHover={{ scale: 1.02 }}
                                        transition={transitions.fast}
                                        className="md:col-span-5 relative h-[220px] lg:h-[300px] rounded-2xl overflow-hidden shadow-md group"
                                    >
                                        <Image
                                            src={overview.image.src}
                                            alt={overview.image.alt || activeService.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 350px"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </motion.div>

                                    {/* Detailed Description Paragraphs */}
                                    <div className="md:col-span-7 space-y-3">
                                        <h3 className="text-xl lg:text-2xl text-[#091122] font-bold">
                                            {overview.titlePrefix}{" "}
                                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                                {overview.titleHighlight}
                                            </span>
                                        </h3>
                                        {overview.paragraphs.map((p, idx) => (
                                            <p key={idx} className="text-sm lg:text-base text-slate-600 leading-relaxed">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Key Benefits Grid Section */}
                                {keyBenefits && keyBenefits.items && keyBenefits.items.length > 0 && (
                                    <motion.div
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-4"
                                    >
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-[#091122]">
                                                {keyBenefits.titlePrefix}{" "}
                                                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                                    {keyBenefits.titleHighlight}
                                                </span>
                                            </h3>
                                            {keyBenefits.description && (
                                                <p className="text-sm lg:text-base text-slate-600 mt-1">
                                                    {keyBenefits.description}
                                                </p>
                                            )}
                                        </div>

                                        <motion.div
                                            variants={staggerContainer(0.1, 0.05)}
                                            initial="hidden"
                                            animate="visible"
                                            className="bg-[#f0f5ff]/80 rounded-2xl p-6 border border-blue-100/80 grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-xs"
                                        >
                                            {keyBenefits.items.map((benefit, idx) => {
                                                const BenefitIcon = iconMap[benefit.icon] || Shield;
                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        variants={staggerItem}
                                                        whileHover={cardHover.whileHover}
                                                        className="flex items-start space-x-3.5 group p-2 rounded-xl transition-colors hover:bg-white/60"
                                                    >
                                                        <div className="w-14 h-14 rounded-2xl bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
                                                            <BenefitIcon className="w-7 h-7" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                                {benefit.title}
                                                            </h4>
                                                            <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                                                                {benefit.description}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}