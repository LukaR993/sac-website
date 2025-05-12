'use client'
import React from 'react'
import Image from 'next/image'
import { Locale } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getBlogPosts } from '@/actions/blog'
import { getArticle } from '@/actions/starko'
import { MemoizedMarkdown } from '../markdown-block'
import { AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

export default function SingleBlogRender({ slug, locale }: { slug: string, locale: Locale }) {
  const key = locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b";

    const {data: blog,isLoading,error} = useQuery({
        queryKey: ['blog', slug, key],
        queryFn: () => getArticle(slug,key),
        retry: false,
    })
  
  if (isLoading) {
    return <div className='flex justify-center items-center h-[100svh]'><Loader2 className='w-4 animate-spin' /></div>;
  }
  if (error) {
    return <div className='flex justify-center items-center h-[100svh] flex-col gap-2'>
      <p className='text-red-500'>{error.message}</p>
     <Link href={`/`} className={cn(buttonVariants({variant: 'outline'}))}>
      Go home
     </Link>
    </div>;
  }
  return (
    <article className="max-w-4xl mx-auto bg-white  overflow-hidden">
   
      
      <div className="px-4 md:px-0 py-8 md:py-16">
        <div className="flex items-center gap-4 mb-6">
          <time className="text-sm text-gray-500 font-medium">
            {new Date(blog?.data.created_at || "").toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {blog?.data.title}
        </h1>

        <MemoizedMarkdown content={blog?.data.content || ""} id={blog?.data.id || ""} />
      </div>
    </article>
  )
}
