import Section from '@/components/ui/layout/Section';

const SpecialOffers: React.FC = () => {
	return (
		<Section tittle='	Special Offers'>
			<article>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Offer 1 */}
					<div className='bg-black/50 border border-red-500 rounded-md p-2 flex flex-col'>
						<div className='bg-red-700 rounded-md p-6 flex flex-col h-full'>
							<h3
								className='text-xl font-bold text-white mb-2'
								style={{ filter: 'drop-shadow(0 0 2px #ff0000)' }}>
								Weekend Promotion
							</h3>
							<p className='text-white flex-grow'>
								Get a Free Pork Plate with Every Car Wash on Saturdays and Sundays!
							</p>
						</div>
					</div>
					{/* Offer 2 */}
					<div className='bg-black/50 border border-red-500 rounded-md p-2 flex flex-col'>
						<div className='bg-red-700 rounded-md p-6 flex flex-col h-full'>
							<h3
								className='text-xl font-bold text-white mb-2'
								style={{ filter: 'drop-shadow(0 0 2px #ff0000)' }}>
								Taxi Partnerships
							</h3>
							<p className='text-white flex-grow'>
								Bulk discounts available for taxi associations. For example, 10 washes = 1 free!
							</p>
						</div>
					</div>
				</div>
			</article>
		</Section>
	);
};

export default SpecialOffers;
