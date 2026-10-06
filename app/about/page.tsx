import PageTopSection from "@/components/common/PageTopSection";
import AboutSection from "@/sections/home/AboutSection";
import OurImpactSection from "@/sections/home/OurImpactSection";
import TestimonialSection from "@/sections/home/TestimonialSection";
import WhyChooseUsSection from "@/sections/WhyChooseUsSection";
import { siteMap } from "@/data";

export default function AboutPage() {
    const { about, ourImpact, whyChooseUs, testimonial } = siteMap;

    return (
        <main>
            <PageTopSection title="About Us" breadcrumbCurrent="About Us" breadcrumbHome="Home" />
            <AboutSection data={about} />
            <OurImpactSection data={ourImpact} />
            <WhyChooseUsSection data={whyChooseUs} />
            <TestimonialSection data={testimonial} />
        </main>
    );
}
