declare global {
  interface nutritionalInfo {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sugar: string;
  }

  interface ProductType {
    ProductID: string;
    Name: string;
    Description: string[];
    Price: number;
    Image?: string;
    badge?: string;
    rating?: number;
    nutritional?: nutritionalInfo;
    allergens?: string[];
    isVegetarian?: boolean;
    isSpicy?: boolean;
  }

  type ProductsType = {
    id: number;
    Name: string;
    Products: ProductType[];
    Image?: string;
    Description?: string;
  }[];
}
export { };