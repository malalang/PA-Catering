import Image from 'next/image';
import Link from '@/components/ui/Link';
import Section from '@/components/ui/layout/Section';
import Main from '@/components/ui/layout/Main';
import Button from '@/components/ui/Button';
import { BiCamera, BiCheckCircle } from 'react-icons/bi';
import { FiFilm } from 'react-icons/fi';
import { PlaceHolderImages } from './placeholderImages';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

interface PricingPackage {
	hours: number | string;
	price: number | string;
	features: string[];
}

interface EventType {
	name: string;
	imageId: string;
	description: string;
}

const PhotoBoothPage = () => {
	const heroImage = getImage('hero');
	const service360Image = getImage('service-360-booth');
	const serviceRedCarpetImage = getImage('service-red-carpet');

	const eventTypes: EventType[] = [
		{
			name: 'Graduations',
			imageId: 'event-graduations',
			description: 'Graduates celebrating at a party.',
		},
		{
			name: 'Weddings',
			imageId: 'event-weddings',
			description: 'A wedding reception with guests dancing.',
		},
		{
			name: 'Baby Showers',
			imageId: 'event-baby-showers',
			description: 'Decorations at a baby shower.',
		},
		{
			name: 'School Events',
			imageId: 'event-school-events',
			description: 'Students at a school dance.',
		},
		{
			name: 'Birthdays',
			imageId: 'event-birthdays',
			description: 'A lively birthday party.',
		},
	];

	const pricingPackages: PricingPackage[] = [
		{
			hours: 2,
			price: 2500,
			features: [
				'2 Hours rental',
				'Unlimited videos',
				'Online gallery',
				'On-site attendant',
			],
		},
		{
			hours: 3,
			price: 3500,
			features: ['3 Hours rental', 'Everything in 2hr', 'Custom overlay', 'Fun props'],
		},
		{
			hours: 4,
			price: 4500,
			features: [
				'4 Hours rental',
				'Everything in 3hr',
				'VIP red carpet',
				'Stanchions',
			],
		},
		{
			hours: '8+',
			price: 'Custom',
			features: ['Full day coverage', 'All features included', 'Custom branding', 'Priority support'],
		},
	];

	return (
		<Main>
			{/* Hero Section */}
			<Section tittle='Capture Every Angle in Style' className='flex flex-col items-center text-center'>
				{heroImage && (
					<div className='relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden'>
						<Image
							src={heroImage.imageUrl}
							alt={heroImage.description}
							fill
							className='object-cover'
							priority
							data-ai-hint={heroImage.imageHint}
						/>
					</div>
				)}
				<p className='mt-4 text-lg max-w-2xl text-white/80'>
					The ultimate 360° photo booth and red carpet experience for unforgettable events.
				</p>
				<Link variant='button' href='#services' className='mt-6 flex items-center gap-2'>
					<BiCamera />
					<span>Explore Our Services</span>
				</Link>
			</Section>

			{/* Services Section */}
			<Section tittle='Our Premium Services' heading='Professional rental services to make your event unforgettable'>
				<div className='grid gap-6 md:grid-cols-2 mt-8'>
					<div className='bg-black/30 border border-yellow-500/20 rounded-md overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300'>
						{service360Image && (
							<div className='relative w-full h-48 md:h-64'>
								<Image
									src={service360Image.imageUrl}
									alt={service360Image.description}
									fill
									className='object-cover'
									data-ai-hint={service360Image.imageHint}
								/>
							</div>
						)}
						<div className='p-6'>
							<h3 className='flex items-center gap-3 text-2xl font-semibold text-yellow-500'>
								<BiCamera className='text-white' /> 360 Photo Booth
							</h3>
							<p className='mt-3 text-white/80'>
								Our state-of-the-art 360 photo booth captures slow-motion videos from every angle. Guests
								stand on a platform while a revolving camera spins around them, creating stunning, shareable
								content.
							</p>
						</div>
					</div>

					<div className='bg-black/30 border border-yellow-500/20 rounded-md overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300'>
						{serviceRedCarpetImage && (
							<div className='relative w-full h-48 md:h-64'>
								<Image
									src={serviceRedCarpetImage.imageUrl}
									alt={serviceRedCarpetImage.description}
									fill
									className='object-cover'
									data-ai-hint={serviceRedCarpetImage.imageHint}
								/>
							</div>
						)}
						<div className='p-6'>
							<h3 className='flex items-center gap-3 text-2xl font-semibold text-yellow-500'>
								<FiFilm className='text-white' /> Red Carpet & Stanchions
							</h3>
							<p className='mt-3 text-white/80'>
								Give your guests the full VIP treatment. Our red carpet and stanchion rentals create a
								glamorous entrance for any event, making everyone feel like a star.
							</p>
						</div>
					</div>
				</div>
			</Section>

			{/* Event Types Section */}
			<Section tittle='Perfect for Any Occasion' heading='From elegant weddings to hype birthday bashes, we bring the fun'>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-8'>
					{eventTypes.map(event => {
						const image = getImage(event.imageId);
						return (
							<div
								key={event.name}
								className='relative group overflow-hidden rounded-lg shadow-md h-32 md:h-40'>
								{image && (
									<Image
										src={image.imageUrl}
										alt={event.description}
										fill
										className='object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110'
										data-ai-hint={image.imageHint}
									/>
								)}
								<div className='absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center p-2'>
									<h3 className='text-white text-sm md:text-base font-bold text-center'>{event.name}</h3>
								</div>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Pricing Section */}
			<Section tittle='Packages & Pricing' heading='Choose the perfect package for your event. All prices in South African Rand (R)'>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8'>
					{pricingPackages.map((pkg, index) => (
						<div
							key={index}
							className={`flex flex-col bg-black/30 border rounded-md p-6 transform transition-transform hover:-translate-y-2 ${
								index === 2
									? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
									: 'border-yellow-500/20'
							}`}>
							<div className='text-center mb-6'>
								<h3 className='text-xl font-semibold text-white'>{pkg.hours} Hours</h3>
								<p className='text-3xl font-bold text-yellow-500 pt-2'>
									{typeof pkg.price === 'number' ? `R${pkg.price.toLocaleString()}` : pkg.price}
								</p>
							</div>
							<ul className='space-y-3 text-white/80 flex-grow mb-6'>
								{pkg.features.map(feature => (
									<li key={feature} className='flex items-start gap-3'>
										<BiCheckCircle className='h-5 w-5 text-yellow-500 mt-0.5 shrink-0' />
										<span className='text-sm'>{feature}</span>
									</li>
								))}
							</ul>
							<Button
								className='w-full'
								variant={index === 2 ? 'primary' : 'secondary'}>
								<a href='#contact'>Book Now</a>
							</Button>
						</div>
					))}
				</div>
			</Section>
		</Main>
	);
};

export default PhotoBoothPage;