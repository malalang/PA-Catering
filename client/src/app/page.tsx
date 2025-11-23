import AboutUsSnippet from '@/app/home-components/AboutUsSnippet';
import ContactSection from '@/app/home-components/ContactSection';
import FeaturedItemsServices from '@/app/home-components/FeaturedItemsServices';
import HeroSection from '@/app/home-components/HeroSection';
import KeyDifferentiators from '@/app/home-components/KeyDifferentiators';
import TargetMarketCallout from '@/app/home-components/TargetMarketCallout';
import Testimonials from '@/app/home-components/Testimonials';
import Main from '@/components/ui/layout/Main';
const HomePage = () => {
	return (
		<Main>
			<HeroSection />
			<AboutUsSnippet />
			<KeyDifferentiators />
			<FeaturedItemsServices />
			<TargetMarketCallout />
			<Testimonials />
			<ContactSection />
		</Main>
	);
};
export default HomePage;
