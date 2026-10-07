"use client";

import React from "react";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { siteMap, type CyberVaultPortfolioData } from "@/data";

interface PortfolioSectionProps {
    data?: CyberVaultPortfolioData;
}

export default function PortfolioSection({ data: propData }: PortfolioSectionProps = {}) {
    const data = propData || siteMap.portfolio;

    return (
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
                <p className="text-center text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
                    {data.description}
                </p>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 mt-6">
                {data.projects.map((item) => (
                    <PortfolioCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </section>
    );
}