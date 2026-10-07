'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Menu,
    X,
    Home,
    Info,
    Wrench,
    Briefcase,
    BookOpen,
    Mail
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteMap } from '@/data';

const navIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home,
    Info,
    Wrench,
    Briefcase,
    BookOpen,
    Mail,
    ArrowRight,
};

interface NavbarProps {
    onNavClick?: (href: string) => void;
    onEnquireClick?: () => void;
}

export default function Navbar({
    onNavClick,
    onEnquireClick
}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const data = siteMap.navbar;

    const isItemActive = (href: string) => {
        if (!pathname) return href === '/';
        if (href === '/') {
            return pathname === '/';
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleItemClick = (href: string) => {
        setIsOpen(false);
        if (typeof window !== 'undefined') {
            const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis;
            if (pathname === href) {
                // If user clicks the current page, smooth scroll to the top
                if (lenis) {
                    lenis.scrollTo(0);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                // Navigating to a different page: reset scroll immediately to 0
                if (lenis) {
                    lenis.scrollTo(0, { immediate: true });
                }
                window.scrollTo(0, 0);
            }
        }
        if (onNavClick) onNavClick(href);
    };

    const ActionIcon = navIconMap[data.actionButton.icon] || ArrowRight;

    return (
        <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 font-sans relative z-50">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 h-20 flex items-center justify-between">

                {/* 1. Logo Section */}
                <Link
                    href={data.logo.href}
                    onClick={() => handleItemClick(data.logo.href)}
                    className="flex items-center"
                    data-cursor-text="Home"
                >
                    <Image
                        src={data.logo.src}
                        width={data.logo.width}
                        height={data.logo.height}
                        alt={data.logo.alt}
                        priority
                        className="h-auto w-auto max-h-20"
                    />
                </Link>

                {/* 2. Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                    {data.navItems.map((item) => {
                        const isActive = isItemActive(item.href);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => handleItemClick(item.href)}
                                className={`relative px-4 py-2 rounded-xl text-sm lg:text-base transition-colors flex items-center justify-center ${isActive
                                    ? 'text-blue-600'
                                    : 'text-slate-700 hover:text-blue-600'
                                    }`}
                            >
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="navbarActiveIndicator"
                                        className="absolute -bottom-1 left-0 right-0 mx-auto w-8 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-[0_2px_8px_rgba(37,99,235,0.4)] pointer-events-none"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* 3. Action Button (Desktop) */}
                <div className="hidden sm:flex items-center">
                    <Link
                        href={data.actionButton.href}
                        onClick={() => {
                            handleItemClick(data.actionButton.href);
                            if (onEnquireClick) onEnquireClick();
                        }}
                        data-cursor-text="Quote"
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-medium text-sm px-6 py-3 rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 group cursor-pointer"
                    >
                        <span>{data.actionButton.label}</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            <ActionIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                    </Link>
                </div>

                {/* 4. Mobile Menu Toggle Button */}
                <div className="flex lg:hidden items-center">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                        className="text-gray-800  focus:outline-none transition-colors"
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </motion.button>
                </div>

            </div>

            {/* 5. Mobile Drawer & Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 top-20 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
                        />

                        {/* Mobile Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 shadow-2xl overflow-hidden relative z-50"
                        >
                            <div className="flex flex-col space-y-1.5">
                                {data.navItems.map((item) => {
                                    const IconComponent = navIconMap[item.icon] || Home;
                                    const isActive = isItemActive(item.href);
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => handleItemClick(item.href)}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base transition-colors ${isActive
                                                ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600 shadow-xs'
                                                : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium'
                                                }`}
                                        >
                                            <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}

                                <div className="pt-3">
                                    <Link
                                        href={data.actionButton.href}
                                        onClick={() => {
                                            handleItemClick(data.actionButton.href);
                                            if (onEnquireClick) onEnquireClick();
                                        }}
                                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white font-medium text-base py-3.5 rounded-xl shadow-lg shadow-blue-600/30"
                                    >
                                        <span>{data.actionButton.label}</span>
                                        <ActionIcon className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}