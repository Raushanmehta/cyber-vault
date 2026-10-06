"use client";

import PageTopSection from "@/components/common/PageTopSection";
import ServicesSection from "@/sections/home/ServiceSection";
import { siteMap } from "@/data";

export default function ServicePage() {
    const servicesData = siteMap.services;

    return (
        <main>
            <PageTopSection title="Our Services" breadcrumbCurrent="Services" breadcrumbHome="Home" />
            <ServicesSection data={servicesData} />
        </main>
    );
}