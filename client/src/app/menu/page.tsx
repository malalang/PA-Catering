import { Suspense } from 'react';
import ImageGallery from '@/app/gallery/components/ImageGallery';
import Loading from '@/components/ui/Loading';
import PromotionsBanner from '@/app/menu/components/PromotionsBanner';
import MenuSections from '@/app/menu/components/MenuSections';
import Main from '@/components/ui/layout/Main';
import { CgMenuCheese } from 'react-icons/cg';
import SearchBar from './components/SearchBar';

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
