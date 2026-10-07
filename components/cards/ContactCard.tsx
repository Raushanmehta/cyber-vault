import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface ContactInfoCard {
    icon: LucideIcon | React.ComponentType<{ className?: string }>;
    title: string;
    line1: string;
    line2: string;
    href?: string;
}

interface ContactCardProps {
    card: ContactInfoCard;
    idx?: number;
}

export default function ContactCard({ card, idx = 0 }: ContactCardProps) {
    const Icon = card.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="group bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/80 flex items-start space-x-4 transition-all duration-300 cursor-pointer hover:border-blue-200 hover:shadow-lg"
        >
            <div className="w-14 h-14 rounded-full bg-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Icon className="w-7 h-7" />
            </div>
            <div className="overflow-hidden">
                <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium truncate">
                    {card.line1}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium truncate">
                    {card.line2}
                </p>
            </div>
        </motion.div>
    );
}