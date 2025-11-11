import React from 'react';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon' | 'suggestion';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
}

const baseClasses =
	'rounded-md flex gap-2 items-center justify-center font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-4  focus-visible:ring-red-400 text-nowrap';
const variantClasses = {
	primary: 'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-black',
	secondary: 'bg-white text-red-600 border border-red-400 hover:bg-red-50',
	danger: 'bg-red-100 text-red-700 border border-red-400 hover:bg-red-200',
	icon: 'bg-none text-red-500 hover:text-red-700',
	suggestion: 'bg-transparent text-white hover:bg-red-700',
};
const sizeClasses = {
	sm: 'px-3 py-1 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'sm',
	loading = false,
	disabled,
	className,
	...props
}) => (
	<button
		className={classNames(baseClasses, variantClasses[variant], sizeClasses[size], className, {
			'opacity-50 cursor-not-allowed': disabled || loading,
		})}
		disabled={disabled || loading}
		{...props}>
		{loading ? (
			<span className='inline-block w-4 h-4 border-2 border-white border-t-red-600 rounded-full animate-spin mr-2'></span>
		) : (
			children
		)}
	</button>
);

export default Button;
