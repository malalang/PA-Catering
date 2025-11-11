import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import Main from '@/components/ui/layout/Main';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import AppLink from '@/components/ui/Link';
import Section from '@/components/ui/layout/Section';
import { BiX } from 'react-icons/bi';

export default function TermsAndConditionsPage() {
	const team = [
		{
			name: 'Ntsako Nyath',
			role: 'Maneger (Industrial Engineering)',
			image: '/users/Abram.jpg',
			bio: 'My name is Abram Elton Ntsako Nyathi and I live in Phalaborwa Lulekani. I’m passionate about chess and enjoy playing it in my free time. I’m also interested in entrepreneurship and my goal is to have and run my own company. I have experience in coding (HTML, CSS, JavaScript), CAD (Fusion 360), and editing (Photoshop, Illustrator, After Effects). I’m proficient in Microsoft Word, Excel, and PowerPoint. I’m currently a student at Vaal University of Technology studying Industrial Engineering. Here are some of the subjects I’ve taken so far:',
			link: {
				Link: 'http://abrameltonntsako.web.app',
				Name: 'abrameltonntsako.web.app',
			},
		},
	];
	return (
		<Main
			tittle='Terms and Conditions'
			Icon={FaUserCircle}
			heading='Our Centarl Eatery Terms and Conditions'>
			<Section className='grid md:grid-cols-2 gap-12'>
				{team.map((member, index) => (
					<div
						key={member.name}
						className='group'>
						<div className='relative w-[300]    rounded-2xl overflow-hidden p-0 mb-8 border border-[var(--glass-border)] shadow-xl'>
							<Image
								src={member.image}
								alt={member.name}
								width={300}
								height={300}
								className=' rounded-md transition-all duration-500 group-hover:scale-110'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						</div>
						<div className='text-center'>
							<h3 className='text-2xl font-bold mb-3 text-high-contrast group-hover:text-[var(--color-yellow-light)] transition-colors duration-300 drop-shadow-text'>
								{member.name}
							</h3>
							<p className='text-lg font-medium text-[var(--color-yellow)] mb-4 drop-shadow'>
								{member.role}
							</p>
							<p className='text-high-contrast leading-relaxed'>{member.bio}</p>
							<AppLink
								variant='primary'
								href={member.link.Link}>
								{member.link.Name}
							</AppLink>
						</div>
						<div className='mt-6 flex justify-center space-x-4'>
							<a
								href='#'
								className='text-high-contrast/70 hover:text-[var(--color-yellow-light)] transition-colors duration-300 hover:drop-shadow-glow'>
								<BiX />
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
								</svg>
							</a>
							<a
								href='#'
								className='text-high-contrast/70 hover:text-[var(--color-yellow-light)] transition-colors duration-300 hover:drop-shadow-glow'>
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' />
								</svg>
							</a>
						</div>
					</div>
				))}
			</Section>
		</Main>
	);
}
