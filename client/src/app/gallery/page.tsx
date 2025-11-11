import ImageGallery from '@/features/gallery/components/ImageGallery';
import Main from '@/components/ui/layout/Main';
import { FcGallery } from 'react-icons/fc';

export default function Gallery() {
	return (
		<Main
			tittle='Gallery'
			Icon={FcGallery}
			heading='Find Your Convenience'>
			<ImageGallery />
		</Main>
	);
}
