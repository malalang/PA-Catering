import Icon from '@/components/ui/Icon';
import { FaCar, FaSprayCan, FaPlusCircle } from 'react-icons/fa';
import Section from '../ui/layout/Section';

interface ServiceCardProps {
	title: string;
	children: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, children }) => (
	<li className='m-0 p-0'>
		<article>
			<h3>{title}</h3>
			<div className='text-white flex-grow'>{children}</div>
		</article>
	</li>
);

const ServicesOffered: React.FC = () => {
	return (
		<Section
			tittle='Our Services'
			Icon={FaCar}>
			<ul className='grid grid-cols-1 md:grid-cols-2 text-start'>
				<ServiceCard title='Small Car Wash'>
					<p>
						A thorough cleaning for compact vehicles, including a meticulous exterior wash,
						hand-drying for a spot-free finish, basic interior vacuuming, and a window clean inside
						and out.
					</p>
				</ServiceCard>
				<ServiceCard title='SUV Wash'>
					<p>
						A comprehensive clean for larger vehicles, featuring a detailed exterior wash, thorough
						hand-drying, full interior vacuuming (including seats and mats), and an interior
						wipe-down.
					</p>
				</ServiceCard>
				<ServiceCard title='Taxi Wash'>
					<p>
						A specialized service focusing on efficiency and cleanliness. Includes a quick yet
						effective exterior wash, hand-dry, basic interior vacuuming, and window cleaning to get
						taxis back on the road quickly.
					</p>
				</ServiceCard>
				<ServiceCard title='Premium Add-Ons'>
					<ul className='space-y-3'>
						<li className='flex items-start'>
							<FaPlusCircle className='text-red-500 mt-1 mr-3 flex-shrink-0' />
							<span>
								<strong className='text-white'>Tire Shine (R20):</strong> Add a brilliant shine to
								your tires.
							</span>
						</li>
						<li className='flex items-start'>
							<FaPlusCircle className='text-red-500 mt-1 mr-3 flex-shrink-0' />
							<span>
								<strong className='text-white'>Interior Fragrance (R30):</strong> Leave your car
								smelling fresh and inviting.
							</span>
						</li>
					</ul>
				</ServiceCard>
			</ul>
			<p className='mt-12 text-center text-lg text-white max-w-3xl mx-auto'>
				At Central Eatery Car Wash, we are committed to providing a high-quality clean that adds a
				touch of luxury to your vehicle, all at competitive prices.
			</p>
		</Section>
	);
};

export default ServicesOffered;
