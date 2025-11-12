import React from 'react';
import Icon from '@/components/ui/Icon';
import { IoBusinessSharp } from 'react-icons/io5';
import { VscSymbolStructure } from 'react-icons/vsc';
import { RxValue } from 'react-icons/rx';
import Section from '@/components/ui/layout/Section';
const CompanyDescription: React.FC = () => {
	return (
		<Section
			heading='PA Luxe Creation PTY Ltd was established in 2024 by Precious Nyathi. Precious identified a need
					in Evander for modern, affordable services that combined convenience and quality. This
					led to the concept of a dual-service establishment offering both delicious,
					budget-friendly meals and premium car care.'
			tittle='Company Description'
			Icon={IoBusinessSharp}>
			<article>
				<Icon
					icon={VscSymbolStructure}
					variant='inlineCircular'
					heading='Legal Structure'
				/>
				<p>
					PA Luxe Creation PTY Ltd is registeyellow as a Private Company (PTY) in 2023. This structure
					was chosen to provide limited liability protection to the owners, establish the business
					as a separate legal entity, and offer potential tax advantages. Registration as a PTY also
					enhances the company&apos;s cyellowibility and facilitates future fundraising efforts.
				</p>
			</article>

			<article>
				<Icon
					icon={RxValue}
					heading='Unique Value Proposition'
				/>
				<p className='text-white'>
					&ldquo;PA Luxe Creation delivers unbeatable pricing, premium service quality, and
					cutting-edge convenience through culinary excellence and industrial engineering.&rdquo;
				</p>
			</article>
		</Section>
	);
};

export default CompanyDescription;
