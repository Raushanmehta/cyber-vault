"use client";

import PageTopSection from "@/components/common/PageTopSection";
import PortfolioSection from "@/sections/PortfolioSection";
import { siteMap } from "@/data";

export default function PortfolioPage() {
    const portfolioData = siteMap.portfolio;

    return (
        <main>
            <PageTopSection title={portfolioData.tagline} breadcrumbCurrent="Portfolio" breadcrumbHome="Home" />
            <PortfolioSection data={portfolioData} />
        </main>
    );
}