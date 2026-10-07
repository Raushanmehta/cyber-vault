"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import ContactCard from "@/components/cards/ContactCard";
import { siteMap, type CyberVaultContactData } from "@/data";

const contactIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    BiSolidPhoneCall,
    FaMapMarkerAlt,
    IoMdMail,
    Clock,
    ArrowUpRight,
    Sparkles,
};

interface ContactSectionProps {
    data?: CyberVaultContactData;
}

export default function ContactSection({ data: propData }: ContactSectionProps = {}) {
    const data = propData || siteMap.contact;
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
            });
        }, 4000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const ActionIcon = contactIconMap[data.form.submitButton.icon] || ArrowUpRight;

    return (
        <section className="relative w-full bg-white py-8 lg:py-14 font-sans overflow-hidden">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">

                {/* Top 4 Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.infoCards.map((card, idx) => {
                        const IconComponent = contactIconMap[card.icon] || BiSolidPhoneCall;
                        return (
                            <ContactCard
                                key={card.title}
                                card={{
                                    ...card,
                                    icon: IconComponent
                                }}
                                idx={idx}
                            />
                        );
                    })}
                </div>

                {/* Bottom Main Grid: Header & Map vs Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">

                    {/* Left Column (5 Cols): Text Header & Embedded Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-5 flex flex-col space-y-6"
                    >
                        <div>
                            {/* Tagline */}
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="w-12 h-[2px] bg-blue-600 rounded-full"></span>
                                <span className="text-sm font-bold tracking-widest text-[#091122] uppercase flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                                    {data.header.tagline}
                                </span>
                            </div>

                            {/* Title */}
                            <AnimatedHeading
                                as="h2"
                                className="text-3xl sm:text-4xl lg:text-5xl text-[#091122] tracking-tight leading-tight"
                            >
                                {data.header.title.prefix}{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                    {data.header.title.highlight}
                                </span>
                            </AnimatedHeading>

                            {/* Description */}
                            <p className="mt-2 text-slate-500 text-sm sm:text-base leading-relaxed">
                                {data.header.description}
                            </p>
                        </div>

                        {/* Embedded Interactive Map Card */}
                        <motion.div
                            id="map"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-slate-200/80 shadow-md relative"
                        >
                            <iframe
                                title="Google Maps Location"
                                src={data.header.mapEmbedUrl}
                                className="w-full h-full border-0 filter contrast-[1.02]"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div>
                    </motion.div>

                    {/* Right Column (7 Cols): Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7 bg-[#edf4ff]/75 rounded-xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm"
                    >
                        {/* Background Light Graphic Orbs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/40 to-transparent rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/40 to-transparent rounded-full blur-2xl pointer-events-none" />

                        {/* Form Header Tagline */}
                        <div className="relative z-10 mb-6">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="w-12 h-[2px] bg-blue-600 rounded-full"></span>
                                <span className="text-sm font-bold tracking-widest text-[#091122] uppercase">
                                    {data.form.tagline}
                                </span>
                            </div>
                            <AnimatedHeading
                                as="h3"
                                className="text-2xl sm:text-3xl text-[#091122]"
                            >
                                {data.form.title.prefix}{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                    {data.form.title.highlight}
                                </span>
                            </AnimatedHeading>
                            <p className="text-sm lg:text-base text-slate-500 mt-2 leading-relaxed">
                                {data.form.description}
                            </p>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/90 border border-emerald-300 rounded-xl p-8 text-center shadow-lg my-6"
                            >
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold">✓</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    {data.form.successMessage}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Your Message
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your security requirements..."
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all resize-none"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                                    >
                                        <span>{data.form.submitButton.label}</span>
                                        <ActionIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}