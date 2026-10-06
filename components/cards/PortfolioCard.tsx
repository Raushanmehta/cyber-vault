"use client";

import { motion } from "framer-motion";

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
    onSelect?: (item: PortfolioItem) => void;
}

export function PortfolioCard({ item, index = 0, onSelect }: PortfolioCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => onSelect?.(item)}
            data-cursor-text="View"
            className="group bg-white rounded-3xl border border-slate-200/80 hover:border-blue-400 shadow-md hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
        >
            {/* Top Image Showcase */}
            <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-900">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 leading-snug">
                        {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default PortfolioCard;
