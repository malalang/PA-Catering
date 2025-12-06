import React from 'react';
import { IoBusinessSharp } from 'react-icons/io5';
import { VscSymbolStructure } from 'react-icons/vsc';
import { RxValue } from 'react-icons/rx';
import Section from '@/components/ui/layout/Section';

const CompanyDescription: React.FC = () => {
	return (
		<Section tittle='Corporate Profile' Icon={IoBusinessSharp}>
			<div className="grid md:grid-cols-2 gap-8">
				{/* Legal Structure Card */}
				<div className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
						<VscSymbolStructure className="text-8xl text-white" />
					</div>
					<div className="relative z-10">
						<div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 text-amber-500">
							<VscSymbolStructure className="text-2xl" />
						</div>
						<h3 className="text-xl font-bold text-white mb-4 font-small-caps tracking-widest">Legal Structure</h3>
						<p className="text-white/60 leading-relaxed font-light">
							PA Luxe Creation PTY Ltd is registered as a Private Company (PTY). This structure
							ensures limited liability protection, establishes the business
							as a separate legal entity, and enhances our credibility seeking to foster long-term growth.
						</p>
					</div>
				</div>

				{/* Value Prop Card */}
				<div className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
						<RxValue className="text-8xl text-white" />
					</div>
					<div className="relative z-10">
						<div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 text-amber-500">
							<RxValue className="text-2xl" />
						</div>
						<h3 className="text-xl font-bold text-white mb-4 font-small-caps tracking-widest">Value Proposition</h3>
						<p className="text-white/80 leading-relaxed font-light italic text-lg">
							&ldquo;Delivering unbeatable pricing, premium service quality, and
							cutting-edge convenience through culinary excellence and industrial engineering.&rdquo;
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default CompanyDescription;
