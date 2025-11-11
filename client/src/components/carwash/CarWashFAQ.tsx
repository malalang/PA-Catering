'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

import Icon from '@/components/ui/Icon';
import Section from '../ui/layout/Section';

const faqs = [
	{
		question: `How long does a wash take?`,
		answer: `A standard exterior wash typically takes about 15-20 minutes. For our full-service packages, which include interior cleaning and detailing, please allow for 45-60 minutes. Times may vary slightly depending on how busy we are.`,
	},
	{
		question: `What products do you use?`,
		answer: `We are committed to quality and use only premium, eco-friendly cleaning solutions from trusted brands. Our products are tough on dirt but gentle on your vehicle's paint, ensuring a brilliant shine without any damage.`,
	},
	{
		question: `Do I need an appointment?`,
		answer: `While we gladly accept drive-ins, appointments are highly recommended for our comprehensive detailing packages to ensure we can give your vehicle the dedicated time and attention it deserves. You can book an appointment online or by calling us.`,
	},
];

interface FAQItemProps {
	faq: { question: string; answer: string };
	isOpen: boolean;
	onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onClick }) => (
	<div className='border-b border-white/10'>
		<button
			className='w-full flex justify-between items-center text-left py-5'
			onClick={onClick}>
			<span className='text-lg font-medium text-white'>{faq.question}</span>
			<FaChevronDown
				className={`transform transition-transform duration-300 text-red-500 ${
					isOpen ? 'rotate-180' : ''
				}`}
			/>
		</button>
		<div
			className={`overflow-hidden transition-all duration-300 ease-in-out ${
				isOpen ? 'max-h-screen' : 'max-h-0'
			}`}>
			<p className='pt-0 pb-5 text-white'>{faq.answer}</p>
		</div>
	</div>
);

const CarWashFAQ: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<Section
			Icon={FaQuestionCircle}
			tittle='Frequently Asked Questions'>
			<article>
				<div className='max-w-3xl mx-auto'>
					{faqs.map((faq, index) => (
						<FAQItem
							key={index}
							faq={faq}
							isOpen={activeIndex === index}
							onClick={() => toggleFAQ(index)}
						/>
					))}
				</div>
			</article>
		</Section>
	);
};

export default CarWashFAQ;
