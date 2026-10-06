
import { motion } from 'framer-motion';
import { ArrowRight, Bug, Search, Flame, Database, Lock, Cloud, ShieldCheck, Settings } from 'lucide-react';
import type { ServiceItem } from '@/sections/home/ServiceSection';

interface ServiceCardProps {
    service: ServiceItem;
    index: number;
    handleCardClick: (service: ServiceItem) => void;
}

export default function ServiceCard({ service, index, handleCardClick }: ServiceCardProps) {
    const IconComponent = service.icon;

    return (
        <motion.div
            key={service.id}
            data-cursor-text="Explore"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}

            onClick={() => handleCardClick(service)}
            className={`group relative rounded-3xl p-7 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden ${service.isHighlighted
                ? 'bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 text-white  border border-blue-400/40 hover:shadow-cyan-500/20'
                : 'bg-white text-slate-900 border border-slate-200/80 hover:border-blue-400/80  hover:shadow-2xl hover:shadow-blue-500/20'
                }`}
        >
            {/* Smooth Blue Gradient Background Overlay on Hover (Identical to 2nd card) */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 transition-opacity duration-300 pointer-events-none rounded-3xl ${service.isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
            />

            {/* Glowing Border Hover Accent */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/0 via-cyan-400/30 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Radial Dot Grid Pattern (Identical to 2nd card) */}
            <div
                className={`absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] transition-opacity duration-300 pointer-events-none rounded-3xl ${service.isHighlighted ? 'opacity-15' : 'opacity-0 group-hover:opacity-15'
                    }`}
            />

            {/* Horizontal Flex: Left Icon & Right Content */}
            <div className="relative z-10 flex items-start gap-4">

                {/* Left Side Icon Container */}
                <div className={`relative flex items-center justify-center w-12 h-12 lg:w-20 lg:h-20 rounded-2xl shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105 ${service.isHighlighted
                    ? 'bg-white text-blue-600 border-transparent shadow-md'
                    : 'bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-white group-hover:text-blue-600 group-hover:border-transparent group-hover:shadow-md'
                    }`}>
                    {service.id === 'threat-detection' ? (
                        <div className="relative">
                            <Bug className="w-8 h-8 lg:w-10 lg:h-10 stroke-[2.2]" />
                            <Search className="w-3.5 h-3.5 text-blue-700 absolute -bottom-1 -right-1" />
                        </div>
                    ) : service.id === 'network-defense' ? (
                        <div className="relative">
                            <Flame className="w-8 h-8 lg:w-10 lg:h-10 stroke-[2.2] text-blue-600" />
                        </div>
                    ) : service.id === 'data-encryption' ? (
                        <div className="relative">
                            <Database className="w-8 h-8 lg:w-10 lg:h-10 stroke-[2.2]" />
                            <Lock className="w-3.5 h-3.5 text-blue-700 absolute bottom-0 right-0" />
                        </div>
                    ) : service.id === 'cloud-security' ? (
                        <div className="relative">
                            <Cloud className="w-8 h-8 lg:w-10 lg:h-10 stroke-[2.2]" />
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-700 absolute bottom-0 right-0" />
                        </div>
                    ) : service.id === 'incident-response' ? (
                        <div className="relative">
                            <Settings className="w-8 h-8 lg:w-10 lg:h-10 stroke-[2.2]" />
                        </div>
                    ) : (
                        <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 stroke-[2.2]" />
                    )}
                </div>

                {/* Right Side: Title + Circular Arrow Button, and Description */}
                <div className="flex-1 min-w-0">
                    {/* Header Row: Title on Left, Arrow on Right */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                        <h3 className={`text-base sm:text-lg  leading-snug tracking-tight transition-colors duration-300 ${service.isHighlighted
                            ? 'text-white'
                            : 'text-slate-900 group-hover:text-white'
                            }`}>
                            {service.title}
                        </h3>

                        {/* Circular Action Arrow Button */}
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${service.isHighlighted
                            ? 'bg-white text-blue-600 shadow-md group-hover:bg-cyan-300'
                            : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 group-hover:bg-white group-hover:text-blue-600'
                            }`}>
                            <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>

                    {/* Description */}
                    <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${service.isHighlighted
                        ? 'text-blue-100/90'
                        : 'text-slate-600 group-hover:text-blue-100/90'
                        }`}>
                        {service.description}
                    </p>
                </div>

            </div>

        </motion.div>
    );
}
