import { IoBulbOutline, IoShieldCheckmarkOutline, IoPeopleOutline } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const CoreValues: React.FC = () => {
	return (
		<Section tittle='Our Core Values' Icon={IoBulbOutline}>
			<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
				{[
					{ icon: IoBulbOutline, title: 'Innovation', desc: "We constantly seek new ways to elevate our culinary and event experiences." },
					{ icon: IoShieldCheckmarkOutline, title: 'Quality', desc: "Uncompromising commitment to premium ingredients and exceptional service." },
					{ icon: IoPeopleOutline, title: 'Community', desc: "Building strong relationships and contributing positively to the Evander community." },
				].map((item, idx) => (
					<article key={idx} className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 flex flex-col items-center text-center">
						<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
							<item.icon className="text-3xl text-amber-500" />
						</div>
						<h3 className="text-xl font-bold text-white mb-4 font-small-caps tracking-widest">{item.title}</h3>
						<p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
					</article>
				))}
			</div>
		</Section>
	);
};

export default CoreValues;
