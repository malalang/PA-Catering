'use client';
import React, { useState, useRef, useEffect } from 'react';
import Products from '@/context/Products';

import Image from 'next/image';
import { FaImages } from 'react-icons/fa';
import ImageModal from './ImageModal';
import Section from '@/components/ui/layout/Section';

const ImageGallery: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [product, setproduct] = useState<ProductType | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);

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

	const allProducts = Products.map((p) => p.Products).flat();

	return (
		<Section
			Icon={FaImages}
			tittle='Gallery'>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6'>
				{allProducts.map(
					(product) =>
						product.Image && (
							<article
								key={product.Name}
								className='group cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-red-500
								relative w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden transition-transform duration-300 m-0 p-2 group-hover:scale-105'
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
									className='object-contain transition-all duration-300 group-hover:brightness-110'
									width={500}
									height={500}
									sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
								<p className='absolute bottom-2 left-2 right-2 truncate text-center bg-black/70 px-2 py-1 rounded-full text-xs font-bold text-white'>
									{product.Name}
								</p>
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
