"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    User,
    Clock,
    Quote,
    ChevronRight,
    ArrowRight,
    Check,
} from "lucide-react";
import { siteMap, type CyberVaultBlogData } from "@/data";
import CTACard from "@/components/cards/CtaCard";
import {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    staggerContainer,
    staggerItem,
    cardHover,
    scaleIn,
    zoomIn,
    ambientGlowPulse,
    transitions,
} from "@/utils/animations";

function sanitizeImageUrl(src?: string): string {
    if (!src) return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200";
    const trimmed = src.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
        return trimmed;
    }
    return `/${trimmed}`;
}

interface BlogDetailSectionProps {
    data?: CyberVaultBlogData;
    initialSlug?: string;
}

export default function BlogDetailSection({
    data: propData,
    initialSlug,
}: BlogDetailSectionProps = {}) {
    const blogData = propData || siteMap.blog;
    const blogPosts = blogData.blogPosts || [];
    const categories = blogData.categories || [
        { name: "Cyber Security", count: 12 },
        { name: "Data Protection", count: 8 },
        { name: "Cloud Security", count: 10 },
        { name: "Network Security", count: 7 },
        { name: "Compliance", count: 5 },
        { name: "Incident Response", count: 9 },
    ];

    const [activeSlug, setActiveSlug] = useState<string>(() => {
        if (initialSlug && blogPosts.some((p) => p.slug === initialSlug || String(p.id) === initialSlug)) {
            return initialSlug;
        }
        return blogPosts[0]?.slug || String(blogPosts[0]?.id) || "1";
    });

    useEffect(() => {
        if (initialSlug && blogPosts.some((p) => p.slug === initialSlug || String(p.id) === initialSlug)) {
            setActiveSlug(initialSlug);
        }
    }, [initialSlug, blogPosts]);

    const currentPost =
        blogPosts.find((p) => p.slug === activeSlug || String(p.id) === activeSlug) ||
        blogPosts[0];

    const [activeCategory, setActiveCategory] = useState<string>(
        currentPost?.category || "Cyber Security"
    );

    useEffect(() => {
        if (currentPost?.category) {
            setActiveCategory(currentPost.category);
        }
    }, [currentPost]);

    if (!currentPost) {
        return null;
    }

    const handlePostSelect = (slugOrId: string | number) => {
        const targetSlug = String(slugOrId);
        setActiveSlug(targetSlug);
        if (typeof window !== "undefined") {
            window.history.pushState(null, "", `/blog/${targetSlug}`);
        }
    };

    const handleCategoryClick = (categoryName: string) => {
        setActiveCategory(categoryName);
        const matchingPost = blogPosts.find((p) => p.category === categoryName);
        if (matchingPost) {
            handlePostSelect(matchingPost.slug || matchingPost.id);
        }
    };

    // Filter recent posts (excluding current post if multiple available)
    const recentPosts = blogPosts.filter((p) => p.id !== currentPost.id).slice(0, 4);
    const displayRecentPosts = recentPosts.length > 0 ? recentPosts : blogPosts.slice(0, 4);

    return (
        <section className="relative w-full bg-white py-8 lg:py-14 font-sans overflow-hidden">
            {/* Ambient Background Glows */}
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

                    {/* ================= MAIN ARTICLE COLUMN (8 Cols) ================= */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.article
                                key={currentPost.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={transitions.fast}
                                className="space-y-6"
                            >
                                {/* Tag / Category Badge */}
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-blue-100 shadow-xs"
                                >
                                    {currentPost.category || "Cyber Security"}
                                </motion.div>

                                {/* Article Main Title */}
                                <motion.h1
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-3xl sm:text-4xl lg:text-5xl text-[#091122] tracking-tight font-extrabold leading-[1.2]"
                                >
                                    {currentPost.title}
                                </motion.h1>

                                {/* Metadata Row */}
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="flex flex-wrap items-center gap-6 text-sm lg:text-base text-slate-500 pb-2 border-b border-slate-100"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <span>{currentPost.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-blue-600" />
                                        <span>{currentPost.author || "Security Team"}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span>{currentPost.readTime || "5 min read"}</span>
                                    </div>
                                </motion.div>

                                {/* Main Featured Image */}
                                <motion.div
                                    variants={scaleIn}
                                    initial="hidden"
                                    animate="visible"
                                    className="relative w-full h-[320px] sm:h-[440px] rounded-2xl overflow-hidden shadow-md group"
                                >
                                    <Image
                                        src={sanitizeImageUrl(currentPost.image)}
                                        alt={currentPost.title}
                                        fill
                                        unoptimized
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 850px"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                                </motion.div>

                                {/* Intro Paragraph */}
                                <motion.p
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal"
                                >
                                    {currentPost.content?.intro || currentPost.excerpt}
                                </motion.p>

                                {/* Article Body Sections */}
                                {currentPost.content?.sections && currentPost.content.sections.length > 0 ? (
                                    <div className="space-y-6">
                                        {currentPost.content.sections.map((section, idx) => (
                                            <motion.div
                                                key={idx}
                                                variants={fadeInUp}
                                                initial="hidden"
                                                animate="visible"
                                                className="space-y-3"
                                            >
                                                <h2 className="text-xl sm:text-2xl font-bold text-[#091122]">
                                                    {section.title}
                                                </h2>
                                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                                    {section.paragraph}
                                                </p>

                                                {/* Optional Checklist and Inset Secondary Image */}
                                                {(section.checklist || section.secondaryImage) && (
                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-3">
                                                        {section.checklist && (
                                                            <ul className={`space-y-2.5 text-sm sm:text-base text-slate-700 font-medium ${section.secondaryImage ? "md:col-span-7" : "md:col-span-12"}`}>
                                                                {section.checklist.map((item, cIdx) => (
                                                                    <li key={cIdx} className="flex items-start space-x-3">
                                                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                                                            <Check className="w-3.5 h-3.5 text-blue-600" />
                                                                        </div>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}

                                                        {section.secondaryImage && (
                                                            <div className="md:col-span-5 relative h-[190px] sm:h-[220px] rounded-xl overflow-hidden shadow-sm group">
                                                                <Image
                                                                    src={sanitizeImageUrl(section.secondaryImage)}
                                                                    alt={section.title}
                                                                    fill
                                                                    unoptimized
                                                                    sizes="(max-width: 768px) 100vw, 350px"
                                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                            {currentPost.excerpt}
                                        </p>
                                    </div>
                                )}

                                {/* Featured Pull Quote Block */}
                                {currentPost.content?.quote && (
                                    <motion.div
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        className="bg-gradient-to-r from-[#edf4ff] to-[#f5f9ff] border-l-4 border-blue-600 rounded-r-2xl p-6 sm:p-8 my-6 flex items-start space-x-4 shadow-xs"
                                    >
                                        <Quote className="w-10 h-10 text-blue-600 shrink-0 rotate-180 fill-blue-600/20" />
                                        <blockquote className="text-base sm:text-lg text-slate-800 italic font-medium leading-relaxed">
                                            &ldquo;{currentPost.content.quote}&rdquo;
                                        </blockquote>
                                    </motion.div>
                                )}

                                {/* Conclusion */}
                                {currentPost.content?.conclusion && (
                                    <motion.div
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        className="pt-2 border-t border-slate-100"
                                    >
                                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                                            {currentPost.content.conclusion}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.article>
                        </AnimatePresence>
                    </div>

                    {/* ================= RIGHT SIDEBAR (4 Cols) ================= */}
                    <aside className="lg:col-span-4 space-y-6">

                        {/* Widget 1: Recent Posts */}
                        <motion.div
                            variants={fadeInRight}
                            initial="hidden"
                            animate="visible"
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5"
                        >
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#091122]">Recent Posts</h3>
                                <span className="block w-12 h-[2.5px] bg-blue-600 mt-1.5 rounded-full" />
                            </div>

                            <div className="space-y-4">
                                {displayRecentPosts.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        whileHover={{ x: 3 }}
                                        onClick={() => handlePostSelect(post.slug || post.id)}
                                        className="flex items-center space-x-3.5 group cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 relative shadow-xs">
                                            <Image
                                                src={sanitizeImageUrl(post.image)}
                                                alt={post.title}
                                                fill
                                                unoptimized
                                                sizes="100px"
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                {post.title}
                                            </h4>
                                            <p className="text-xs text-slate-400 mt-1.5 flex items-center space-x-1.5">
                                                <Calendar className="w-3 h-3 text-blue-500" />
                                                <span>{post.date}</span>
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Widget 2: CTA Card */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 }}
                        >
                            <CTACard />
                        </motion.div>

                        {/* Widget 3: Categories List */}
                        <motion.div
                            variants={fadeInRight}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4"
                        >
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#091122]">Categories</h3>
                                <span className="block w-12 h-[2.5px] bg-blue-600 mt-1.5 rounded-full" />
                            </div>

                            <div className="space-y-1.5">
                                {categories.map((cat, idx) => {
                                    const isActive = activeCategory === cat.name;
                                    return (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCategoryClick(cat.name)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm lg:text-base transition-all duration-200 cursor-pointer ${isActive
                                                ? "bg-gradient-to-r from-[#edf4ff] to-[#f4f8ff] text-blue-600 font-bold border-l-4 border-blue-600 shadow-xs"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                                }`}
                                        >
                                            <span>{cat.name}</span>
                                            <div className="flex items-center space-x-2">
                                                {cat.count && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                                        {cat.count}
                                                    </span>
                                                )}
                                                <ChevronRight className="w-4 h-4 text-slate-400" />
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>

                    </aside>

                </div>
            </div>
        </section>
    );
}