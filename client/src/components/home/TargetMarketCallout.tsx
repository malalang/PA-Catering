import { BiBullseye } from 'react-icons/bi';
import {
	IoHomeOutline,
	IoBriefcaseOutline,
	IoCarSportOutline,
	IoBusinessOutline,
} from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const TargetMarketCallout: React.FC = () => {
	const targetMarkets = [
		{
			id: 1,
			title: 'Residents of Lulekani',
			text: 'Catering to families, professionals, and students seeking convenient, high-quality meals and car care.',
			icon: IoHomeOutline,
		},
		{
			id: 2,
			title: 'People Who Work in the Area',
			text: 'Providing quick meal solutions and efficient car wash services for busy professionals and government workers.',
			icon: IoBriefcaseOutline,
		},
		{
			id: 3,
			title: 'Travelers Passing Through',
			text: 'A welcoming stop for travelers to rest and refresh with reliable meals and clean car wash services.',
			icon: IoCarSportOutline,
		},
		{
			id: 4,
			title: 'Local Businesses',
			text: 'Partnering with local businesses for catering services and fleet vehicle maintenance programs.',
			icon: IoBusinessOutline,
		},
	];

	return (
		<Section
			Icon={BiBullseye}
			tittle='Our Target Market'
			id='target-market'
			heading='Central Eatery is dedicated to serving the diverse needs of the Lulekani community and those passing through.'>
			<div className='grid grid-cols-1 md:grid-cols-2  gap-2'>
				{targetMarkets.map((market) => (
					<article
						key={market.id}
						className='flex flex-col items-center'>
						<Icon icon={market.icon} />
						<h3>{market.title}</h3>
						<p className='text-red-100 text-center'>{market.text}</p>
					</article>
				))}
			</div>
		</Section>
	);
};

export default TargetMarketCallout;
