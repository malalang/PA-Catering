'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

import Image from 'next/image';
import { FaImages } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const ImageModal = dynamic(() => import('./ImageModal'), { ssr: false, loading: () => null });
import Section from '@/components/ui/layout/Section';

type ProductRow = {
	id: string;
	name: string;
	description: string | null;
	price: number | null;
	image_url: string | null;
	badge: string | null;
	likes: number | null;
};

const ImageGallery: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [product, setproduct] = useState<ProductType | null>(null);
	const [allProducts, setAllProducts] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState(true);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from('products')
				.select('*');

			if (error) {
				console.error('Error fetching products:', error);
				setLoading(false);
				return;
			}

			const products: ProductType[] = ((data as ProductRow[]) || []).map((p) => ({
				ProductID: p.id,
				Name: p.name,
				Description: [p.description || ''],
				Price: p.price || 0,
				Image: p.image_url || '/Menus/placeholder.png',
				badge: p.badge || undefined,
				rating: p.likes ? 5 : undefined,
			}));

			setAllProducts(products);
			setLoading(false);
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		if (!modalOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setModalOpen(false);
			if (e.key === 'Tab' && modalRef.current) {
				const focusable = modalRef.current.querySelectorAll<HTMLElement>(
					'button, [tabindex]:not([tabindex="-1"])'
				);
				if (focusable.length === 0) return;
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				} else if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [modalOpen]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) setModalOpen(false);
	};

	const openModal = (product: ProductType) => {
		setproduct(product);
		setModalOpen(true);
	};

	if (loading) {
		return (
			<Section Icon={FaImages} tittle='Gallery'>
				<div className='text-center py-10 text-white'>Loading gallery...</div>
			</Section>
		);
	}

	return (
		<Section
			Icon={FaImages}
			tittle='Gallery'>
			<div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-8'>
				{allProducts.map(
					(product) =>
						product.Image && (
							<article
								key={product.Name}
								className='group cursor-pointer break-inside-avoid relative w-full mb-4 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10'
								tabIndex={0}
								aria-label={`Show full image of ${product.Name}`}
								onClick={() => openModal(product)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										openModal(product);
									}
								}}>
								<Image
									src={product.Image}
									alt={`${product.Name} gallery image`}
									className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110'
									width={500}
									height={500}
									sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
								/>
								<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
									<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center">
										<p className="text-white font-bold tracking-wider font-small-caps">{product.Name}</p>
										<div className="w-8 h-0.5 bg-amber-500 mx-auto mt-2"></div>
									</div>
								</div>
							</article>
						)
				)}
			</div>
			{modalOpen && product && (
				<ImageModal
					product={product}
					handleBackdropClick={handleBackdropClick}
					setModalOpen={setModalOpen}
				/>
			)}
		</Section>
	);
};

export default ImageGallery;
