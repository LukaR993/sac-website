import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import Image from "next/image";
import Link from "next/link";

export default async function BlogsSection({ locale }: { locale: Locale }) {
  const dictionary = await getDictionary(locale);

  // Mock blog data - in a real application, this would come from your CMS or API
  const blogs = [
    {
      id: 1,
      title: dictionary.blogs?.blog1Title || "The Importance of Quality Raw Materials",
      excerpt: dictionary.blogs?.blog1Excerpt || "Learn why quality raw materials are crucial for premium products and how they impact your business success.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-03-15", 
      slug: "quality-raw-materials"
    },
    {
      id: 2,
      title: dictionary.blogs?.blog2Title || "Sustainable Sourcing Practices",
      excerpt: dictionary.blogs?.blog2Excerpt || "Discover our commitment to sustainable sourcing and how it benefits both the environment and your products.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-03-10",
      slug: "sustainable-sourcing"
    },
    {
      id: 3,
      title: dictionary.blogs?.blog3Title || "Industry Trends 2024",
      excerpt: dictionary.blogs?.blog3Excerpt || "Stay ahead of the curve with our analysis of the latest trends in the raw materials industry.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      date: "2024-03-05",
      slug: "industry-trends"
    },
    {
      id: 4,
      title: "Innovation in Raw Material Processing",
      excerpt: "Explore the latest technological advancements revolutionizing how we process and utilize raw materials in manufacturing.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-02-28",
      slug: "innovation-processing"
    },
    {
      id: 5,
      title: "Global Supply Chain Resilience",
      excerpt: "Understanding how to build robust supply chains and maintain quality standards across international markets.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-02-20",
      slug: "supply-chain-resilience"
    },
    {
      id: 6,
      title: "Quality Control Best Practices",
      excerpt: "Learn about the essential quality control measures that ensure consistent excellence in raw material sourcing.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-02-15",
      slug: "quality-control-practices"
    }
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-8 md:mb-16 ">
          {dictionary.blogs?.title || "Latest from Our Blog"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white  relative  min-h-[400px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#7D1C21] to-transparent h-full flex flex-col  justify-end">
                <div className="text-sm text-white/90 mb-2">
                  {new Date(blog.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {blog.title}
                </h3>
                <p className="text-white/90 mb-4">
                  {blog.excerpt}
                </p>
                <Link 
                  href={`/${locale}/blog/${blog.slug}`}
                  className="text-white self-end font-medium hover:underline inline-flex items-center"
                >
                  {dictionary.blogs?.readMore || "Read More"}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 