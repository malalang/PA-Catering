import AboutUsSnippet from '@/components/home/AboutUsSnippet';
import ContactSection from '@/components/home/ContactSection';
import FeatuyellowItemsServices from '@/components/home/FeaturedItemsServices';

import HeroSection from '@/components/home/HeroSection';
import KeyDifferentiators from '@/components/home/KeyDifferentiators';
import TargetMarketCallout from '@/components/home/TargetMarketCallout';
import Testimonials from '@/components/home/Testimonials';
import Main from '@/components/ui/layout/Main';
const HomePage = () => {
	return (
		<Main>
			<HeroSection />
			<AboutUsSnippet />
			<KeyDifferentiators />
			<FeatuyellowItemsServices />
			<TargetMarketCallout />
			<Testimonials />
			<ContactSection />
		</Main>
	);
};
export default HomePage;
