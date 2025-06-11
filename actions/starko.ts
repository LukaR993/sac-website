'use server'

import { Locale } from "@/types";
import { z } from "zod";

export const getSingleTicket = async (id: string, apiKey?: string): Promise<{
    ok: boolean;
    message: string;
    data: {
        ticket: {
            id: string;
            title: string;
            description: string;
            created_at: string;
            updated_at: string;
            status: 'backlog' | 'open' | 'in_progress' | 'closed';
            tags: string[];
            priority: 'low' | 'medium' | 'high' | 'urgent';
            files: any[];
        };
        tags: Array<{
            id: string;
            name: string;
        }>;
    };
}> => {
    const res = await fetch(`${process.env.API_ENDPOINT}/customer-portal/public?ticket_id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-starko-workspace-id': apiKey || process.env.API_KEY || "",
        },
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch ticket");
    }
    return data;
}

export const getTickets = async (params: {
    page?: number,
    tags?: string[],
    status?: 'backlog' | 'open' | 'in_progress' | 'closed',
    priority?: 'low' | 'medium' | 'high' | 'urgent',
    name?: string,
}, apiKey?: string): Promise<{
    ok: boolean;
    message: string;
    data: {
        tickets: Array<{
            id: string;
            title: string;
            description: string;
            created_at: string;
            updated_at: string;
            status: 'backlog' | 'open' | 'in_progress' | 'closed';
            is_public: boolean;
            tags: string[];
            priority: 'low' | 'medium' | 'high' | 'urgent';
        }>;
        tags: Array<{
            id: string;
            name: string;
        }>;
        pagination: {
            total: number;
            page: number;
            limit: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    };
}> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.set('page', params.page.toString());
    if (params.tags) queryParams.set('tags', params.tags.join(','));
    if (params.status) queryParams.set('status', params.status);
    if (params.priority) queryParams.set('priority', params.priority);
    if (params.name) queryParams.set('name', params.name);

    const res = await fetch(`${process.env.API_ENDPOINT}/customer-portal/public?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-starko-workspace-id': apiKey || process.env.API_KEY || "",
        },

    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tickets");
    }
    return data;
}

export const getCategories = async (apiKey?: string): Promise<{
    ok: boolean;
    message: string;
    data: Array<{
        id: string;
        name: string;
        description: string;
        created_at: string;
        updated_at: string | null;
        thumbnail_url: string | null;
    }>;
}> => {
    const res = await fetch(`${process.env.API_ENDPOINT}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-starko-workspace-id': apiKey || process.env.API_KEY || "",
        },
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch categories");
    }
    return data;
}


export const getSingleCategory = async (id: string, apiKey?: string): Promise<{
    ok: boolean;
    message: string;
    data: {
        id: string;
        name: string;
        description: string;
        created_at: string;
        updated_at: string | null;
        thumbnail_url: string | null;
        sub_categories: Array<{
            id: string;
            name: string;
            description: string;
            created_at: string;
            updated_at: string | null;
            thumbnail_url: string | null;
        }>;
    };
}> => {
    const res = await fetch(`${process.env.API_ENDPOINT}/categories/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-starko-workspace-id': apiKey || process.env.API_KEY || "",
        },
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch categories");
    }
    return data;
}



export type GetArticlesParams = {
    id?: string,
    title?: string,
    category?: string,
    subcategory?: string,
}

export const getArticles = async (params: GetArticlesParams, apiKey?: string): Promise<{
    ok: boolean;
    message: string;
    data: Array<{
        id: string;
        title: string;
        content: string;
        text_content: string;
        created_at: string;
        updated_at: string | null;
        thumbnail: string | null;
        category_name: string;
        category_id: string;
    }>;
}> => {
    const queryParams = new URLSearchParams();
    if (params?.id) queryParams.set('id', params.id);
    if (params?.title) queryParams.set('title', params.title);
    if (params?.category) queryParams.set('category', params.category);
    if (params?.subcategory) queryParams.set('sub_category', params.subcategory);
    queryParams.set('page_size', '200');
    const res = await fetch(`${process.env.API_ENDPOINT}/articles?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-starko-workspace-id': apiKey || process.env.API_KEY || "",
        },
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch articles");
    }
    return data;
}

export const getArticle = async (id: string, apiKey?: string): Promise<{
    ok: boolean;
    message: string;
    data: {
        id: string;
        title: string;
        content: string;
        created_at: string;
        updated_at: string | null;
        thumbnail: string | null;
        author_name: string | null;
        author_email: string | null;
        author_image: string | null;
        author_id: string | null;
        category_name: string;
        category_id: string;
    };
}> => {
    const res = await fetch(`${process.env.API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-starko-workspace-id': apiKey || process.env.API_KEY || "",
        },
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch article");
    }
    return data;
}


export const createTicket = async (ticket: {
    title: string,
    description: string,
    priority: string,
    status: string,
    name: string,
    email: string,
    phone: string,
    location: string,
    attachments: string[],
    locale: Locale
}, apiKey?: string) => {
    const ticketSchema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        priority: z.string().optional(),
        status: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        attachments: z.array(z.string()).optional(),
        locale: z.string().optional(),
    });

    const validatedTicket = ticketSchema.parse(ticket);
 const key = ticket.locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : ticket.locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  ticket.locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b"

    const descriptionToSend = `# Contact Form Details

## Contact Information
${validatedTicket.name ? `**Name:** ${validatedTicket.name}\n` : ''}${validatedTicket.email ? `**Email:** ${validatedTicket.email}\n` : ''}${validatedTicket.phone ? `**Phone:** ${validatedTicket.phone}\n` : ''}${validatedTicket.location ? `**Location:** ${validatedTicket.location}\n` : ''}

## Message
${validatedTicket.description ? validatedTicket.description : ''}`
    const res = await fetch(`${process.env.API_ENDPOINT}/ticket`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'x-starko-workspace-id': key,
        },
        body: JSON.stringify({
            title: validatedTicket.title,
            description: descriptionToSend,
            priority: validatedTicket.priority,
            status: validatedTicket.status,
            attachments: validatedTicket.attachments,
        }),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to create ticket");
    }
    return data;
}