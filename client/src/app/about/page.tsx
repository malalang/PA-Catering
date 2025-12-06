
import OurJourney from './components/OurJourney';
import OurCommitment from './components/OurCommitment';
import WhatMakesUsSpecial from './components/WhatMakesUsSpecial';
import CoreValues from './components/CoreValues';
import OurVision from './components/OurVision';
import KeyLeadership from './components/KeyLeadership';
import CompanyDescription from './components/CompanyDescription';
import KeyHighlights from './components/KeyHighlights';
import StrengthsAndOpportunities from './components/StrengthsAndOpportunities';
import WeaknessesAndThreats from './components/WeaknessesAndThreats';
import MilestonesAndVision from './components/MilestonesAndVision';
import Main from '@/components/ui/layout/Main';
import { IoFastFoodOutline } from 'react-icons/io5';
import Section from '@/components/ui/layout/Section';

const AboutPage = () => {
	return (

		<Main
			tittle='Our Story'
			Icon={IoFastFoodOutline}
			className="space-y-32">

			{/* Intro Section - Journey */}
			<div className="max-w-4xl mx-auto">
				<OurJourney />
			</div>

			{/* Strategic Pillars Grid */}
			<div className="grid md:grid-cols-2 gap-12 lg:gap-24 relative">
				<div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden md:block"></div>

				<div className="space-y-24">
					<OurVision />
					<OurCommitment />
					<WhatMakesUsSpecial />
				</div>
				<div className="space-y-24 pt-0 md:pt-32">
					<CompanyDescription />
					<MilestonesAndVision />
					<CoreValues />
				</div>
			</div>

			{/* SWOT Analysis Section */}
			<Section tittle="Strategic Overview" className="bg-white/5 border border-white/5 rounded-3xl p-8 md:p-12">
				<div className="grid md:grid-cols-2 gap-12">
					<StrengthsAndOpportunities />
					<WeaknessesAndThreats />
				</div>
			</Section>

			{/* Highlights & Leadership */}
			<div className="space-y-24">
				<KeyHighlights />
				<KeyLeadership />
			</div>
		</Main>
	);
};

export default AboutPage;
