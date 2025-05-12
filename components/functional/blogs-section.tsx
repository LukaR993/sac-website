import { getBlogPosts } from "@/actions/blog";
import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import MultiBlog from "./multi-blog";
import ProductList from "./product-list";





const prefetchBlogs = async (locale: Locale) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['blogs', { lang: locale }],
    queryFn: () => getBlogPosts({ limit: 6, page: 1, lang: locale })
  })
  return { dehydratedState: dehydrate(queryClient) }
}

export default async function BlogsSection({ locale }: { locale: Locale }) {
  const dictionary = await getDictionary(locale);
  const { dehydratedState } = await prefetchBlogs(locale)
  // Mock blog data - in a real application, this would come from your CMS or API
  // const blogs = [
  //   {
  //     id: 1,
  //     title: dictionary.blogs?.blog1Title || "The Importance of Quality Raw Materials",
  //     excerpt: dictionary.blogs?.blog1Excerpt || "Learn why quality raw materials are crucial for premium products and how they impact your business success.",
  //     image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     date: "2024-03-15", 
  //     slug: "quality-raw-materials"
  //   },
  //   {
  //     id: 2,
  //     title: dictionary.blogs?.blog2Title || "Sustainable Sourcing Practices",
  //     excerpt: dictionary.blogs?.blog2Excerpt || "Discover our commitment to sustainable sourcing and how it benefits both the environment and your products.",
  //     image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     date: "2024-03-10",
  //     slug: "sustainable-sourcing"
  //   },
  //   {
  //     id: 3,
  //     title: dictionary.blogs?.blog3Title || "Industry Trends 2024",
  //     excerpt: dictionary.blogs?.blog3Excerpt || "Stay ahead of the curve with our analysis of the latest trends in the raw materials industry.",
  //     image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
  //     date: "2024-03-05",
  //     slug: "industry-trends"
  //   },
  //   {
  //     id: 4,
  //     title: "Innovation in Raw Material Processing",
  //     excerpt: "Explore the latest technological advancements revolutionizing how we process and utilize raw materials in manufacturing.",
  //     image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     date: "2024-02-28",
  //     slug: "innovation-processing"
  //   },
  //   {
  //     id: 5,
  //     title: "Global Supply Chain Resilience",
  //     excerpt: "Understanding how to build robust supply chains and maintain quality standards across international markets.",
  //     image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     date: "2024-02-20",
  //     slug: "supply-chain-resilience"
  //   },
  //   {
  //     id: 6,
  //     title: "Quality Control Best Practices",
  //     excerpt: "Learn about the essential quality control measures that ensure consistent excellence in raw material sourcing.",
  //     image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     date: "2024-02-15",
  //     slug: "quality-control-practices"
  //   }
  // ];
  const header = [{
    title: 'Proizvodi',
    lang: 'me'
  },
{
  lang: 'en',
  title: 'Products'
},{
  lang:'ru',
  title: 'Продукты'
},{
  lang:'sq',
  title: 'Produkte'
}]

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl text-center font-bold mb-8 md:mb-16 ">
          {header.find(h => h.lang === locale)?.title}
        </h2>
        <HydrationBoundary state={dehydratedState}>
        <div className="">
          <ProductList locale={locale} title={dictionary.blogs?.title } />
        </div>
        </HydrationBoundary>
      </div>
    </section>
  );
} 