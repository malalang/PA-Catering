import React from 'react';
import classNames from 'classnames'; // Import classNames
import Image from 'next/image';

interface AvatarProps {
	src: string | null | undefined;
	alt: string;
	initials?: string; // Added initials prop
	size?: 'small' | 'medium' | 'large' | 'xl'; // Added xl size
	className?: string;
}

const sizeClassesMap = {
	small: 'w-8 h-8 text-sm',
	medium: 'w-10 h-10 text-base',
	large: 'w-16 h-16 text-xl',
	xl: 'w-24 h-24 text-3xl', // Added xl size
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, initials, size = 'medium', className }) => {
	const currentSizeClasses = sizeClassesMap[size];

	return (
		<div
			className={classNames(
				'relative flex items-center justify-center rounded-full bg-yellow-200 overflow-hidden shrink-0',
				currentSizeClasses,
				className
			)}>
			{src ? (
				<Image
					src={src}
					alt={alt}
					fill // Use fill instead of absolute positioning manually
					className='object-cover'
				/>
			) : (
				<span className='text-yellow-900 font-bold uppercase flex items-center justify-center h-full w-full select-none'>
					{initials || alt.charAt(0)}
				</span>
			)}
		</div>
	);
};

export default Avatar;
