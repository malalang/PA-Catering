import { IoPeopleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const KeyLeadership: React.FC = () => {
	return (
		<Section
			tittle='Leadership'
			Icon={IoPeopleOutline}>

			<div className="flex flex-col lg:flex-row gap-12 items-start">
				<div className='group flex-shrink-0 w-full lg:w-1/3 bg-neutral-900 border border-white/5 rounded-3xl p-8 relative overflow-hidden'>
					<div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
					<div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold text-amber-500 mb-6 border border-white/10">
						AN
					</div>
					<h3 className="text-2xl font-bold text-white font-small-caps tracking-wide mb-2">A.E.N Nyathi</h3>
					<p className="text-amber-500 font-medium mb-6">Founder & Industrial Engineer</p>
					<p className="text-white/60 text-sm leading-relaxed">
						A multidisciplinary leader combining engineering precision with creative design to build efficient, beautiful systems.
					</p>
				</div>

				<div className='flex-grow'>
					<h4 className="text-xl font-bold text-white mb-6 font-small-caps tracking-wide">Technical Expertise</h4>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{[
							'Graphic Design (Photoshop, Illustrator)',
							'Web Development (Full Stack)',
							'Accounting & Electrical Systems',
							'Operational Workflow (Fusion 360)',
							'AI Automation & Agents',
						].map((skill) => (
							<div
								key={skill}
								className='flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-4 hover:border-amber-500/30 transition-colors'>
								<IoCheckmarkCircleOutline className='text-xl text-amber-500 flex-shrink-0' />
								<span className="text-white/80 text-sm font-medium">{skill}</span>
							</div>
						))}
					</div>
					<p className='mt-8 text-white/60 leading-relaxed font-light'>
						This unique blend of technical and creative expertise is instrumental in driving PA Luxe Creation&apos;s success,
						from implementing innovative technology solutions to optimizing our operational workflows.
						A.E.N Nyathi&apos;s contributions ensure that we remain at the forefront of convenience and quality in Evander.
					</p>
				</div>
			</div>
		</Section>
	);
};

export default KeyLeadership;
