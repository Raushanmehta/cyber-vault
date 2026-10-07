import PageTopSection from "@/components/common/PageTopSection";
import ServiceDetailSection from "@/pages/ServiceDetailSection";
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
    const services = siteMap.services;
    const currentService =
        services.servicesList.find((s) => s.id === slug) || services.servicesList[0];

    const serviceTitle = currentService?.title || "Service Detail";

    return (
        <main>
            <PageTopSection
                title={serviceTitle}
                breadcrumbCurrent={serviceTitle}
                breadcrumbHome="Home"
            />
            <ServiceDetailSection data={services} initialServiceId={slug} />
        </main>
    );
}