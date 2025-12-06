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
			title: 'Local Residents',
			text: 'Families, students, and neighbours seeking a premium yet accessible spot for dining and memories.',
			icon: IoHomeOutline,
		},
		{
			id: 2,
			title: 'Professionals',
			text: 'Efficient, high-quality service for government officials and corporate teams on the go.',
			icon: IoBriefcaseOutline,
		},
		{
			id: 3,
			title: 'Travellers',
			text: 'A refreshing sanctuary for those passing through Evander, offering rest and rejuvenation.',
			icon: IoCarSportOutline,
		},
		{
			id: 4,
			title: 'Local Business',
			text: 'Strategic partnerships for corporate catering and exclusive event hosting.',
			icon: IoBusinessOutline,
		},
	];

	return (
		<Section
			Icon={BiBullseye}
			tittle='Who We Serve'
			id='target-market'
			heading='Curated experiences for the diverse tapestry of the Evander community.'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{targetMarkets.map((market) => (
					<article
						key={market.id}
						className='group p-6 rounded-3xl bg-neutral-900/30 border border-white/5 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 flex flex-col items-center text-center'>
						<div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-amber-500/30">
							<market.icon className="text-3xl text-white/50 group-hover:text-amber-500 transition-colors" />
						</div>
						<h3 className="text-lg font-bold text-white mb-3 font-small-caps tracking-wide group-hover:text-amber-500 transition-colors">{market.title}</h3>
						<p className='text-white/60 text-sm leading-relaxed font-light'>{market.text}</p>
					</article>
				))}
			</div>
		</Section>
	);
};

export default TargetMarketCallout;
