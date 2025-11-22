import { createClient } from '@/lib/supabase/client';

export interface ProductLikes {
  [productKey: string]: {
    likes: number;
  };
}

export const fetchAllProductLikes = async (productKeys: string[]): Promise<ProductLikes> => {
  const likesData: ProductLikes = {};
  const supabase = createClient();
  
  try {
    // Fetch likes data for each product from Supabase
    const promises = productKeys.map(async (productKey) => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('likes')
          .eq('id', productKey)
          .single();
        
        if (!error && data) {
          // @ts-ignore - Supabase type inference issue with Database types
          likesData[productKey] = { likes: data.likes || 0 };
        } else {
          likesData[productKey] = { likes: 0 };
        }
      } catch (err) {
        likesData[productKey] = { likes: 0 };
      }
    });
    
    await Promise.all(promises);
    return likesData;
  } catch (error) {
    console.error('Error fetching product likes:', error);
    // Return default values if there's an error
    productKeys.forEach(productKey => {
      likesData[productKey] = { likes: 0 };
    });
    return likesData;
  }
}; 
 