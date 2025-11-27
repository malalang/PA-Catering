// Type definitions for database records used across admin interface

export interface CommentRecord {
    id: string;
    product_id: string | null;
    user_id: string | null;
    user_name: string | null;
    body: string;
    created_at: string;
}

export interface ContactRecord {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    created_at: string;
}

export interface PhotoBookingRecord {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    date: string;
    time: string;
    package: string;
    people: number;
    message: string | null;
    created_at: string;
}

export interface CategoryRecord {
    id: string;
    category_name: string;
    image: string | null;
    description: string | null;
    created_at: string;
    is_hidden?: boolean;
}

export interface ProfileRecord {
    id: string;
    email: string | null;
    display_name: string | null;
    phone: string | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
    role: string;
    uid: string | null;
    email_verified: boolean;
    photo_url: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    country: string | null;
    theme: string;
    theme: string;
    tier_status: string;
    referral_code: string | null;
    preferences: Record<string, unknown>;
    saved_payment_methods: unknown[];
    updated_at: string;
    last_login: string;
}

export interface UserFavoriteRecord {
    user_id: string;
    product_id: string;
    created_at: string;
}
