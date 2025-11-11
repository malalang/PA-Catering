import Section from '@/components/ui/layout/Section';
import Image from 'next/image';
import { IoShieldCheckmark } from 'react-icons/io5';

const OurCommitment: React.FC = () => {
	return (
		<Section
			Icon={IoShieldCheckmark}
			heading='At Central Eatery PTY Ltd, we are committed to providing a premium experience in both our
					food service and car care offerings. We strive to be your convenient and affordable
					destination, delivering quality meals and luxurious car washes. Our goal is to build
					community trust through innovation and exceptional service in Lulekani.'
			tittle='Our Commitment'>
			<Image
				alt='logo'
				height={300}
				width={300}
				src='/Central_Eatery_Logo.png'
			/>
		</Section>
	);
};

export default OurCommitment;
