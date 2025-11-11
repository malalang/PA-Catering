import Section from '@/components/ui/layout/Section';
import Image from 'next/image';

const OurJourney: React.FC = () => {
	return (
		<Section tittle='Our Journey to Central Eatery'>
			<Image
				src='/Central_Eatery_Logo.png'
				alt='logo'
				width={150}
				height={150}
				className='float-right'
			/>
			<p className='text-start'>
				Central Eatery PTY Ltd was established in 2024 by Kanny Molapo. Molapo identified a need in
				Lulekani for modern, affordable services that combined convenience and quality. This vision
				led to the concept of a dual-service establishment offering both delicious, budget-friendly
				meals and premium car care. Our journey is fueled by a commitment to providing a unique and
				valuable service to our community.
			</p>
		</Section>
	);
};

export default OurJourney;
