import { IoSparkles, IoCalendar, IoPeople, IoFastFood } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const WhatMakesUsSpecial: React.FC = () => {
	return (
		<Section tittle='What Makes Us Special?'>
			<div className='grid grid-cols-1 md:grid-cols-2  gap-2 gap-2 '>
				<article>
					<Icon
						icon={IoSparkles}
						heading='Modern Facilities'
					/>
					<p className='text-center'>
						Unlike competitors, Central Eatery boasts up-to-date facilities for both our eatery and
						car wash, ensuring a higher standard of service and a more comfortable experience for
						our customers.
					</p>
				</article>
				<article>
					<Icon
						icon={IoCalendar}
						heading='Digital Booking System'
					/>

					<p className='text-center'>
						We offer a convenient digital booking system, allowing you to easily schedule car washes
						and potentially food orders, saving you time and providing a seamless experience that
						our competitors don&apos;t.
					</p>
				</article>
				<article>
					<Icon
						icon={IoPeople}
						heading='Multidisciplinary Expertise'
					/>
					<p className='text-center'>
						Our leadership team possesses diverse expertise, from industrial engineering to design
						and business management, enabling us to optimize operations, enhance customer
						experience, and innovate in ways our competitors cannot.
					</p>
				</article>
				<article>
					<Icon
						icon={IoFastFood}
						heading='Dual-Service Convenience'
					/>
					<p className='text-center'>
						We offer the unique convenience of a high-quality eatery and a luxury car wash in one
						location, saving you time and effort compared to visiting separate establishments.
					</p>
				</article>
			</div>
		</Section>
	);
};

export default WhatMakesUsSpecial;
