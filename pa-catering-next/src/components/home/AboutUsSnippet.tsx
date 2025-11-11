import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import AppLink from '@/components/ui/Link';
import { IoInformationCircleOutline } from 'react-icons/io5';

const AboutUsSnippet: React.FC = () => {
	return (
		<Section
			Icon={IoInformationCircleOutline}
			tittle='About P.A Catering'
			heading='	P.A Catering aims to revolutionize convenience in Lulekani by offering both affordable, high-quality meals and competitively priced luxury car washes under one roof. Founded with a vision to be the premier destination for these combined services, we are driven by innovation, quality, and community trust.'>
			<div className='mt-6'>
				<AppLink
					variant='primary'
					href='/about'>
					Read More About Us...
				</AppLink>
			</div>
		</Section>
	);
};

export default AboutUsSnippet;
