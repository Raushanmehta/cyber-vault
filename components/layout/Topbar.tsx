'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Mail,
} from 'lucide-react';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { LiaLinkedin } from 'react-icons/lia';
import { siteMap } from '@/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ShieldCheck,
    Mail,
    BsTwitter,
    FaFacebook,
    LiaLinkedin,
    BsInstagram,
};

interface TopBarProps {
    email?: string;
    contactUrl?: string;
    onContactClick?: () => void;
}

export default function TopBar({
    email,
    contactUrl,
    onContactClick
}: TopBarProps) {
    const data = siteMap.topbar;
    const currentEmail = email || data.contact.email;
    const currentContactUrl = contactUrl || data.notification.link.href;

    const NotificationIcon = iconMap[data.notification.icon] || ShieldCheck;
    const EmailIcon = iconMap[data.contact.emailIcon] || Mail;

    return (
        <div className="hidden md:block w-full bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-blue-800/40 shadow-sm relative z-50 font-sans">
            <div className="max-w-[1350px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">

                {/* Left: Notification Banner */}
                <div className="flex items-center space-x-2 text-center md:text-left flex-wrap justify-center md:justify-start">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-cyan-400 flex items-center"
                    >
                        <NotificationIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <span className="text-gray-200 font-normal tracking-wide">
                        {data.notification.text}
                    </span>
                    <motion.a
                        href={currentContactUrl}
                        onClick={onContactClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white font-medium underline underline-offset-4 decoration-cyan-400 hover:text-cyan-300 transition-colors ml-1"
                    >
                        {data.notification.link.label}
                    </motion.a>
                </div>

                {/* Right: Contact Email & Social Media Links */}
                <div className="flex items-center space-x-4 sm:space-x-6 text-gray-300">

                    {/* Email Info */}
                    <motion.a
                        href={`mailto:${currentEmail}`}
                        whileHover={{ scale: 1.03 }}
                        className="flex items-center space-x-2 hover:text-white transition-colors"
                    >
                        <EmailIcon className="w-4 h-4 text-cyan-400" />
                        <span className="font-normal tracking-wide">{currentEmail}</span>
                    </motion.a>

                    {/* Divider */}
                    <div className="h-4 w-[1px] bg-blue-700/60 hidden sm:block" />

                    {/* Social Media Icons */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        {data.socialLinks.map((social) => {
                            const SocialIcon = iconMap[social.icon] || BsTwitter;
                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, color: social.color }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-300 transition-colors p-1"
                                    aria-label={social.name}
                                >
                                    <SocialIcon className="w-4 h-4" />
                                </motion.a>
                            );
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}