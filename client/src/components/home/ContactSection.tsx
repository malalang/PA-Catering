import MapEmbed from '@/features/contact/components/MapEmbed';
import { IoLocationSharp, IoCall, IoChatbubblesOutline } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import ContactInfo from '@/features/contact/components/ContactInfo';
import Section from '@/components/ui/layout/Section';

const ContactSection: React.FC = () => {
	return (
		<>
			<ContactInfo />
			<Section
				Icon={IoChatbubblesOutline}
				tittle='Visit Us Today!'>
				<div className='mt-8'>
					<MapEmbed />
				</div>
			</Section>
		</>
	);
};

export default ContactSection;
