import React from 'react';

const carWashAddOns = [
	{ id: 'interior-detailing', label: 'Interior Detailing', price: '150' },
	{ id: 'wax-polish', label: 'Wax and Polish', price: '100' },
	{ id: 'engine-wash', label: 'Engine Wash', price: '80' },
	{ id: 'tire-shine', label: 'Tire Shine', price: '50' },
];

interface AddOnSelectorProps {
	selectedAddOns: string[];
	onChange: (addOns: string[]) => void;
}

const AddOnSelector: React.FC<AddOnSelectorProps> = ({ selectedAddOns, onChange }) => {
	const handleAddOnChange = (addOn: string) => {
		const newSelection = selectedAddOns.includes(addOn)
			? selectedAddOns.filter((item) => item !== addOn)
			: [...selectedAddOns, addOn];
		onChange(newSelection);
	};

	return (
		<div className='space-y-4'>
			<h3 className='text-lg font-semibold text-white'>Additional Services</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{carWashAddOns.map(({ id, label, price }) => (
					<div
						key={id}
						className='flex items-center space-x-3 p-3 rounded-md bg-black/30 border border-white/20'>
						<input
							type='checkbox'
							id={id}
							checked={selectedAddOns.includes(label)}
							onChange={() => handleAddOnChange(label)}
							className='h-5 w-5 text-red-500 rounded focus:ring-red-500 bg-black/30 border-white/20'
						/>
						<label
							htmlFor={id}
							className='flex-1 cursor-pointer'>
							<span className='block text-white'>{label}</span>
							<span className='block text-sm text-white/60'>R{price}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default AddOnSelector;
