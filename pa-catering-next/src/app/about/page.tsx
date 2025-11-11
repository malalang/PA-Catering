import CompanyDescription from '@/components/about/CompanyDescription';
import CoreValues from '@/components/about/CoreValues';
import KeyHighlights from '@/components/about/KeyHighlights';
import OurVision from '@/components/about/OurVision';
import KeyLeadership from '@/components/about/KeyLeadership';
import MilestonesAndVision from '@/components/about/MilestonesAndVision';
import OurCommitment from '@/components/about/OurCommitment';
import OurJourney from '@/components/about/OurJourney';
import StrengthsAndOpportunities from '@/components/about/StrengthsAndOpportunities';

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-12">
      <CompanyDescription />
      <OurVision />
      <CoreValues />
      <KeyHighlights />
      <MilestonesAndVision />
      <KeyLeadership />
      <OurJourney />
      <OurCommitment />
      <StrengthsAndOpportunities />
    </main>
  );
}
