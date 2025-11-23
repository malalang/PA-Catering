import type { Metadata } from 'next';
import './globals.css';
import './layout.css';

import Navbar from '@/components/Navbar/Navbar';
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`antialiased min-h-screen`}>
				<Navbar />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
