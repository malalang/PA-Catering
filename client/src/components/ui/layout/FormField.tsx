import React from 'react';

interface FormFieldProps {
	label: string;
	name: string;
	type?: 'text' | 'date' | 'time' | 'select';
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	required?: boolean;
	placeholder?: string;
	className?: string;
	children?: React.ReactNode;
	min?: string;
	id?: string;
}

const formInputStyle =
	'w-full p-3 rounded-md bg-black/30 border border-white/20 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none';

const FormField: React.FC<FormFieldProps> = ({
	label,
	name,
	type = 'text',
	value,
	onChange,
	required = false,
	placeholder,
	className = '',
	children,
	min,
	id,
}) => (
	<div className={className}>
		<label
			htmlFor={id || name}
			className='block mb-2 font-semibold text-white'>
			{label}
		</label>
		{type === 'select' ? (
			<select
				name={name}
				id={id || name}
				value={value}
				onChange={onChange}
				required={required}
				className={formInputStyle}>
				{children}
			</select>
		) : (
			<input
				type={type}
				name={name}
				id={id || name}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				className={formInputStyle}
				min={min}
			/>
		)}
	</div>
);

export default FormField;
