'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { IoMdMail } from 'react-icons/io';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';
import Image from 'next/image';
import Link from 'next/link';
import { siteMap } from '@/data';

const footerIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FaFacebook,
    BsTwitter,
    LiaLinkedin,
    BsInstagram,
    BsYoutube,
    FaMapMarkerAlt,
    BiSolidPhoneCall,
    IoMdMail,
    ArrowRight,
    ChevronRight,
};

export default function Footer() {
    const data = siteMap.footer;

    const handleFooterLinkClick = () => {
        if (typeof window !== 'undefined') {
            const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis;
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            }
            window.scrollTo(0, 0);
        }
    };

    const AddressIcon = footerIconMap[data.getInTouch.address.icon] || FaMapMarkerAlt;
    const PhoneIcon = footerIconMap[data.getInTouch.phone.icon] || BiSolidPhoneCall;
    const EmailIcon = footerIconMap[data.getInTouch.email.icon] || IoMdMail;
    const ButtonIcon = footerIconMap[data.getInTouch.actionButton.icon] || ArrowRight;

    return (
        <footer className="relative bg-[#020617] text-white overflow-hidden font-sans border-t border-blue-900/40">
            {/* Background Glowing Mesh Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Footer Container */}
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 pt-16 pb-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Column 1: Brand Info */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Brand Logo Link */}
                        <Link href={data.brand.logo.href} onClick={handleFooterLinkClick} className="inline-block" data-cursor-text="Home">
                            <Image
                                src={data.brand.logo.src}
                                width={data.brand.logo.width}
                                height={data.brand.logo.height}
                                alt={data.brand.logo.alt}
                                priority
                                className="h-auto w-auto max-h-20"
                            />
                        </Link>

                        {/* Description */}
                        <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-sm">
                            {data.brand.description}
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex items-center space-x-3 pt-2">
                            {data.brand.socialLinks.map((social) => {
                                const Icon = footerIconMap[social.icon] || FaFacebook;
                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        whileHover={{ scale: 1.15, backgroundColor: '#1e3a8a', borderColor: '#38bdf8' }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-14 h-14 rounded-full bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-200 hover:text-white transition-colors shadow-md"
                                    >
                                        <Icon className="w-7 h-7" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative pb-2 inline-block">
                            <h3 className="text-white font-medium text-xl">{data.quickLinks.title}</h3>
                            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        </div>
                        <ul className="space-y-3 mt-4">
                            {data.quickLinks.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={handleFooterLinkClick}
                                        className="group flex items-center text-gray-300 hover:text-cyan-300 text-sm transition-colors duration-200"
                                    >
                                        <ChevronRight className="w-5 h-5 text-cyan-500/70 mr-1.5 opacity-80 group-hover:translate-x-1 group-hover:text-cyan-300 transition-transform" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Our Services Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative pb-2 inline-block">
                            <h3 className="text-white font-medium text-xl">{data.servicesLinks.title}</h3>
                            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        </div>
                        <ul className="space-y-3 mt-4">
                            {data.servicesLinks.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={handleFooterLinkClick}
                                        className="group flex items-center text-gray-300 hover:text-cyan-300 text-sm transition-colors duration-200"
                                    >
                                        <ChevronRight className="w-5 h-5 text-cyan-500/70 mr-1.5 opacity-80 group-hover:translate-x-1 group-hover:text-cyan-300 transition-transform" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Resources Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative pb-2 inline-block">
                            <h3 className="text-white font-medium text-xl">{data.resourceLinks.title}</h3>
                            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        </div>
                        <ul className="space-y-3 mt-4">
                            {data.resourceLinks.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={handleFooterLinkClick}
                                        className="group flex items-center text-gray-300 hover:text-cyan-300 text-sm transition-colors duration-200"
                                    >
                                        <ChevronRight className="w-5 h-5 text-cyan-500/70 mr-1.5 opacity-80 group-hover:translate-x-1 group-hover:text-cyan-300 transition-transform" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Get in Touch */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="relative pb-2 inline-block">
                            <h3 className="text-white font-medium text-xl">{data.getInTouch.title}</h3>
                            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        </div>

                        <ul className="space-y-3 mt-4">
                            <li className="flex items-start space-x-3">
                                <div className="w-12 h-12 rounded-full bg-blue-950 border border-blue-800/80 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                                    <AddressIcon className="w-6 h-6" />
                                </div>
                                <span className="text-gray-300 leading-tight text-xs sm:text-sm whitespace-pre-line">
                                    {data.getInTouch.address.text}
                                </span>
                            </li>

                            <li className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full bg-blue-950 border border-blue-800/80 flex items-center justify-center text-cyan-400 shrink-0">
                                    <PhoneIcon className="w-6 h-6" />
                                </div>
                                <a href={data.getInTouch.phone.href} className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">
                                    {data.getInTouch.phone.text}
                                </a>
                            </li>

                            <li className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full bg-blue-950 border border-blue-800/80 flex items-center justify-center text-cyan-400 shrink-0">
                                    <EmailIcon className="w-6 h-6" />
                                </div>
                                <a href={data.getInTouch.email.href} className="text-gray-300 hover:text-white transition-colors truncate text-xs sm:text-sm">
                                    {data.getInTouch.email.text}
                                </a>
                            </li>
                        </ul>

                        {/* Get a Quote Action Button */}
                        <div className="pt-2">
                            <Link
                                href={data.getInTouch.actionButton.href}
                                onClick={handleFooterLinkClick}
                                data-cursor-text="Quote"
                                className="w-full flex items-center justify-between bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white py-3 px-5 rounded-full shadow-lg shadow-blue-600/30 group transition-all duration-300 cursor-pointer"
                            >
                                <span className="text-sm lg:text-base tracking-wide font-medium">{data.getInTouch.actionButton.label}</span>
                                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ButtonIcon className="w-4 h-4 text-blue-700" />
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-blue-900/50 py-8 relative z-10">
                <div className="max-w-[1350px] w-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                    <div>
                        {data.bottomBar.copyright}
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        {data.bottomBar.links.map((link, idx) => (
                            <React.Fragment key={link.label}>
                                {idx > 0 && <span className="text-blue-800">|</span>}
                                <Link href={link.href} onClick={handleFooterLinkClick} className="hover:text-cyan-300 transition-colors">
                                    {link.label}
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}