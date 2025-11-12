export interface ItemType {
  id: string;
  name: string;
  Size: "12x12×1,5" | "10×10×1,5" | "5×5×2.5" | "5×7×2.5" | "8×5×3" | '300mmx300mm' | "5 liter" | "1.25 liter" | "1 liter" | "750ml" | "500ml" | "400ml" | "375ml" | "10kg" | "5kg" | "4kg" | "1kg" | "900g" | "500g" | "300g" | undefined;
  category: 'Meats' | 'Vagetable and Fruits' | 'Bakery' | 'Dairy' | 'Pantry' | 'Spices' | 'Soda' | 'Water' | 'Packaging' | 'Utensils' | 'Sauces' | 'Cleaning' | 'Appliances' | 'Other';
}

export interface ItemGroup {
  name: 'Food' | 'Beverages' | 'Packaging & Supplies' | 'Sauces & Condiments' | 'Kitchen Supplies';
  items: ItemType[];
}

const itemGroups: ItemGroup[] = [
  {
    name: 'Food',
    items: [
      // Meats
      { id: 'beef_patties', name: 'Beef Patties', category: 'Meats', Size: "1kg" },
      { id: 'chicken_patties', name: 'Chicken Patties', category: 'Meats', Size: "1kg" },
      { id: 'chicken_fillets', name: 'Chicken Fillets', category: 'Meats', Size: '1kg' },
      { id: 'chicken_wings', name: 'Chicken Wings', category: 'Meats', Size: "5kg" },
      { id: 'hake', name: 'Hake', category: 'Meats', Size: "4kg" },
      { id: 'russian', name: 'Russian', category: 'Meats', Size: "1kg" },
      { id: 'Palony', name: 'Palony', category: 'Meats', Size: "1kg" },
      { id: 'wors', name: 'Wors', category: 'Meats', Size: "1kg" },

      // Vagetable and Fruits
      { id: 'tomatoes', name: 'Tomatoes', category: 'Vagetable and Fruits', Size: undefined },
      { id: 'onions', name: 'Onions', category: 'Vagetable and Fruits', Size: "10kg" },
      { id: 'lemons', name: 'Lemons', category: 'Vagetable and Fruits', Size: undefined },
      { id: 'lettuce', name: 'Lettuce', category: 'Vagetable and Fruits', Size: "500g" },
      { id: 'pineapples', name: 'Pineapples', category: 'Vagetable and Fruits', Size: "500g" },
      { id: 'potatoes', name: 'Potatoes', category: 'Vagetable and Fruits', Size: "10kg" },
      { id: 'peppers', name: 'Peppers', category: 'Vagetable and Fruits', Size: undefined },

      // Bakery
      { id: 'buns', name: 'Buns', category: 'Bakery', Size: undefined },
      { id: 'bread', name: 'Bread', category: 'Bakery', Size: '500g' },

      // Dairy
      { id: 'cheese', name: 'Cheese', category: 'Dairy', Size: "900g" },
      { id: 'eggs', name: 'Eggs', category: 'Dairy', Size: undefined },

      // Pantry
      { id: 'flour', name: 'Flour', category: 'Pantry', Size: "5kg" },
      { id: 'instant_dry_yeast', name: 'Instant Dry Yeast', category: 'Pantry', Size: "500g" },

      // Spices
      { id: 'chips_spice', name: 'Chips Spice', category: 'Spices', Size: '500g' },
      { id: 'egg_yellow_spice', name: 'Egg Yellow Spice', category: 'Spices', Size: '500g' }
    ]
  },
  {
    name: 'Beverages',
    items: [
      { id: 'coca_cola_coko_400ml', name: 'Coca Cola Coko 400ml', category: 'Soda', Size: "400ml" },
      { id: 'coca_cola_mixed_400ml', name: 'Coca Cola Mixed 400ml', category: 'Soda', Size: "400ml" },
      { id: 'coca_cola_coko_1250ml', name: 'Coca Cola Coko 1.25L', category: 'Soda', Size: "1.25 liter" },
      { id: 'coca_cola_mixed_1250ml', name: 'Coca Cola Mixed 1.25L', category: 'Soda', Size: "1.25 liter" },
      { id: 'cappy', name: 'Cappy', category: 'Soda', Size: "500ml" },
      { id: 'still_water', name: 'Still Water', category: 'Water', Size: "500ml" },
      { id: 'still_water', name: 'Still Water', category: 'Water', Size: "1 liter" },
      { id: 'ice_cubes', name: 'Ice Cubes', category: 'Other', Size: "1 liter" }
    ]
  },
  {
    name: 'Packaging & Supplies',
    items: [
      { id: 'pizza_medium_box', name: 'Pizza Medium Box', category: 'Packaging', Size: "12x12×1,5" },
      { id: 'pizza_large_box', name: 'Pizza Large Box', category: 'Packaging', Size: "10×10×1,5" },
      { id: 'chips_small_box', name: 'Chips Small Box', category: 'Packaging', Size: "5×5×2.5" },
      { id: 'chips_medium_box', name: 'Chips Medium Box', category: 'Packaging', Size: "5×7×2.5" },
      { id: 'chips_large_box', name: 'Chips Large Box', category: 'Packaging', Size: "8×5×3" },
      { id: 'packaging_paper_bugs', name: 'Packaging paper bugs (GP 2)', category: 'Packaging', Size: undefined },
      { id: 'customer_plastic_bag', name: 'Customer Plastic Bag', category: 'Packaging', Size: undefined },
      { id: 'sosatie_stick_thin', name: 'Sosatie Stick Thin', category: 'Utensils', Size: undefined },
      { id: 'Serviettes', name: 'Serviettes', category: 'Utensils', Size: '300mmx300mm' }
    ]
  },
  {
    name: 'Sauces & Condiments',
    items: [
      { id: 'chill_sauce', name: 'Chill Sauce', category: 'Sauces', Size: "5 liter" },
      { id: 'sweet_sticky_marinade', name: 'Sweet & Sticky Marinade', category: 'Sauces', Size: "750ml" },
      { id: 'burger_relish_sauce', name: 'Burger Relish Sauce', category: 'Sauces', Size: '375ml' },
      { id: 'top_bbq_sauce', name: 'Top BBQ Sauce', category: 'Sauces', Size: "5 liter" },
      { id: 'top_tomato_sauce', name: 'Top Tomato Sauce', category: 'Sauces', Size: "5 liter" },
      { id: 'peri_peri', name: 'Peri-Peri', category: 'Sauces', Size: undefined },
      { id: 'top_peri_peri_sauce', name: 'Top Peri-Peri Sauce', category: 'Sauces', Size: "5 liter" },
      { id: 'mustard_sauce', name: 'Mustard Sauce', category: 'Sauces', Size: "5 liter" },
      { id: 'vinegar', name: 'Vinegar', category: 'Other', Size: "5 liter" },
      { id: 'cooking_oil', name: 'Cooking Oil', category: 'Other', Size: "5 liter" }
    ]
  },
  {
    name: 'Kitchen Supplies',
    items: [
      { id: 'refuse_bag', name: 'Refuse Bag', category: 'Cleaning', Size: undefined },
      { id: 'steel Wool', name: 'Steel Wool', category: 'Cleaning', Size: undefined },
      { id: 'dishwasher', name: 'Dishwasher', category: 'Appliances', Size: '750ml' }
    ]
  }
];

export default itemGroups; 