"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    image: string;
    category?: string;
    client?: string;
    date?: string;
    results?: string[];
    fullCaseStudy?: string;
}

interface PortfolioCardProps {
    item: PortfolioItem;
    index?: number;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 ransition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
        >
            {/* Image Showcase */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content: Title & Description */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl  text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 leading-snug">
                        {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default PortfolioCard;
