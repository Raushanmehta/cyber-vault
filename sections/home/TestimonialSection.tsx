"use client";

import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from "@/components/cards/TestimonialCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel";
import { siteMap, type CyberVaultTestimonialData } from "@/data";

interface TestimonialSectionProps {
    data?: CyberVaultTestimonialData;
}

export default function TestimonialSection({ data: propData }: TestimonialSectionProps = {}) {
    const data = propData || siteMap.testimonial;
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const autoplayPlugin = useRef(
        Autoplay({ delay: 3500, stopOnInteraction: false })
    );

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="relative w-full bg-[#f8fbff] py-8 lg:py-14 overflow-hidden font-sans">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4">
                {/* Section Tagline */}
                <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-blue-600 rounded-full"></span>
                    <span className="text-xs sm:text-sm font-bold tracking-wider text-blue-900 uppercase">
                        {data.tagline}
                    </span>
                    <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-blue-600 rounded-full"></span>
                </div>

                {/* Section Heading */}
                <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl text-[#091122] tracking-tight mb-2">
                    {data.title.prefix}{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                        {data.title.highlight}
                    </span>
                </h2>

                {/* Subtitle */}
                <p className="text-center text-slate-500 max-w-3xl mx-auto text-sm lg:text-base mb-4">
                    {data.description}
                </p>

                {/* Carousel Container */}
                <div className="relative mt-8">
                    <Carousel
                        setApi={setApi}
                        plugins={[autoplayPlugin.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-[1350px] mx-auto"
                    >
                        <CarouselContent className="-ml-6 py-4">
                            {data.testimonials.map((testimonial, index) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className="pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                                >
                                    <TestimonialCard
                                        item={testimonial}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Buttons */}
                        <div className="hidden sm:block">
                            <CarouselPrevious className="-left-4 lg:-left-6 w-11 h-11 bg-white text-blue-600 shadow-lg border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300" />
                            <CarouselNext className="-right-4 lg:-right-6 w-11 h-11 bg-white text-blue-600 shadow-lg border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300" />
                        </div>
                    </Carousel>
                </div>

                {/* Carousel Pagination Dots */}
                {count > 1 && (
                    <div className="flex items-center justify-center space-x-2.5 mt-4">
                        {Array.from({ length: count }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => api?.scrollTo(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${current === idx
                                    ? "w-7 bg-blue-600"
                                    : "w-2.5 bg-blue-200 hover:bg-blue-300"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}