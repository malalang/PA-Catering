import Main from '@/components/ui/layout/Main';
import { HiCamera } from 'react-icons/hi2';
import Image from 'next/image';
import AppLink from '@/components/ui/Link';

export default function PhotoBoothPage() {
	return (
		<Main
			tittle='360 Photo Booth'
			Icon={HiCamera}
			heading='Capture Your Moments in 360°'>
			{/* Hero Section */}
			<div className='grid md:grid-cols-2 gap-8 mb-12'>
				<div className='flex flex-col justify-center'>
					<h2 className='text-3xl font-bold text-white mb-4'>Premium 360° Photo Booth Experience</h2>
					<p className='text-yellow-300 mb-6'>
						Step into the spotlight with our state-of-the-art 360° photo booth! Create stunning, shareable content that captures every angle of your special moments. Perfect for events, celebrations, and creating unforgettable memories.
					</p>
					<AppLink
						href='/photo/booking'
						className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl shadow-lg hover:shadow-amber-500/50 transition-all duration-200 font-semibold text-white w-fit'>
						<HiCamera size={20} />
						<span>Book Your Session</span>
					</AppLink>
				</div>
				<div className='relative h-64 md:h-auto rounded-xl overflow-hidden border border-yellow-500/30 shadow-xl'>
					<Image
						src='/PhotoBoot.jpg'
						alt='360 Photo Booth'
						fill
						className='object-cover'
					/>
				</div>
			</div>

			{/* Features Grid */}
			<div className='grid md:grid-cols-3 gap-6 mb-12'>
				<div className='bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300'>
					<div className='bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-3 rounded-lg border border-amber-400/30 w-fit mb-4'>
						<HiCamera className='text-amber-400 text-3xl' />
					</div>
					<h3 className='text-xl font-bold text-white mb-2'>360° Coverage</h3>
					<p className='text-yellow-300'>
						Capture every angle with our rotating camera system that creates stunning slow-motion videos.
					</p>
				</div>

				<div className='bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300'>
					<div className='bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-3 rounded-lg border border-amber-400/30 w-fit mb-4'>
						<HiCamera className='text-amber-400 text-3xl' />
					</div>
					<h3 className='text-xl font-bold text-white mb-2'>Instant Sharing</h3>
					<p className='text-yellow-300'>
						Get your videos instantly via email or QR code. Share directly to social media!
					</p>
				</div>

				<div className='bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300'>
					<div className='bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-3 rounded-lg border border-amber-400/30 w-fit mb-4'>
						<HiCamera className='text-amber-400 text-3xl' />
					</div>
					<h3 className='text-xl font-bold text-white mb-2'>Professional Quality</h3>
					<p className='text-yellow-300'>
						High-definition cameras and professional lighting ensure stunning results every time.
					</p>
				</div>
			</div>

			{/* Pricing Info */}
			<div className='bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-8'>
				<h2 className='text-2xl font-bold text-white mb-6 text-center'>Simple Pricing</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-white/5 rounded-lg p-6 border border-white/10'>
						<h3 className='text-xl font-bold text-amber-400 mb-2'>Individual Session</h3>
						<p className='text-3xl font-bold text-white mb-4'>R50 <span className='text-lg text-yellow-400'>/ person</span></p>
						<ul className='text-yellow-300 space-y-2'>
							<li>✓ 1x 360° video</li>
							<li>✓ Instant digital delivery</li>
							<li>✓ Social media ready</li>
						</ul>
					</div>
					<div className='bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-lg p-6 border border-amber-400/40'>
						<h3 className='text-xl font-bold text-amber-400 mb-2'>Event Package</h3>
						<p className='text-3xl font-bold text-white mb-4'>Contact <span className='text-lg text-yellow-400'>/ event</span></p>
						<ul className='text-yellow-300 space-y-2'>
							<li>✓ Unlimited sessions</li>
							<li>✓ Custom branding options</li>
							<li>✓ Dedicated attendant</li>
							<li>✓ Props included</li>
						</ul>
					</div>
				</div>
			</div>
		</Main>
	);
}