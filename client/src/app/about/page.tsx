
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

const AboutPage = () => {
	return (
		<Main
			tittle='About PA Luxe Creation'
			Icon={IoFastFoodOutline}>
			<OurJourney />
			<OurVision />
			<CompanyDescription />
			<OurCommitment />
			<MilestonesAndVision />
			<WhatMakesUsSpecial />
			<KeyHighlights />
			<CoreValues />
			<StrengthsAndOpportunities />
			<WeaknessesAndThreats />
			<KeyLeadership />
		</Main>
	);
};

export default AboutPage;
