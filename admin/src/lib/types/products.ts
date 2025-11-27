export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
}

export interface Product {
  ProductID: string;
  Name: string;
  Description: string[];
  Price: number;
  Image?: string;
  badge?: string;
  rating?: number;
  nutritional?: NutritionalInfo;
  allergens?: string[];
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export type ProductCategory = {
  id: number;
  Name: string;
  Products: Product[];
  Image?: string;
  Description?: string;
}[];

export interface ProductRecord {
  id: string;
  name: string;
  description?: string;
  category_name?: string;
  price: number;
  stock?: number;
  image_url?: string;
  badge?: string;
  created_at?: string;
  is_featured?: boolean;
  likes?: number;
}
