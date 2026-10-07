"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface PageTopSectionProps {
    title?: string;
    breadcrumbCurrent?: string;
    breadcrumbHome?: string;
}

export default function PageTopSection({
    title = "Contact Us",
    breadcrumbCurrent = "Contact Us",
    breadcrumbHome = "Home",
}: PageTopSectionProps) {
    return (
        <section className="relative w-full py-16 lg:py-20  font-sans overflow-hidden bg-gradient-to-b from-[#eaf2ff] via-[#f3f7ff] to-[#ffffff]">
            {/* Background Subtle Grid Lines Pattern */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Ambient Radial Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-200/30 blur-3xl rounded-full pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0d1b3e] tracking-tight mb-4"
                >
                    {title}
                </motion.h1>

                {/* Breadcrumb Links */}
                <motion.nav
                    aria-label="Breadcrumb"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="flex items-center space-x-2 text-sm sm:text-base font-medium text-slate-500"
                >
                    <Link
                        href="/"
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        {breadcrumbHome}
                    </Link>
                    <span className="text-slate-400 font-normal mx-1">/</span>
                    <span className="text-blue-600/90 font-medium">
                        {breadcrumbCurrent}
                    </span>
                </motion.nav>
            </div>
        </section>
    );
}