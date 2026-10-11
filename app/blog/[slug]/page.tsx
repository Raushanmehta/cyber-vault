import PageTopSection from "@/components/common/PageTopSection";
import BlogDetailSection from "@/sections/BlogDetailSection";
import { siteMap } from "@/data";

interface BlogDetailPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return siteMap.blog.blogPosts.map((post) => ({
        slug: post.slug || String(post.id),
    }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params;

    return (
        <main>
            <PageTopSection
                title="Blog Detail"
                breadcrumbCurrent="Blog Detail"
                breadcrumbHome="Home"
            />
            <BlogDetailSection data={siteMap.blog} initialSlug={slug} />
        </main>
    );
}