import Section from '@/components/ui/layout/Section';

const SpecialOffers: React.FC = () => {
	return (
		<Section tittle='Special Offers'>
			<article className='bg-red-700 p-6 rounded-md text-white'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Offer 1 */}
					<div className='bg-black/20 border border-white/50 rounded-md p-6 flex flex-col'>
						<h3 className='text-xl font-bold text-white mb-2'>Weekend Promotion</h3>
						<p className='text-white flex-grow'>
							Get a Free Pork Plate with Every Car Wash on Saturdays and Sundays!
						</p>
					</div>
					{/* Offer 2 */}
					<div className='bg-black/20 border border-white/50 rounded-md p-6 flex flex-col'>
						<h3 className='text-xl font-bold text-white mb-2'>Taxi Partnerships</h3>
						<p className='text-white flex-grow'>
							Bulk discounts available for taxi associations. For example, 10 washes = 1 free!
						</p>
					</div>
				</div>
			</article>
		</Section>
	);
};

export default SpecialOffers;
