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
			<body className={` antialiased min-h-screen`}>
				{/* <DefaultSeo {...SEO} /> */}
				       <Navbar />
				       {/* <main className="min-h-[calc(100vh-64px)]"> */}
					       {children}
				       {/* </main> */}
				<Analytics />
			</body>
		</html>
	);
}
