'use client';
import React from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { FaCreditCard, FaPlus } from 'react-icons/fa';

import { useAuth } from '@/lib/supabase/auth/useAuth';
import { useRouter } from 'next/navigation';
import Section from '@/components/ui/layout/Section';

const PaymentInformation: React.FC = () => {
	const { user } = useAuth();
	if (!user) {
		return null;
	}
	return (
		<Section
			Icon={FaCreditCard}
			tittle='Payment Information'>
			<article className='mt-6 space-y-4'>
				<p className='text-white/60 italic'>Payment method management coming soon.</p>
				<Button
					variant='primary'
					className='w-full flex items-center justify-center'>
					<FaPlus className='mr-2' />
					Add New Card
				</Button>
			</article>
		</Section>
	);
};

export default PaymentInformation;
