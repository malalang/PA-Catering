import Image from 'next/image';
import SocialButtons from '../components/SocialButtons';
import Comments from './components/comments';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';
import FavoriteButton from './components/FavoriteButton';
import AddtoCart from '@/app/menu/[Products]/[product]/components/AddtoCart';
import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';
import { createClient } from '@/lib/supabase/server';

async function ProductPage({ params }: { params: Promise<{ product: string; Products: string }> }) {
	const { product: productId, Products: categorySlug } = await params;
	const supabase = await createClient();

	// Reconstruct name from slug - handle both hyphens and spaces
	// The slug might be "coca-cola" but the DB has "Coca-Cola" or "Coca Cola"
	// We'll try multiple patterns to match both hyphens and spaces
	const productNameSlug = productId.replace(/-/g, ' ');
	const categoryName = categorySlug.replace(/-/g, ' ');

	// Fetch product
	type ProductRow = {
		id: string;
		name: string;
		description: string | null;
		price: number | null;
		image_url: string | null;
		badge: string | null;
		likes: number | null;
	};

	// Try multiple search patterns to handle hyphens in product names
	// PostgreSQL ilike uses SQL LIKE patterns, so we use % wildcards
	let productData = null;
	let error = null;

	// Strategy: Split slug into words and create flexible pattern
	// "coca-cola" -> ["coca", "cola"] -> pattern "%coca%cola%" 
	// This matches "Coca-Cola", "Coca Cola", "coca cola", etc.
	const words = productId.split('-').filter(w => w.length > 0);
	const flexiblePattern = words.length > 1
		? `%${words.join('%')}%`  // "%coca%cola%" matches both hyphens and spaces
		: `%${productId}%`;        // Single word, just use wildcards

	// Try flexible pattern first (handles hyphens, spaces, and case)
	const { data: patternMatch, error: patternError } = await supabase
		.from('products')
		.select('*')
		.ilike('name', flexiblePattern)
		.limit(10); // Get multiple matches to find the best one

	if (patternMatch && patternMatch.length > 0 && !patternError) {
		// If multiple matches, prefer exact match (with spaces or hyphens)
		const typedMatches = patternMatch as ProductRow[];
		const exactWithSpaces = typedMatches.find(p =>
			p.name.toLowerCase().replace(/[-\s]/g, ' ') === productNameSlug.toLowerCase()
		);
		const exactWithHyphens = typedMatches.find(p =>
			p.name.toLowerCase().replace(/[-\s]/g, '-') === productId.toLowerCase()
		);

		productData = exactWithSpaces || exactWithHyphens || typedMatches[0];
	} else {
		// Fallback: try exact match with spaces
		const { data: exactMatch, error: exactError } = await supabase
			.from('products')
			.select('*')
			.ilike('name', productNameSlug)
			.single();

		if (exactMatch && !exactError) {
			productData = exactMatch as ProductRow;
		} else {
			error = exactError || patternError;
		}
	}

	if (error || !productData) {
		return <div>Product not found</div>;
	}

	const product = productData as ProductRow;

	// Map to UI ProductType
	const productUI: ProductType = {
		ProductID: product.id,
		Name: product.name,
		Description: [product.description || ''],
		Price: product.price || 0,
		Image: product.image_url || '/Menus/placeholder.png',
		badge: product.badge || undefined,
		rating: product.likes ? 5 : undefined,
	};

	// Fetch related products (same category, exclude current)
	const { data: relatedData } = await supabase
		.from('products')
		.select('*')
		.ilike('category', categoryName)
		.neq('id', productUI.ProductID)
		.limit(4);

	const relatedProducts: ProductType[] = ((relatedData as ProductRow[]) || []).map((p) => ({
		ProductID: p.id,
		Name: p.name,
		Description: [p.description || ''],
		Price: p.price || 0,
		Image: p.image_url || '/Menus/placeholder.png',
		badge: p.badge || undefined,
		rating: p.likes ? 5 : undefined,
	}));

	return (
		<Main>
			{/* Main Product Section */}
			<Section>
				{/* Product Image */}
				{productUI.Image && (
					<div className=' flex justify-center items-start'>
						<div className='relative w-full max-w-md aspect-square bg-black/20 rounded-md shadow-lg overflow-hidden'>
							<Image
								src={productUI.Image}
								alt={productUI.Name}
								fill
								style={{ objectFit: 'contain' }}
								className='rounded-md'
							/>
						</div>
					</div>
				)}

				{/* Product Information */}

				<ProductInfo product={productUI} />

				{/* Action Buttons */}
				<div className='flex flex-wrap gap-4 mt-8'>
					<AddtoCart
						product={productUI}
						className='bg-black/50 hover:bg-yellow-500'>
						Add to Cart
					</AddtoCart>
					<FavoriteButton product={productUI} />
					<SocialButtons product={productUI} />
				</div>

			</Section>

			{/* Related Products */}
			<RelatedProducts
				currentProduct={productUI}
				categoryName={categorySlug}
				products={relatedProducts}
			/>

			{/* Comments Section */}

			<Comments product={productUI} />
		</Main>
	);
}

export default ProductPage;
