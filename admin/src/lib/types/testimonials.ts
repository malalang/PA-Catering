export interface TestimonialRecord {
    id: string;
    text: string;
    author: string;
    rating: number;
    likes: string[];
    comments: unknown[];
    created_at: string;
}

export interface FeaturedItemRecord {
    id: string;
    name: string;
    description: string;
    image_url: string | null;
    likes: string[];
    comments: unknown[];
    created_at: string;
}
