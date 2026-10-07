import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteMap } from "@/data";

import { motion } from "framer-motion";
import { buttonHoverTap } from "@/utils/animations";

export interface SidebarCtaData {
    badge?: string;
    title?: string;
    highlight?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    bgImage?: string;
}

interface CTACardProps {
    data?: SidebarCtaData;
}

export default function CTACard({ data }: CTACardProps = {}) {
    const sidebarCta = data || siteMap.services.sidebarCta || {
        badge: "Get In Touch",
        title: "Talk to Our",
        highlight: "Security Experts",
        description: "Have questions or need a customized solution? Our team is here to help you.",
        buttonText: "Let's Talk",
        buttonHref: "/get-a-quote",
        bgImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    };

    return (
        <div className="relative bg-[#05112e] rounded-xl p-6 lg:p-8 text-white overflow-hidden shadow-lg border border-slate-800">
            {/* Dark Tech Background Accent Graphic */}
            {sidebarCta.bgImage && (
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                    style={{
                        backgroundImage: `url('${sidebarCta.bgImage}')`,
                    }}
                />
            )}

            <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-300">
                        {sidebarCta.badge}
                    </span>
                </div>

                <h3 className="text-2xl lg:text-3xl leading-tight font-bold">
                    {sidebarCta.title} <br />
                    <span className="text-blue-400">{sidebarCta.highlight}</span>
                </h3>

                <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                    {sidebarCta.description}
                </p>

                <motion.div
                    whileHover={buttonHoverTap.whileHover}
                    whileTap={buttonHoverTap.whileTap}
                    className="inline-block"
                >
                    <Link
                        href={sidebarCta.buttonHref || "/get-a-quote"}
                        className="mt-2 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-xl text-sm lg:text-base font-semibold shadow-md hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                    >
                        <span>{sidebarCta.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}