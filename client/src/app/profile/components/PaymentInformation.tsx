'use client';
import React from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { FaCreditCard, FaPlus } from 'react-icons/fa';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Section from '@/components/ui/layout/Section';

const PaymentInformation: React.FC = () => {
	const { user } = useUser();
	if (!user) {
		return null;
	}
	return (
		<Section
			Icon={FaCreditCard}
			tittle='Payment Information'>
			<article className='mt-6 space-y-4'>
				{user.savedPaymentMethods?.length === 0 ? (
					<p className='text-white/60 italic'>No saved payment methods.</p>
				) : (
					user.savedPaymentMethods?.map((method, index) => (
						<div
							key={index}
							className='bg-black/30 p-4 rounded-md flex justify-between items-center'>
							<div>
								<p className='font-semibold'>
									{method.type} **** {method.last4}
								</p>
								<p className='text-sm text-white/70'>Expires {method.expiry}</p>
							</div>
							{/* <Button variant="secondary" size="sm">Remove</Button> */}
						</div>
					))
				)}
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
