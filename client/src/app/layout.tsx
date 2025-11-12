import type { Metadata } from 'next';
// import { DefaultSeo } from 'next-seo';
// import { SEO } from './seo.config';
import './globals.css';
import './layout.css';

import { UserProvider } from '@/lib/context/UserContext';
import Navbar from '@/components/Navbar/Navbar';
import { RouteGuard } from '@/lib/context/RouteGuardContext';
import { Analytics } from '@vercel/analytics/next';

// export const metadata: Metadata = {
//   title: {
//     default: SEO.defaultTitle,
//     template: `%s | ${SEO.titleTemplate.split('|')[1].trim()}`,
//   },
//   description: SEO.description,
//   openGraph: {
//     ...SEO.openGraph,
//     images: [
//       {
//         url: '/images/og-image.jpg', // Replace with your actual OG image
//         width: 1200,
//         height: 630,
//         alt: 'PA Luxe Creation',
//       },
//     ],
//   },
//   twitter: SEO.twitter,
//   viewport: 'width=device-width, initial-scale=1',
//   themeColor: '#ef4444',
//   metadataBase: new URL('https://yourdomain.com'),
//   alternates: {
//     canonical: '/',
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={` antialiased min-h-screen`}>
				{/* <DefaultSeo {...SEO} /> */}
				<UserProvider>
					<RouteGuard>
						<Navbar />
						{/* <main className="min-h-[calc(100vh-64px)]"> */}
							{children}
						{/* </main> */}
					</RouteGuard>
				</UserProvider>
				<Analytics />
			</body>
		</html>
	);
}
