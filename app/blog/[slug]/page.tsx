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
    const blogData = siteMap.blog;
    const currentPost =
        blogData.blogPosts.find(
            (p) => p.slug === slug || String(p.id) === slug
        ) || blogData.blogPosts[0];

    const postTitle = currentPost?.title || "Blog Detail";

    return (
        <main>
            <PageTopSection
                title={postTitle}
                breadcrumbCurrent={postTitle}
                breadcrumbHome="Home"
            />
            <BlogDetailSection data={blogData} initialSlug={slug} />
        </main>
    );
}