import Link from '@/components/ui/Link';
import { HiCamera } from 'react-icons/hi2';
import Image from 'next/image';

export default function PhotoBoothPage() {
	return (
		<main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
			{/* Hero Section */}
			<section className='relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden'>
				<div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover bg-no-repeat opacity-60 mix-blend-overlay" style={{ backgroundImage: "url('/PhotoBoot.jpg')" }}></div>
				<div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>

				<div className="relative z-10 max-w-5xl mx-auto px-4 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">
					<span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
						The 360° Experience
					</span>
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600 mb-8 font-small-caps">
						Capture Every Angle
					</h1>
					<p className='text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-10'>
						Step into the spotlight. Create stunning, shareable 360° videos that turn fleeting moments into timeless memories.
					</p>

					<Link
						href='/photo/booking'
						className='group inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-full font-bold uppercase tracking-widest shadow-[0_0_30px_-10px_rgba(245,158,11,0.6)] hover:shadow-[0_0_50px_-10px_rgba(245,158,11,0.8)] transition-all duration-500 transform hover:-translate-y-1'>
						<HiCamera className="text-xl group-hover:rotate-12 transition-transform" />
						<span>Book Your Session</span>
					</Link>
				</div>
			</section>

			{/* Features Grid */}
			<section className="max-w-7xl mx-auto px-4 py-24">
				<div className='grid md:grid-cols-3 gap-8'>
					{[
						{ title: "360° Coverage", text: "Capture every angle with our rotating camera system that creates stunning slow-motion videos.", delay: "0" },
						{ title: "Instant Sharing", text: "Get your videos instantly via email or QR code. Share directly to social media within seconds.", delay: "100" },
						{ title: "Studio Quality", text: "High-definition cameras and professional lighting ensure you look your absolute best.", delay: "200" }
					].map((feature, i) => (
						<div key={i} className='group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2'>
							<div className='w-14 h-14 flex items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-500'>
								<HiCamera className='text-2xl' />
							</div>
							<h3 className='text-2xl font-bold text-white mb-4 font-small-caps tracking-wide group-hover:text-amber-400 transition-colors'>{feature.title}</h3>
							<p className='text-white/60 leading-relaxed group-hover:text-white/80 transition-colors'>
								{feature.text}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Pricing Info */}
			<section className="relative py-24 border-t border-white/5 bg-neutral-900/30">
				<div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
				<div className='max-w-5xl mx-auto px-4 relative z-10'>
					<h2 className='text-4xl md:text-5xl font-bold text-white mb-16 text-center font-small-caps tracking-widest'>Packages</h2>

					<div className='grid md:grid-cols-2 gap-8'>
						{/* Individual */}
						<div className='p-8 md:p-12 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-500 group'>
							<h3 className='text-amber-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm'>Individual Session</h3>
							<div className="flex items-baseline gap-2 mb-8">
								<span className='text-5xl font-bold text-white tracking-tighter'>R50</span>
								<span className='text-white/40'>/ person</span>
							</div>
							<ul className='space-y-4 mb-10'>
								{['1x 360° Video', 'Instant Digital Delivery', 'Props Included', 'Social Media Ready'].map(item => (
									<li key={item} className='flex items-center gap-3 text-white/80'>
										<div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
										{item}
									</li>
								))}
							</ul>
							<Link href="/photo/booking" className="block w-full py-4 rounded-xl border border-white/20 text-center font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
								Book Now
							</Link>
						</div>

						{/* Event */}
						<div className='relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/30 backdrop-blur-sm group'>
							<div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-black textxs font-bold uppercase tracking-widest rounded-full">Most Popular</div>
							<h3 className='text-amber-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm'>Event Package</h3>
							<div className="flex items-baseline gap-2 mb-8">
								<span className='text-5xl font-bold text-white tracking-tighter'>Custom</span>
								<span className='text-white/40'>/ event</span>
							</div>
							<ul className='space-y-4 mb-10'>
								{['Unlimited Sessions', 'Custom Overlay Branding', 'Dedicated Attendant', 'All Digital Files'].map(item => (
									<li key={item} className='flex items-center gap-3 text-white/80'>
										<div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
										{item}
									</li>
								))}
							</ul>
							<Link href="/photo/booking" className="block w-full py-4 rounded-xl bg-amber-500 text-black text-center font-bold uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-amber-900/20">
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}