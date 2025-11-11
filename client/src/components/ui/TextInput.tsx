import React from 'react';
import classNames from 'classnames';

export type TextInputVariant = 'default' | 'error';
export type CustomTextInputSize = 'sm' | 'md' | 'lg'; // Renamed to avoid conflict

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: TextInputVariant;
	customSize?: CustomTextInputSize; // Using the new name
	loading?: boolean;
	label?: string;
	fullWidth?: boolean;
	icon?: React.ReactNode;
}

const baseClasses = 'block rounded-md transition-all duration-200 focus:outline-none focus:ring-2 ';

const variantClasses = {
	default: 'border-white/30 bg-black/20 focus:border-red-500 focus:ring-red-500',
	error: 'border-red-500 bg-black/20 focus:border-red-500 focus:ring-red-500',
};

// Use the new custom size type here
const sizeClasses = {
	sm: 'px-3 py-1 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-5 py-2.5 text-lg',
};

const TextInput: React.FC<TextInputProps> = ({
	label,
	variant = 'default',
	customSize = 'md',
	loading = false,
	disabled,
	className,
	fullWidth = true,
	icon,
	...props
}) => {
	const inputId = props.id || `text-input-${Math.random().toString(36).substring(2, 9)}`;

	const containerClasses = classNames('relative', { 'w-full': fullWidth });

	const inputClasses = classNames(
		baseClasses,
		variantClasses[variant],
		sizeClasses[customSize],
		className,
		{
			'opacity-50 cursor-not-allowed': disabled || loading,
			'w-full': fullWidth,
			'pl-10': icon,
		}
	);

	return (
		<div className={containerClasses}>
			{label && (
				<label
					htmlFor={inputId}
					className='block text-sm font-medium text-white mb-1'>
					{label}
				</label>
			)}
			{icon && (
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					{icon}
				</div>
			)}
			<input
				id={inputId}
				className={inputClasses}
				disabled={disabled || loading}
				{...props}
			/>
		</div>
	);
};

export default TextInput;
