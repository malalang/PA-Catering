import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import FilterSortBar from '@/app/menu/[Products]/components/FilterSortBar';
import Main from '@/components/ui/layout/Main';
import ProductCard from '../components/ProductCard';
import { createClient } from '@/lib/supabase/server';

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ Products: string }>;
	searchParams: Promise<{ sort?: string; minPrice?: string; maxPrice?: string }>;
}) {
	const { Products: categorySlug } = await params;
	const { sort = 'default', minPrice = '0', maxPrice = '1000' } = await searchParams;
	const supabase = await createClient();

	// Reconstruct category name from slug (e.g., "kota-meals" -> "kota meals")
	// This is a simple heuristic. For robust matching, we might need a slug column in DB.
	const categoryName = categorySlug.replace(/-/g, ' ');

	// Fetch products matching the category (case-insensitive)
	const { data: productsData, error } = await supabase
		.from('products')
		.select('*')
		.ilike('category_name', categoryName);

	if (error) {
		console.error('Error fetching products:', error);
	}

	type ProductRow = {
		id: string;
		name: string;
		description: string | null;
		price: number | null;
		image_url: string | null;
		badge: string | null;
		likes: number | null;
	};

	let products: ProductRow[] = (productsData as ProductRow[]) || [];

	// Map to UI ProductType
	let uiProducts: ProductType[] = products.map((p) => ({
		ProductID: p.id,
		Name: p.name,
		Description: [p.description || ''],
		Price: p.price || 0,
		Image: p.image_url || '/Menus/placeholder.png',
		badge: p.badge || undefined,
		rating: p.likes ? 5 : undefined,
	}));

	// Filter by price
	const min = Number(minPrice);
	const max = Number(maxPrice);
	uiProducts = uiProducts.filter((p) => p.Price >= min && p.Price <= max);

	// Sort products
	switch (sort) {
		case 'price-low':
			uiProducts.sort((a, b) => a.Price - b.Price);
			break;
		case 'price-high':
			uiProducts.sort((a, b) => b.Price - a.Price);
			break;
		case 'popularity':
			// Ideally fetch likes count from DB and sort there, or sort here if we have the data
			// For now, we can't easily sort by popularity without likes data joined.
			// Assuming 'likes' column in products table is the count.
			// If we mapped it to rating, we can use that, or fetch likes separately.
			// Let's assume p.likes is the count.
			uiProducts.sort((a, b) => {
				const likesA = products.find((p: ProductRow) => p.id === a.ProductID)?.likes || 0;
				const likesB = products.find((p: ProductRow) => p.id === b.ProductID)?.likes || 0;
				return likesB - likesA;
			});
			break;
		case 'name':
			uiProducts.sort((a, b) => a.Name.localeCompare(b.Name));
			break;
		default:
			break;
	}

	return (
		<>
			<Suspense fallback={<div className="h-12" />}>
				<FilterSortBar />
			</Suspense>
			<Main>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 content-stretch gap-2'>
					<Suspense fallback={<Loading message='Loading Products...' />}>
						{uiProducts.length > 0 ? (
							uiProducts.map((product) => (
								<ProductCard
									product={product}
									categoryName={categorySlug} // Use slug for links
									key={product.ProductID}
								/>
							))
						) : (
							<div className="col-span-full text-center py-10 text-white">
								<p>No products found in this category.</p>
							</div>
						)}
					</Suspense>
				</div>
			</Main>
		</>
	);
}
