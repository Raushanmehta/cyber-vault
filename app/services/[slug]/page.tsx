import PageTopSection from "@/components/common/PageTopSection";
import ServiceDetailSection from "@/sections/ServiceDetailSection";
import { siteMap } from "@/data";

interface ServiceDetailPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return siteMap.services.servicesList.map((service) => ({
        slug: service.id,
    }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const { slug } = await params;

    return (
        <main>
            <PageTopSection
                title="Service Detail"
                breadcrumbCurrent="Service Detail"
                breadcrumbHome="Home"
            />
            <ServiceDetailSection data={siteMap.services} initialServiceId={slug} />
        </main>
    );
}