import { Suspense } from 'react';
import ImageGallery from '@/app/gallery/components/ImageGallery';
import Loading from '@/components/ui/Loading';
// import PromotionsBanner from '@/app/menu/components/PromotionsBanner';
import MenuSections from '@/app/menu/components/MenuSections';
import Main from '@/components/ui/layout/Main';
import { CgMenuCheese } from 'react-icons/cg';
import SearchBar from './components/SearchBar';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/types/database.types';

// Category metadata mapping to preserve UI richness
const CATEGORY_METADATA: Record<string, { Image: string; Description: string; id: number }> = {
	'Meals': { id: 1, Image: "/Menus/BurgerMeal.png", Description: "Wholesome combo meals including flavorful mains, crispy sides, and refreshing drinks." },
	'Kota Meals': { id: 2, Image: "/Menus/KotaMeal.png", Description: "Our most loved Kota creations, packed with bold local flavor." },
	'Kota': { id: 3, Image: "/Menus/Kota.png", Description: "Traditional South African bread rolls stuffed with savory toppings." },
	'Chips': { id: 4, Image: "/Menus/Chips.png", Description: "Perfectly fried golden chips, available in three sizes." },
	'Beverages': { id: 5, Image: "/Menus/Drinks.png", Description: "A curated selection of cold beverages to quench your thirst." },
	'Pizza': { id: 6, Image: "/Menus/mexicanChilli.png", Description: "Oven-baked pizzas topped with rich sauces and generous layers of cheese." },
	'Salads': { id: 7, Image: "/Menus/salad1.jpg", Description: "Fresh and healthy salads." },
	'Burgers': { id: 8, Image: "/Menus/burger1.jpg", Description: "Juicy burgers with premium ingredients." },
};

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string }>;
}) {
	const params = await searchParams;
	const search = params.search || '';
	const supabase = await createClient();

	const { data: productsData, error } = await supabase
		.from('products')
		.select('*')
		.order('category_name', { ascending: true });

	if (error) {
		console.error('Error fetching products:', error);
		// Handle error appropriately, maybe show error message
	}

	const allProducts: Database['public']['Tables']['products']['Row'][] = productsData || [];

	// Filter products based on search
	const filteredProducts = search
		? allProducts.filter((p) =>
			p.name.toLowerCase().includes(search.toLowerCase()) ||
			p.category_name?.toLowerCase().includes(search.toLowerCase())
		)
		: allProducts;

	// Get unique category names from all products (for metadata lookup)
	const allCategories = new Set(allProducts.map(p => p.category_name || 'Other'));

	// Group products by category
	const groupedProducts: ProductsType = [];
	const categoriesMap = new Map<string, ProductType[]>();

	filteredProducts.forEach((product) => {
		const category = product.category_name || 'Other';
		if (!categoriesMap.has(category)) {
			categoriesMap.set(category, []);
		}

		// Map Supabase product to UI ProductType
		const uiProduct: ProductType = {
			ProductID: product.id, // Assuming Supabase ID is UUID, but UI uses string
			Name: product.name,
			Description: [product.description || ''], // UI expects array of strings
			Price: product.price || 0,
			Image: product.image_url || '/Menus/placeholder.png', // Fallback image
			badge: product.badge || undefined, // Add badge logic if needed
			rating: product.likes ? 5 : undefined, // Placeholder rating logic
		};

		categoriesMap.get(category)?.push(uiProduct);
	});

	// When searching, only include categories that:
	// 1. Have matching products, OR
	// 2. Have a category name that matches the search term
	const searchLower = search.toLowerCase();
	const matchingCategoryNames = search
		? Array.from(allCategories).filter(catName =>
			catName.toLowerCase().includes(searchLower)
		)
		: [];

	// Construct ProductsType array - only include matching categories when searching
	const categoriesToShow = search
		? new Set([...categoriesMap.keys(), ...matchingCategoryNames])
		: allCategories;

	categoriesToShow.forEach((categoryName) => {
		const products = categoriesMap.get(categoryName) || [];

		// When searching, only show categories that have matching products or match by name
		if (search && products.length === 0 && !matchingCategoryNames.includes(categoryName)) {
			return;
		}

		const metadata = CATEGORY_METADATA[categoryName] || {
			id: 99,
			Image: '/Menus/placeholder.png',
			Description: 'Delicious food category',
		};

		groupedProducts.push({
			id: metadata.id,
			Name: categoryName,
			Image: metadata.Image,
			Description: metadata.Description,
			Products: products,
		});
	});

	// Sort categories by ID if available to maintain order
	groupedProducts.sort((a, b) => a.id - b.id);

	// Create a map of product ID to category slug for search results
	const productCategoryMap = new Map<string, string>();
	if (search) {
		filteredProducts.forEach((product) => {
			const category = product.category_name || 'Other';
			// Convert category name to slug (e.g., "Kota Meals" -> "kota-meals")
			const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
			productCategoryMap.set(product.id, categorySlug);
		});
	}

	return (
		<>
			<Suspense fallback={<div className="h-12" />}>
				<SearchBar />
			</Suspense>
			<Main
				tittle='Menu'
				Icon={CgMenuCheese}
				heading='Every Bite Matters'>
				<Suspense fallback={<Loading message='Loading Menu Sections...' />}>
					<MenuSections
						categories={groupedProducts}
						matchingProducts={search ? filteredProducts.map(p => ({
							ProductID: p.id,
							Name: p.name,
							Description: [p.description || ''],
							Price: p.price || 0,
							Image: p.image_url || '/Menus/placeholder.png',
							badge: p.badge || undefined,
							rating: undefined
						})) : []}
						productCategoryMap={search ? productCategoryMap : undefined}
						isSearching={!!search}
					/>
				</Suspense>
				<Suspense fallback={<Loading message='Loading Image Gallery Sections...' />}>
					<ImageGallery />
				</Suspense>
			</Main>
			{/* <PromotionsBanner /> */}
		</>
	);
}
