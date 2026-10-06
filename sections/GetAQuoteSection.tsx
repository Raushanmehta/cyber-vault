"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Headphones,
    FileText,
    Clock,
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import Image from "next/image";
import { siteMap, type CyberVaultGetAQuoteData } from "@/data";

const quoteIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ShieldCheck,
    Headphones,
    FileText,
    Clock,
    ArrowRight,
    CheckCircle2,
    Sparkles,
};

interface GetAQuoteSectionProps {
    data?: CyberVaultGetAQuoteData;
}

export default function GetAQuoteSection({ data: propData }: GetAQuoteSectionProps = {}) {
    const data = propData || siteMap.getAQuote;
    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        service: "",
        employees: "",
        requirements: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                fullName: "",
                companyName: "",
                email: "",
                phone: "",
                service: "",
                employees: "",
                requirements: "",
            });
        }, 4000);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SubmitIcon = quoteIconMap[data.form.submitButton.icon] || ArrowRight;

    return (
        <section className="relative w-full bg-white py-8 lg:py-14 font-sans overflow-hidden">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (7 Cols): Request Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7 bg-[#edf4ff]/75 rounded-xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm"
                    >
                        {/* Background Light Graphic Orbs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/40 to-transparent rounded-full blur-2xl pointer-events-none" />

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

                        {isSubmitted ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white rounded-xl p-8 text-center my-8 border border-blue-100 shadow-md"
                            >
                                <CheckCircle2 className="w-14 h-14 text-blue-600 mx-auto mb-4 animate-bounce" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {data.form.successTitle}
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    {data.form.successMessage}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            required
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Tech Solutions Inc."
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Work Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Service Required
                                        </label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        >
                                            <option value="">Select a service</option>
                                            {data.form.servicesOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Organization Size
                                        </label>
                                        <select
                                            name="employees"
                                            value={formData.employees}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all"
                                        >
                                            <option value="">Select team size</option>
                                            {data.form.employeeOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Security Requirements / Scope
                                    </label>
                                    <textarea
                                        name="requirements"
                                        rows={4}
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        placeholder="Briefly describe your environment, compliance needs, or key vulnerabilities..."
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all resize-none"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                                    >
                                        <span>{data.form.submitButton.label}</span>
                                        <SubmitIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>

                    {/* Right Column (5 Cols): Benefits List & Tech Graphic */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-5 flex flex-col justify-between space-y-6"
                    >
                        {/* Benefits Header & Cards */}
                        <div>
                            {/* Tagline */}
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="w-12 h-[2px] bg-blue-600 rounded-full"></span>
                                <span className="text-sm font-bold tracking-widest text-[#091122] uppercase flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                                    {data.benefits.tagline}
                                </span>
                            </div>

                            {/* Title */}
                            <AnimatedHeading
                                as="h2"
                                className="text-3xl sm:text-4xl lg:text-5xl text-[#091122] tracking-tight leading-tight"
                            >
                                {data.benefits.title.prefix}{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                    {data.benefits.title.highlight}
                                </span>
                            </AnimatedHeading>

                            {/* Description */}
                            <p className="mt-2 text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                                {data.benefits.description}
                            </p>

                            {/* 4 Feature Items */}
                            <div className="space-y-3">
                                {data.benefits.items.map((item, index) => {
                                    const Icon = quoteIconMap[item.icon] || ShieldCheck;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            whileHover={{ x: 6, backgroundColor: "#ffffff", boxShadow: "0 10px 25px -5px rgba(37,99,235,0.12)" }}
                                            data-cursor-card
                                            className="group bg-white rounded-xl p-4 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center space-x-4 transition-all duration-300 cursor-pointer"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Cyber Security Image Container */}
                        <motion.div
                            transition={{ duration: 0.3 }}
                            data-cursor-card
                            className="group relative w-full h-[220px] sm:h-[260px] rounded-xl overflow-hidden border border-slate-200/80 shadow-md cursor-pointer"
                        >
                            <Image
                                src={data.benefits.image.src}
                                alt={data.benefits.image.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 500px"
                                className="object-cover transition-transform duration-700"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}