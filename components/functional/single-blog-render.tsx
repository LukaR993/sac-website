"use client";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/actions/blog";
import { getArticle } from "@/actions/starko";
import { MemoizedMarkdown } from "../markdown-block";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { TableOfContents } from "./table-of-content";

// Helper function to extract image URLs from markdown content
function extractImagesFromMarkdown(content: string): string[] {
  // Handle empty content
  if (!content) return [];

  const images: string[] = [];

  // Match both standard markdown images and HTML img tags
  const markdownRegex = /!\[(?:.*?)\]\((.*?)\)/g;
  const htmlRegex = /<img.*?src=["'](.*?)["']/g;

  // Extract markdown image URLs
  let match;
  while ((match = markdownRegex.exec(content)) !== null) {
    if (match[1] && !match[1].startsWith("data:")) {
      images.push(match[1].trim());
    }
  }

  // Extract HTML img tag URLs
  while ((match = htmlRegex.exec(content)) !== null) {
    if (match[1] && !match[1].startsWith("data:")) {
      images.push(match[1].trim());
    }
  }

  // Remove duplicates and empty strings
  return [...new Set(images)].filter((url) => url.length > 0);
}

export default function SingleBlogRender({ slug, locale }: { slug: string; locale: Locale }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const key =
    locale === "me"
      ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9"
      : locale === "en"
      ? "466cb5d3-77d3-480c-ac68-e465257f9517"
      : locale === "ru"
      ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7"
      : "35039ed9-5330-40cf-897d-2dee7d19d00b";

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", slug, key],
    queryFn: () => getArticle(slug, key),
    retry: false,
  });

  const [extractedMarkdownTable, setExtractedMarkdownTable] = useState<string | null>(null);
  const markdownExtractor = function (content: string): string | null {
    // Find the first table in markdown content
    const tableRegex = /(\|.*\|.*\n\|[-|\s]*\|[-|\s]*\|[\s\S]*?)(?=\n\n|\n$|$)/;
    const match = content.match(tableRegex);

    if (!match) return null;
    if(!match[0].includes("#pakovanje")) {
      return null;
    }
    // Return the full table including headers and separator row
    return match[0];
  };

  useEffect(() => {
    console.log(blog?.data.content, "blog?.data.content");
    setExtractedMarkdownTable(markdownExtractor(blog?.data.content || ""));
  }, [blog?.data.content]);

  // Extract all images from the blog content
  const allImages = useMemo(() => {
    if (!blog?.data.content) return [];
    const markdownImages = extractImagesFromMarkdown(blog.data.content);
    const images = [blog.data.thumbnail || "", ...markdownImages].filter((url) => url !== "");
    return [...new Set(images)]; // Remove duplicates
  }, [blog?.data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100svh]">
        <Loader2 className="w-4 animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-[100svh] flex-col gap-2">
        <p className="text-red-500">{error.message}</p>
        <Link href={`/`} className={cn(buttonVariants({ variant: "outline" }))}>
          Go home
        </Link>
      </div>
    );
  }

  console.log(extractedMarkdownTable, "extractedMarkdownTable");
  return (
    <div className="grid grid-cols-1 mx-auto container max-w-7xl md:grid-cols-10 gap-4">
      <article className=" col-span-8 px-4 max-w-3xl md:px-0 pt-12 md:pt-24 mx-auto bg-white overflow-hidden">
        <Link href={`/${locale}/products`} className="text-sm text-gray-500 font-medium flex items-center gap-2 mb-4">
          <ArrowLeft className="w-4 h-4" /> Products
        </Link>
        {allImages.length > 0 && (
          <div className="space-y-4">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {allImages.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[16/9] w-full overflow-hidden ">
                      <Image src={imageUrl} alt={`Blog image ${index + 1}`} fill className="object-cover" priority={index === 0} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2 px-2 -ml-1 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {allImages.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "relative flex-shrink-0 w-20 aspect-[16/9] rounded-none overflow-hidden transition-all duration-200",
                    current === index ? "ring-2 ring-[#7D1C21] ring-offset-2" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={imageUrl} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        <Badge variant="outline" className="text-sm bg-[#7D1C21] text-white mb-2 md:mb-4  mt-4 font-medium">
          {blog?.data.category_name}
        </Badge>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start justify-start flex-col">
            <h1 className="text-3xl md:text-4xl  text-left lg:text-5xl font-bold text-gray-900 mb-2 md:mb-6">{blog?.data.title}</h1>

            <time className="text-sm text-gray-500 font-medium">
              {new Date(blog?.data.created_at || "").toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          
        </div>

        <div className="md:hidden">
          <TableOfContents content={blog?.data.content || ""} />
        </div>
        <div className="md:hidden">
        <MemoizedMarkdown content={extractedMarkdownTable || ""} id={blog?.data.id || ""} />
        </div>
        <div className="py-4 md:py-12">
          <MemoizedMarkdown content={blog?.data.content.replace(extractedMarkdownTable || "", "") || ""} id={blog?.data.id || ""} />
        </div>
      </article>
      <div className="hidden md:block col-span-2 w-full h-fit sticky top-37">
        <TableOfContents content={blog?.data.content || ""} >
        <div className="min-w-[243px] max-w-[243px] hidden md:block">
            <MemoizedMarkdown content={extractedMarkdownTable || ""} id={blog?.data.id || ""} />
          </div>
          </TableOfContents>
      </div>
    </div>
  );
}
