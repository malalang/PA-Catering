import React from 'react';

interface IconProps {
	icon: React.ElementType;
	className?: string;
	variant?: 'default' | 'inline' | 'inlineCircular';
	heading?: string;
}

const Icon: React.FC<IconProps> = ({
	icon: IconComponent,
	className,
	variant = 'default',
	heading,
}) => {
	if (variant === 'inline') {
		return (
			<div className='flex items-center justify-center gap-2'>
				<IconComponent className={`${className} text-3xl text-red-500`} />
				{heading && <h2 className='border-none'>{heading}</h2>}
			</div>
		);
	}

	if (variant === 'inlineCircular') {
		return (
			<div className='flex items-center  gap-2 '>
				<span className='bg-red-500 shadow-sm shadow-black/50 rounded-full p-2 '>
					<IconComponent className={` text-white text-xl   ${className || ''}`} />
				</span>

				{heading && <h3 className='text-shadow-sm text-shadow-black/50 p-2'>{heading}</h3>}
			</div>
		);
	}

	// Default variant (circular icon)
	return (
		<div className='flex flex-col items-center text-center'>
			<div className='flex items-center justify-center w-12 h-12 bg-red-500 mx-auto text-white rounded-full shadow-sm shadow-black/50 '>
				<IconComponent className={`w-6 h-6 ${className || ''}`} />
			</div>
			{heading && <h3 className='mt-4 text-shadow-sm text-shadow-black/50'>{heading}</h3>}
		</div>
	);
};

export default Icon;
