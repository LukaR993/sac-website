"use server";

interface CustomField {
  client: string;
  financed: string;
  investor: string;
}

interface Blog {
  id: string;
  author: string;
  title: string;
  meta_title: string;
  slug: string | null;
  summary: string;
  project_id: string;
  published: string | null;
  created_at: string;
  updated_at: string | null;
  published_at: string;
  html: string | null;
  thumbnail_id: string | null;
  user_id: string;
  public: boolean;
  editor_data: string | null;
  lang: string;
  category_id: string | null;
  custom_field: CustomField;
  views: string;
  last_requested_at: string | null;
  thumbnail_url: string | null;
  category_name: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string | null;
}

interface Pagination {
  totalCount: string;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BlogResponse {
  count: number;
  blogs: Blog[];
  pagination: Pagination;
}

export interface CategoryResponse {
  count: number;
  categories: Category[];
  pagination: Pagination;
}

interface BlogParams {
  category_id?: string;
  lang?: string;
  slug?: string;
  limit?: number;
  page?: number;
  title?: string;
  apiKey?: string;
}

const BLOG_API_ENDPOINTS = {
  news: "https://www.blogstark.com/api/v1",
  openData: "https://www.blogstark.com/api/v1/api/v1",
} as const;



export async function getBlogPosts(params: BlogParams): Promise<BlogResponse> {
  try {
    if (params.category_id === 'null') {
      params.category_id = undefined;
    }

    const page = params.page || 1;
    const limit = params.limit || 1;

    const searchParams = new URLSearchParams();
    searchParams.append('simpleMode', 'true');
     
    Object.entries({ ...params, page, limit }).forEach(([key, value]) => {
      if (value === undefined) return;
      
      if (key === 'lang') {
        const langMap = {
          en: 'en-US',
          me: 'sr-Latn-Me', 
          ru: 'ru-RU',
          sq: 'al',
        };
        searchParams.append(key, langMap[value as keyof typeof langMap] || value.toString());
      } else {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${BLOG_API_ENDPOINTS.news}?${searchParams}`, {
      headers: {
        "SIMPLE_CMS_APP_KEY": params.apiKey || process.env.SIMPLE_CMS_APP_KEY!
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
}

export async function getOpenDataPosts(params: BlogParams): Promise<BlogResponse> {
  try {
    if (params.category_id === 'null') {
      params.category_id = undefined;
    }

    const page = params.page || 1;
    const limit = params.limit || 1;

    const searchParams = new URLSearchParams();
    searchParams.append('simpleMode', 'true');
    
    Object.entries({ ...params, page, limit }).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${BLOG_API_ENDPOINTS.openData}?${searchParams}`, {
      headers: {
        "SIMPLE_CMS_APP_KEY": params.apiKey || process.env.SIMPLE_CMS_APP_KEY!,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching open data posts:", error);
    throw new Error("Failed to fetch open data posts");
  }
}

export async function getCategories(lang?: string): Promise<CategoryResponse> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('simpleMode', 'true');
    
    if (lang) {
      searchParams.append('lang', lang);
    }

    const response = await fetch(`${BLOG_API_ENDPOINTS.news}/categories?${searchParams}`, {
      headers: {
        "SIMPLE_CMS_APP_KEY": process.env.SIMPLE_CMS_APP_KEY!,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
