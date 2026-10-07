"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import BlogCard, { type BlogPost } from "@/components/cards/BlogCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel";
import { siteMap, type CyberVaultBlogData } from "@/data";

interface BlogSectionProps {
    data?: CyberVaultBlogData;
}

export default function BlogSection({ data: propData }: BlogSectionProps = {}) {
    const data = propData || siteMap.blog;
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="relative w-full bg-white py-8 lg:py-14 font-sans overflow-hidden">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4">
                {/* Section Tagline */}
                <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-blue-600 rounded-full"></span>
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-[#0b1b3d] uppercase">
                        {data.tagline}
                    </span>
                    <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-blue-600 rounded-full"></span>
                </div>

                {/* Section Heading */}
                <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl text-[#0a1128] tracking-tight mb-2">
                    {data.title.prefix}{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                        {data.title.highlight}
                    </span>
                </h2>

                {/* Subtitle */}
                <p className="text-center text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-2">
                    {data.description}
                </p>

                {/* Carousel */}
                <div className="relative">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-[1350px] mx-auto"
                    >
                        <CarouselContent className="-ml-6 py-4">
                            {data.blogPosts.map((post, index) => (
                                <CarouselItem
                                    key={post.id}
                                    className="pl-5 basis-full md:basis-1/2 lg:basis-1/3"
                                >
                                    <BlogCard
                                        post={post}
                                        index={index}
                                        setSelectedPost={setSelectedPost}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Buttons */}
                        <div className="hidden sm:block">
                            <CarouselPrevious className="-left-4 lg:-left-6 w-11 h-11 bg-white text-blue-600 shadow-lg border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300" />
                            <CarouselNext className="-right-4 lg:-right-6 w-11 h-11 bg-white text-blue-600 shadow-lg border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300" />
                        </div>
                    </Carousel>
                </div>

                {/* Carousel Pagination Dots */}
                {count > 1 && (
                    <div className="flex items-center justify-center space-x-2.5 mt-2 lg:mt-4">
                        {Array.from({ length: count }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => api?.scrollTo(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${current === idx
                                    ? "w-7 bg-blue-600"
                                    : "w-2.5 bg-blue-200 hover:bg-blue-300"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Article Detail Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPost(null)}
                        className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="h-64 relative">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                <div className="absolute bottom-4 left-6 text-white">
                                    <span className="text-xs font-semibold px-3 py-1 bg-blue-600 rounded-full">
                                        {selectedPost.readTime}
                                    </span>
                                    <p className="text-xs mt-2 text-slate-300">
                                        By {selectedPost.author} &bull; {selectedPost.date}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                    {selectedPost.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                    {selectedPost.excerpt}
                                </p>
                                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                    <Link
                                        href={`/blog/${selectedPost.slug || selectedPost.id}`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                                    >
                                        <span>Read Full Article</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => setSelectedPost(null)}
                                        className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-full font-medium text-sm hover:bg-slate-200 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}