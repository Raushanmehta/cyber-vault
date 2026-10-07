import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export interface BlogPost {
    id: number;
    slug?: string;
    category?: string;
    date: string;
    title: string;
    image: string;
    excerpt: string;
    author: string;
    authorRole?: string;
    readTime: string;
    content?: {
        intro?: string;
        sections?: Array<{
            title: string;
            paragraph: string;
            checklist?: string[];
            secondaryImage?: string;
        }>;
        quote?: string;
        conclusion?: string;
    };
}

interface BlogCardProps {
    post: BlogPost;
    index: number;
    setSelectedPost?: (post: BlogPost) => void;
}

export default function BlogCard({ post, index, setSelectedPost }: BlogCardProps) {
    return (
        <motion.div
            key={post.id}
            data-cursor-text="Read"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

            onClick={() => setSelectedPost?.(post)}
            className="group relative h-[300px] lg:h-[420px] rounded-xl overflow-hidden cursor-pointer  transition-all duration-500 flex flex-col justify-end border border-transparent hover:border-cyan-400/40"
        >
            {/* Background Image with Zoom on Hover */}
            <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover "
            />

            {/* Gradient Dark Overlay (Animates Down-to-Top on Hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#162556] via-[#162556]/70 to-transparent translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none" />

            {/* Card Content Overlay (Animates Down-to-Top on Hover) */}
            <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-end h-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {/* Date Badge */}
                <div className="flex items-center space-x-2 text-blue-400 font-medium text-xs sm:text-sm mb-3">
                    <div className="w-6 h-6 rounded-md bg-blue-600/30 backdrop-blur-md flex items-center justify-center">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span>{post.date}</span>
                </div>

                {/* Title and Arrow Action Button Row */}
                <div className="flex items-end justify-between space-x-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-blue-200 transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                        {post.title}
                    </h3>

                    <Link
                        href={`/blog/${post.slug || post.id}`}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Read ${post.title}`}
                        className="flex-shrink-0 w-11 h-11 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}