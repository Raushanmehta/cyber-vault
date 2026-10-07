"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

export interface Testimonial {
    id: number;
    rating: number;
    quote: string;
    author: string;
    role: string;
    avatar: string;
}

export default function TestimonialCard({ item }: { item: Testimonial }) {
    const [imgSrc, setImgSrc] = useState(item.avatar);

    useEffect(() => {
        setImgSrc(item.avatar);
    }, [item.avatar]);

    return (
        <div
            key={item.id}
            data-cursor-card
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2 cursor-pointer h-full">
            {/* Top Row: Stars & Quote Icon */}
            <div>
                <div className="flex items-center justify-between mb-2 lg:mb-6">
                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1">
                        {[...Array(item.rating)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-5 h-5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300"
                            />
                        ))}
                    </div>

                    {/* Visual Quote Icon */}
                    <div className="text-blue-100 group-hover:text-blue-200 transition-colors duration-300">
                        <Quote className="w-12 h-12 transform rotate-180 fill-current opacity-80 group-hover:rotate-[195deg] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                {/* Quote Text */}
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal italic mb-2">
                    &ldquo;{item.quote}&rdquo;
                </p>
            </div>

            {/* Bottom Row: Author Details */}
            <div className="flex items-center space-x-4 lg:pt-4 mt-auto">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 bg-blue-50">
                    <Image
                        src={imgSrc || item.avatar}
                        alt={item.author}
                        width={64}
                        height={64}
                        unoptimized
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-md lg:text-xl font-bold text-[#091122]">
                        {item.author}
                    </h4>
                    <p className="text-sm text-blue-600 font-medium mt-0.5">
                        {item.role}
                    </p>
                    {/* Underline accent */}
                    <span className="block w-8 h-[2px] bg-blue-500 mt-1.5 rounded-full"></span>
                </div>
            </div>
        </div>
    );
}