import PageTopSection from "@/components/common/PageTopSection";
import ContactSection from "@/sections/ContactSection";
import { siteMap } from "@/data";

export default function ContactPage() {
    const contactData = siteMap.contact;

    return (
        <main>
            <PageTopSection title="Contact Us" breadcrumbCurrent="Contact Us" breadcrumbHome="Home" />
            <ContactSection data={contactData} />
        </main>
    );
}