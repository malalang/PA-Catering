import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for could not be found.',
};

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50">
            <div className="p-8 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for.</p>
                <a
                    href="/"
                    className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Return Home
                </a>
            </div>
        </div>
    );
}