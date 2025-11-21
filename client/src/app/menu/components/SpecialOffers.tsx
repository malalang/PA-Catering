import Section from '@/components/ui/layout/Section';

const SpecialOffers: React.FC = () => {
	return (
		<Section tittle='	Special Offers'>
			<article>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Offer 1 */}
					<div className='bg-black/50 border border-yellow-500 rounded-md p-2 flex flex-col'>
						<div className='bg-yellow-700 rounded-md p-6 flex flex-col h-full'>
							<h3
								className='text-xl font-bold text-white mb-2'
								style={{ filter: 'drop-shadow(0 0 2px #f0b100)' }}>
								Weekend Promotion
							</h3>
							<p className='text-white flex-grow'>
								Get a Free Pork Plate with Every Photo boot on Saturdays and Sundays!
							</p>
						</div>
					</div>
					{/* Offer 2 */}
					<div className='bg-black/50 border border-yellow-500 rounded-md p-2 flex flex-col'>
						<div className='bg-yellow-700 rounded-md p-6 flex flex-col h-full'>
							<h3
								className='text-xl font-bold text-white mb-2'
								style={{ filter: 'drop-shadow(0 0 2px #f0b100)' }}>
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
