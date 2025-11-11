import React from 'react';
import OurJourney from '@/components/about/OurJourney';
import OurCommitment from '@/components/about/OurCommitment';
import WhatMakesUsSpecial from '@/components/about/WhatMakesUsSpecial';
import CoreValues from '@/components/about/CoreValues';
import OurVision from '@/components/about/OurVision';
import KeyLeadership from '@/components/about/KeyLeadership';
import CompanyDescription from '@/components/about/CompanyDescription';
import KeyHighlights from '@/components/about/KeyHighlights';
import StrengthsAndOpportunities from '@/components/about/StrengthsAndOpportunities';
import WeaknessesAndThreats from '@/components/about/WeaknessesAndThreats';
import MilestonesAndVision from '@/components/about/MilestonesAndVision';
import Main from '@/components/ui/layout/Main';
import { IoFastFoodOutline } from 'react-icons/io5';

const AboutPage = () => {
	return (
		<Main
			tittle='About Central Eatery'
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
