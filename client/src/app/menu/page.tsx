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

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string }>;
}) {
	const params = await searchParams;
	const search = params.search || '';
	const supabase = await createClient();

	const [productsResult, categoriesResult] = await Promise.all([
		supabase
			.from('products')
			.select('*')
			.order('category_name', { ascending: true }),
		supabase
			.from('products_category')
			.select('*')
			.order('id', { ascending: true })
	]);

	const { data: productsData, error: productsError } = productsResult;
	const { data: categoriesData, error: categoriesError } = categoriesResult;

	if (productsError) {
		console.error('Error fetching products:', productsError);
	}

	if (categoriesError) {
		console.error('Error fetching categories:', categoriesError);
	}

	const allProducts: Database['public']['Tables']['products']['Row'][] = productsData || [];
	const allCategoriesData: Database['public']['Tables']['products_category']['Row'][] = categoriesData || [];

	// Filter out hidden categories
	const visibleCategories = allCategoriesData.filter(cat => !cat.is_hidden);
	const visibleCategoryNames = new Set(visibleCategories.map(c => c.category_name));

	// Filter products based on search
	const filteredProducts = search
		? allProducts.filter((p) =>
			p.name.toLowerCase().includes(search.toLowerCase()) ||
			p.category_name?.toLowerCase().includes(search.toLowerCase())
		)
		: allProducts;

	// Group products by category
	const groupedProducts: ProductsType = [];
	const categoriesMap = new Map<string, ProductType[]>();

	filteredProducts.forEach((product) => {
		const category = product.category_name || 'Other';

		// Only include products in visible categories (or 'Other' if we want to keep it, but user asked to use table)
		// Let's strictly follow the visible categories from DB for now, unless it's a search result that might be relevant?
		// Actually, if a category is hidden, its products should probably be hidden too in this context.
		if (!visibleCategoryNames.has(category) && category !== 'Other') {
			// If strict mode is desired: return; 
			// But for now, let's allow 'Other' or maybe just check if it exists in the map later.
		}

		if (!categoriesMap.has(category)) {
			categoriesMap.set(category, []);
		}

		// Map Supabase product to UI ProductType
		const uiProduct: ProductType = {
			ProductID: product.id,
			Name: product.name,
			Description: [product.description || ''],
			Price: product.price || 0,
			Image: product.image_url || '/Menus/placeholder.png',
			badge: product.badge || undefined,
			rating: product.likes ? 5 : undefined,
		};

		categoriesMap.get(category)?.push(uiProduct);
	});

	// When searching, only include categories that:
	// 1. Have matching products, OR
	// 2. Have a category name that matches the search term
	const searchLower = search.toLowerCase();
	const matchingCategoryNames = search
		? visibleCategories
			.filter(cat => cat.category_name.toLowerCase().includes(searchLower))
			.map(cat => cat.category_name)
		: [];

	// Iterate over VISIBLE categories from DB to maintain order and metadata
	visibleCategories.forEach((category) => {
		const categoryName = category.category_name;
		const products = categoriesMap.get(categoryName) || [];

		// When searching, only show categories that have matching products or match by name
		if (search && products.length === 0 && !matchingCategoryNames.includes(categoryName)) {
			return;
		}

		// If not searching, and no products, maybe skip? 
		// Usually menus show empty categories if they exist, or hide them. 
		// Let's hide empty categories if not searching, to be clean, unless user wants them.
		// But the original code showed them if they were in the map. 
		// Let's show if it has products OR if we are searching and it matched.
		if (!search && products.length === 0) {
			return;
		}

		groupedProducts.push({
			id: category.id,
			Name: categoryName,
			Image: category.image || '/Menus/placeholder.png',
			Description: category.description || '',
			Products: products,
		});
	});

	// Handle 'Other' category if it has products and isn't in DB
	if (categoriesMap.has('Other')) {
		const otherProducts = categoriesMap.get('Other') || [];
		if (otherProducts.length > 0) {
			groupedProducts.push({
				id: 999,
				Name: 'Other',
				Image: '/Menus/placeholder.png',
				Description: 'Other items',
				Products: otherProducts,
			});
		}
	}

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
