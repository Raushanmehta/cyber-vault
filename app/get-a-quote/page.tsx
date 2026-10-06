import PageTopSection from "@/components/common/PageTopSection";
import GetAQuoteSection from "@/sections/GetAQuoteSection";
import { siteMap } from "@/data";

export default function GetAQuotePage() {
    const getAQuoteData = siteMap.getAQuote;

    return (
        <main>
            <PageTopSection title="Get A Quote" breadcrumbCurrent="Get A Quote" breadcrumbHome="Home" />
            <GetAQuoteSection data={getAQuoteData} />
        </main>
    );
}