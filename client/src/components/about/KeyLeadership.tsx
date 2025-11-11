import { IoPeopleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const KeyLeadership: React.FC = () => {
	return (
		<Section
			tittle='Key Leadership'
			Icon={IoPeopleOutline}
			heading='Central Eatery is driven by a dedicated leadership team with a diverse range of expertise.
					A key asset to our team is A.E.N Nyathi, an accomplished Industrial Engineer and
					Full-Stack Designer.'>
			<article className='leading-relaxed p-4 mt-4 text-base md:text-lg'>
				<p>A.E.N Nyathi brings a wealth of knowledge and skills to Central Eatery, including:</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
					{[
						'Graphic Design (Photoshop, Illustrator)',
						'Web Development (full stack)',
						'Accounting & Electrical Systems',
						'Operational Workflow Optimization (Fusion 360)',
						'AI Agents (n8n)',
					].map((skill) => (
						<div
							key={skill}
							className='flex items-center gap-2'>
							<Icon
								icon={IoCheckmarkCircleOutline}
								variant='inline'
								className='text-xl text-red-500 flex-shrink-0'
							/>
							<span>{skill}</span>
						</div>
					))}
				</div>
				<p className='mt-4'>
					This unique blend of technical and creative expertise is instrumental in driving Central
					Eatery&apos;s success, from implementing innovative technology solutions to optimizing our
					operational workflows. A.E.N Nyathi&apos;s contributions ensure that Central Eatery
					remains at the forefront of convenience and quality in Lulekani.
				</p>
			</article>
		</Section>
	);
};

export default KeyLeadership;
