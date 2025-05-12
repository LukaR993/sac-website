import { Locale } from '@/types'
import React from 'react'
import { getBlogPosts } from '@/actions/blog'
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query'
import SingleBlogRender from '@/components/functional/single-blog-render'



const prefetchBlog = async (locale: Locale,slug: string) => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['blogs', { lang: locale }],
      queryFn: () => getBlogPosts({ limit:1, page: 1, lang: locale, slug:slug})
    })
    return { dehydratedState: dehydrate(queryClient) }
  }
export default async function BlogPage({locale,slug}: {locale: Locale, slug: string}) {
  const {dehydratedState} = await prefetchBlog(locale,slug)
  return (
    <HydrationBoundary state={dehydratedState}>
        <SingleBlogRender slug={slug} locale={locale} />
    </HydrationBoundary>
  )
}
