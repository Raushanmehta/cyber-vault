"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/cards/BlogCard";
import PageTopSection from "@/components/common/PageTopSection";
import { siteMap } from "@/data";

export default function BlogPage() {
    const data = siteMap.blog;
    const router = useRouter();

    return (
        <main>
            <PageTopSection title="Blog" breadcrumbCurrent="Blog" breadcrumbHome="Blog" />

            <section className="relative w-full bg-white py-8 lg:py-14 font-sans overflow-hidden">
                <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4">
                    {/* Top Section Tagline */}
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
                    <p className="text-center text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-4">
                        {data.description}
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 mt-8">
                    {data.blogPosts.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            index={index}
                            setSelectedPost={(p) => router.push(`/blog/${p.slug || p.id}`)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}