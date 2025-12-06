import Image from 'next/image';
import Link from '@/components/ui/Link';
import { FaShoppingCart } from 'react-icons/fa';
import Section from '@/components/ui/layout/Section';
import { BiCamera } from 'react-icons/bi';
const HeroSection: React.FC = () => {
	return (
		<section className='relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden -mt-20 pt-20 group'>
			{/* Parallax Background */}
			<div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover bg-no-repeat opacity-40 mix-blend-overlay scale-105 transition-transform duration-[20s] ease-linear group-hover:scale-110" style={{ backgroundImage: "url('/BackGround.png')" }}></div>
			<div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>

			<div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-4 animate-in fade-in zoom-in duration-1000">
				<div className="mb-8 p-6 bg-black/40 backdrop-blur-xl rounded-full border border-amber-500/20 shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)]">
					<Image
						src='/PA_Logo.png'
						alt='PA Luxe Creation Logo'
						width={180}
						height={180}
						priority
						className='w-32 md:w-48 h-auto drop-shadow-2xl'
					/>
				</div>

				<h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600 drop-shadow-sm font-small-caps">
					Taste & Capture
				</h1>

				<p className='mt-4 text-xl md:text-2xl text-amber-100/80 font-light max-w-3xl leading-relaxed tracking-wide'>
					Evander's premier destination for exquisite dining and immersive 360° photo booth experiences.
					<span className="block mt-2 font-medium text-amber-500">Every bite is a delight, every moment is a luxury.</span>
				</p>

				<div className='flex flex-col sm:flex-row w-full justify-center gap-6 mt-12'>
					<Link
						variant='button'
						href='/menu'
						className='group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-full font-bold uppercase tracking-widest shadow-lg shadow-amber-900/40 transition-all duration-300 hover:-translate-y-1'>
						<FaShoppingCart className="group-hover:animate-bounce" />
						<span>Order Now</span>
					</Link>
					<Link
						variant='button'
						href='/photo'
						className='group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-amber-500/30 text-amber-400 hover:text-white rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:border-amber-400'>
						<BiCamera className="text-xl group-hover:rotate-180 transition-transform duration-700" />
						<span>Book 360° Booth</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
