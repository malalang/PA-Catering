import React from 'react';
import classNames from 'classnames'; // Import classNames
import Image from 'next/image';

interface AvatarProps {
	src: string | null | undefined;
	alt: string;
	size?: 'small' | 'medium' | 'large';
	className?: string; // Existing className for external styles
}

// Define size classes as an object for better readability and maintainability
const sizeClassesMap = {
	small: 'w-8 h-8 text-sm', // Added text-sm for initial/fallback text size
	medium: 'w-10 h-10 text-base', // Added text-base
	large: 'w-16 h-16 text-xl', // Added text-xl
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'medium', className }) => {
	// Get the size-specific classes from the map, defaulting to 'medium'
	const currentSizeClasses = sizeClassesMap[size];

	return (
		<div
			className={classNames(
				'relative flex items-center justify-center rounded-full bg-red-200 overflow-hidden',
				currentSizeClasses, // Apply the size-specific classes
				className // Apply any additional classes passed from parent
			)}>
			{src ? (
				<Image
					src={src}
					alt={alt}
					className='absolute inset-0 w-full h-full object-cover'
				/>
			) : (
				// Fallback for no image: display first letter of alt text
				<span className='text-red-600 font-bold uppercase flex items-center justify-center h-full w-full'>
					{alt.charAt(0)}
				</span>
			)}
		</div>
	);
};

export default Avatar;
