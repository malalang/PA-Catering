import React from 'react';
import Link, { LinkProps as NextLinkProps } from 'next/link';
import classNames from 'classnames';

export type LinkVariant = 'primary' | 'secondary' | 'button';

interface LinkProps extends NextLinkProps {
	children: React.ReactNode;
	className?: string;
	variant?: LinkVariant;
}

const baseClasses = 'transition-colors duration-200 flex gap-2 items-center justify-center';

const variantClasses = {
	primary: 'text-yellow-100 shadow-blue-500 font-bold hover:text-yellow-700 hover:underline',
	secondary: 'text-yellow-200 hover:text-yellow-700 hover:underline',
	button:
		'bg-yellow-600 font-bold grow p-2 text-center text-nowrap text-white shadow-md shadow-black active:bg-yellow-900 rounded-md flex gap-2 items-center justify-center font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-4  focus-visible:ring-yellow-400 ',
};

const AppLink: React.FC<LinkProps> = ({ children, className, variant = 'primary', ...props }) => {
	return (
		<Link
			{...props}
			className={classNames(baseClasses, variantClasses[variant], className)}>
			{children}
		</Link>
	);
};

export default AppLink;
