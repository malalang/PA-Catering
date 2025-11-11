'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { saveContactMessage } from '@/firebase/contact/saveContactMessage';
import Alert from '@/components/ui/Alert';
import { useUser } from '@/context/UserContext';
import Section from '@/components/ui/layout/Section';
import Loading from '@/components/ui/Loading';

interface SubmittedMessage {
	name: string;
	whatsapp: string;
	message: string;
}

const ContactForm: React.FC = () => {
	const { user } = useUser();
	const [name, setName] = useState(user?.displayName || '');
	const [whatsapp, setWhatsapp] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [submittedMessage, setSubmittedMessage] = useState<SubmittedMessage | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const result = await saveContactMessage({
			name,
			whatsapp,
			message,
			userId: user ? user.uid : null,
		});

		setLoading(false);

		if (result.success) {
			setSubmittedMessage({ name, whatsapp, message });
			setName('');
			setWhatsapp('');
			setMessage('');
		} else {
			setError('Failed to send message. Please try again later.');
		}
	};

	const handleSendAnother = () => {
		setSubmittedMessage(null);
	};
	if (loading) return <Loading message='Sending your message...' />;

	if (submittedMessage) {
		return (
			<Section
				heading='	Your message has been sent successfully. We will get back to you soon.'
				tittle='Thank You!'
				className='text-center bg-black/50 p-8 rounded-md border border-white/20'>
				<div className='text-left bg-black/20 p-4 rounded-md border border-white/10 mb-6'>
					<p className='text-white/70'>
						<strong>Name:</strong> {submittedMessage.name}
					</p>
					<p className='text-white/70'>
						<strong>WhatsApp:</strong> {submittedMessage.whatsapp}
					</p>
					<p className='text-white/70 mt-2'>
						<strong>Message:</strong>
					</p>
					<blockquote className='text-white border-l-2 border-red-500 pl-3 italic mt-1'>
						{submittedMessage.message}
					</blockquote>
				</div>
				<Button
					onClick={handleSendAnother}
					variant='primary'
					size='lg'>
					Send Another Message
				</Button>
			</Section>
		);
	}

	return (
		<Section>
			<form
				onSubmit={handleSubmit}
				className='space-y-4'>
				<h2 className='text-lg font-semibold'>Send us a message</h2>
				<TextInput
					type='text'
					placeholder='Your Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					disabled={loading}
				/>
				<TextInput
					type='tel'
					placeholder='Your WhatsApp Number'
					value={whatsapp}
					onChange={(e) => setWhatsapp(e.target.value)}
					required
					disabled={loading}
				/>
				<textarea
					placeholder='Your Message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
					className='w-full p-3 bg-transparent border border-red-500 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-900 text-white placeholder-white'
					rows={5}
					disabled={loading}
				/>
				<Button
					type='submit'
					variant='primary'
					size='lg'
					className='mt-4'
					disabled={loading}>
					{loading ? 'Sending...' : 'Send Message'}
				</Button>
				{error && (
					<Alert
						message={error}
						variant='danger'
					/>
				)}
			</form>
		</Section>
	);
};

export default ContactForm;
