import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import { IoEye } from 'react-icons/io5';

const OurVision: React.FC = () => {
	return (
		<Section
			Icon={IoEye}
			tittle='Our Vision'>
			<article>
				<p className='text-center '>
					<strong>Our vision</strong> is to become Lulekani&apos;s premier destination for
					affordable, high-quality meals and competitively priced luxury car washes, driven by
					innovation, quality, and community trust.
				</p>
			</article>
		</Section>
	);
};

export default OurVision;
