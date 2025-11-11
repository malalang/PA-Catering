import Section from '@/components/ui/layout/Section';

const OperatingHours: React.FC = () => {
	return (
		<Section tittle='Operating Hours:'>
			<div className='mt-2 space-y-4'>
				<article>
					<h3 className='text-lg font-semibold'>Eatery</h3>
					<ul>
						<li>
							<strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM
						</li>
						<li>
							<strong>Saturday:</strong> 8:00 AM - 9:00 PM
						</li>
						<li>
							<strong>Sunday:</strong> 8:00 AM - 8:00 PM
						</li>
					</ul>
				</article>
				<article>
					<h3 className='text-lg font-semibold'>Car Wash</h3>
					<ul>
						<li>
							<strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM
						</li>
						<li>
							<strong>Saturday:</strong> 8:00 AM - 6:00 PM
						</li>
						<li>
							<strong>Sunday:</strong> Closed
						</li>
					</ul>
				</article>
			</div>
		</Section>
	);
};

export default OperatingHours;
