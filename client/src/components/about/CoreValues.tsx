import { IoBulbOutline, IoShieldCheckmarkOutline, IoPeopleOutline } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const CoreValues: React.FC = () => {
	return (
		<Section tittle='Our Core Values'>
			<div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-2  text-center'>
				<article>
					<Icon
						icon={IoBulbOutline}
						heading='Innovation'
					/>
					<p>We constantly seek new ways to enhance our services and customer experience.</p>
				</article>
				<article>
					<Icon
						icon={IoShieldCheckmarkOutline}
						heading='Quality'
					/>
					<p>We are committed to providing high-quality food and exceptional car wash services.</p>
				</article>
				<article>
					<Icon
						icon={IoPeopleOutline}
						heading='Community Trust'
					/>
					<p>
						We aim to build strong relationships with our customers and contribute positively to the
						Lulekani community.
					</p>
				</article>
			</div>
		</Section>
	);
};

export default CoreValues;
