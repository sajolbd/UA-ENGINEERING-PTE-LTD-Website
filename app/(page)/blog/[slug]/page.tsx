import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Container from "../../../../components/shared/Container";
import Breadcrumb from "../../../../components/layout/Breadcrumb";
import BlogSidebar from "../../../../components/blog/BlogSidebar";
import InlineShare from "../../../../components/blog/InlineShare";
import { BlogPost } from "../../../../hooks/useBlogPosts";
import { getApiBaseUrl, getBlogImageUrl } from "../../../../lib/api";

// Allow dynamic rendering so new posts appear without a rebuild
export const dynamic = "force-dynamic";

const siteUrl = "https://ua-engineering-pte.vercel.app";

interface PageProps {
  params: {
    slug: string;
  };
}

import { blogPosts as fallbackBlogs } from "../../../../data/blogData";

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/blogs`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
  } catch {
    // ignore network errors
  }
  return fallbackBlogs;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const decoded = decodeURIComponent(slug).toLowerCase();
  return (
    posts.find((p) => {
      const pSlug = (p.slug || "").toLowerCase();
      const pId = (p.id || p._id || "").toString().toLowerCase();
      return pSlug === decoded || pId === decoded || pSlug === slug.toLowerCase() || pId === slug.toLowerCase();
    }) || null
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Blog | UA Engineering" };
  }

  const plainText = post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const description = plainText.slice(0, 160);
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = getBlogImageUrl(post.image);

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      url: pageUrl,
      title: post.title,
      description,
      siteName: "UA Engineering PTE. LTD.",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const [post, allPosts] = await Promise.all([
    getPost(params.slug),
    getAllPosts(),
  ]);

  if (!post) {
    notFound();
  }

  // Extract h3 headings for Table of Contents
  const headings = post.content.match(/<h3>(.*?)<\/h3>/g)?.map((h) => {
    const text = h.replace(/<\/?h3>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { text, id };
  }) || [];

  // Inject IDs into h3 tags in the article content
  let processedContent = post.content;
  headings.forEach((heading) => {
    const target = `<h3>${heading.text}</h3>`;
    const replacement = `<h3 id="${heading.id}">${heading.text}</h3>`;
    processedContent = processedContent.replace(target, replacement);
  });

  const apiBase = getApiBaseUrl();
  processedContent = processedContent
    .replace(/src="http:\/\/localhost:5000\/images\/uploads\//g, `src="${apiBase}/images/uploads/`)
    .replace(/src="\/images\/uploads\//g, `src="${apiBase}/images/uploads/`);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumb
        title={post.category}
        description="UA Engineering Blog & Insights"
        bgImage="/images/layout/blog-bg.png"
      />

      <section className="py-8">
        <Container>
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-secondary transition-colors duration-300"
            >
              <ArrowLeft size={14} />
              <span>Back to all articles</span>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left Column: Table of Contents (Desktop only) */}
            <div className="lg:w-[240px] shrink-0 sticky top-24 self-start lg:block hidden">
              <div className="bg-slate-50/60 border border-slate-100 p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <h4 className="text-xs font-black tracking-wider uppercase text-slate-800 mb-4 pb-2 border-b border-slate-200/50">
                  Table of Contents
                </h4>
                {headings.length > 0 ? (
                  <div className="flex flex-col gap-2.5">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="text-[11px] font-bold text-slate-500 hover:text-secondary transition-colors duration-200 leading-normal"
                      >
                        {heading.text}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 font-bold">No sub-sections available.</p>
                )}
              </div>
            </div>

            {/* Middle Column: Article content */}
            <div className="flex-1 min-w-0 w-full">
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                {/* Category tag */}
                <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-secondary uppercase bg-secondary/5 px-2.5 py-1.5 rounded-full inline-block mb-4">
                  {post.category}
                </span>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Date Metadata */}
                <div className="flex items-center gap-2 mb-6 pb-5 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400">{post.date}</span>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 bg-slate-50 border border-slate-100">
                  <Image
                    src={getBlogImageUrl(post.image)}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>

                {/* Article content */}
                <div
                  className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-h3:text-base sm:prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-medium prose-a:text-indigo-600 hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />

                {/* Social share row (inline bottom) */}
                <InlineShare postTitle={post.title} postUrl={`${siteUrl}/blog/${post.slug}`} />

              </div>
            </div>

            {/* Right Column: Sidebar — sticky below navbar */}
            <div className="lg:w-[280px] w-full mt-8 lg:mt-0 sticky lg:top-36 self-start">
              <BlogSidebar
                mode="detail"
                posts={allPosts}
                currentPostTitle={post.title}
                currentPostUrl={`${siteUrl}/blog/${post.slug}`}
              />
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
