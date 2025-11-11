import { Suspense } from 'react';
import ImageGallery from '@/features/gallery/components/ImageGallery';
import Loading from '@/components/ui/Loading';
import PromotionsBanner from '@/features/menu/components/PromotionsBanner';
import SearchBar from '@/features/menu/components/SearchBar';
import MenuSections from '@/features/menu/components/MenuSections';
import Main from '@/components/ui/layout/Main';
import { CgMenuCheese } from 'react-icons/cg';

const HomePage = () => {
	return (
		<>
			<SearchBar />
			<Main
				tittle='Menu'
				Icon={CgMenuCheese}
				heading='Every Bite Matters'>
				<Suspense fallback={<Loading message='Loading Menu Sections...' />}>
					<MenuSections />
				</Suspense>
				<Suspense fallback={<Loading message='Loading Image Gallery Sections...' />}>
					<ImageGallery />
				</Suspense>
			</Main>
			<PromotionsBanner />
		</>
	);
};
export default HomePage;
