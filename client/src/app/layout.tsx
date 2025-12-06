import type { Metadata } from 'next';
import './globals.css';
import './layout.css';

import Navbar from '@/components/Navbar/Navbar';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
	title: 'PA Catering | Premium Dining & 360° Photo Booth Experiences',
	description: "Experience luxury dining and unforgettable moments with PA Catering's restaurant services and exclusive 360° photo booth rentals in Evander.",
	keywords: ['Catering', 'Restaurant', '360 Photo Booth', 'Evander', 'Luxury Dining', 'Events', 'Food'],
	themeColor: '#f59e0b',
	openGraph: {
		title: 'PA Catering | Premium Dining & 360° Photo Booth Experiences',
		description: "Experience luxury dining and unforgettable moments with PA Catering's restaurant services and exclusive 360° photo booth rentals.",
		url: 'https://pa-catering.com',
		siteName: 'PA Catering',
		images: [
			{
				url: '/PA_Logo.png',
				width: 800,
				height: 600,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
};

import Footer from '@/components/Footer/Footer';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className="scroll-smooth">
			<body className={`antialiased min-h-screen bg-black text-white`}>
				<Navbar />
				{children}
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
