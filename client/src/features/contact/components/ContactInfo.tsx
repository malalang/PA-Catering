import Section from '@/components/ui/layout/Section';
import { IoLocationSharp, IoCall, IoMail } from 'react-icons/io5';

const ContactInfo: React.FC = () => {
	return (
		<Section tittle='Contact Information'>
			<article className='flex items-center  gap-2 p-4 '>
			
				<IoLocationSharp className='text-white w-10 h-10  ' />
				<p>
					<strong>Address:</strong> 123 Main Street, Phalaborwa, 1390
				</p>
			</article>
			<article className='flex items-center  gap-2 p-2'>
				<IoCall className='text-white w-10 h-10  ' />
				<p>
					<strong>Phone Number:</strong> (+27) 15 781 1234
				</p>
			</article>
			<article className='flex items-center  gap-2 p-2'>
				<IoMail className='text-white w-10 h-10  ' />
				<p>
					<strong>Email Address:</strong> contact@centraleatery.co.za
				</p>
			</article>
		</Section>
	);
};

export default ContactInfo;
