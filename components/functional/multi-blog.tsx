'use client'
import { getBlogPosts } from '@/actions/blog'
import { Locale } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function MultiBlog({locale}: {locale: Locale}) {
  const {data: blogs} = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getBlogPosts({ limit: 6, page: 1, lang: locale }),
  })
  console.log(blogs, 'BLOGS')
  return (
    <>
    {blogs?.blogs.map((blog) => (
        <article key={blog.id} className="bg-white  relative  min-h-[400px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={blog.thumbnail_url || ""}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#7D1C21] to-transparent h-full flex flex-col  justify-end">
            <div className="text-sm text-white/90 mb-2">
              {new Date(blog.published_at).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              {blog.title}
            </h3>
            <p className="text-white/90 mb-4 truncate">
              {blog.summary}
            </p>
            <Link 
              href={`/${locale}/blog/${blog.slug}`}
              className="text-white self-end font-medium hover:underline inline-flex items-center"
            >
              {/* {dictionary.blogs?.readMore || "Read More"} */}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </article>
      ))}
      </>
  )
}
