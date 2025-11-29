'use client';

import React, { useState, useEffect } from 'react';
import { useActionState } from 'react';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { FaMapMarkerAlt, FaSave } from 'react-icons/fa';
import { TbAccessPoint } from 'react-icons/tb';
import Loading from '@/components/ui/Loading';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { updateAddressAction } from '@/lib/actions/profile';

const UserAddressForm: React.FC = () => {
	const { user, loading } = useAuth();
	const [showAddressInput, setShowAddressInput] = useState(false);
	const [state, formAction, isPending] = useActionState(updateAddressAction, null);

	const [addressData, setAddressData] = useState({
		address: '',
		city: '',
		state: '',
		zipCode: '',
		country: '',
	});

	const [errors, setErrors] = useState({
		address: false,
		city: false,
		state: false,
		zipCode: false,
		country: false,
	});

	useEffect(() => {
		if (user) {
			setAddressData({
				address: user.user_metadata?.address || '',
				city: user.user_metadata?.city || '',
				state: user.user_metadata?.state || '',
				zipCode: user.user_metadata?.zipCode || '',
				country: user.user_metadata?.country || '',
			});
		}
	}, [user]);

	// Close form on successful save
	useEffect(() => {
		if (state?.success) {
			setShowAddressInput(false);
		}
	}, [state?.success]);

	const validateFields = () => {
		const newErrors = {
			address: !addressData.address.trim(),
			city: !addressData.city.trim(),
			state: !addressData.state.trim(),
			zipCode: !addressData.zipCode.trim(),
			country: !addressData.country.trim(),
		};
		setErrors(newErrors);
		return !Object.values(newErrors).some(Boolean);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (!validateFields() || !user?.id) {
			e.preventDefault();
			return;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAddressData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: false }));
	};

	if (loading) return <Loading />;
	if (!user) return null;

	const fullAddress = `${user.user_metadata?.address || ''}, ${user.user_metadata?.city || ''}, ${user.user_metadata?.state || ''}, ${user.user_metadata?.zipCode || ''}, ${user.user_metadata?.country || ''}`;

	return (
		<article>
			<h3 className='flex items-center gap-2 text-xl font-bold mb-3'>
				<FaMapMarkerAlt /> Shipping Address
			</h3>

			{user.user_metadata?.address && !showAddressInput ? <p className='text-white'>{fullAddress}</p> : null}

			{showAddressInput ? (
				<div className='mt-4 flex flex-col gap-3'>
					{state?.error && (
						<div className='text-yellow-500 mb-2 bg-yellow-900/20 p-2 rounded-md text-sm'>{state.error}</div>
					)}
					{state?.success && (
						<div className='text-white mb-2 bg-green-900/20 p-2 rounded-md text-sm'>Address saved successfully!</div>
					)}
					<form action={formAction} onSubmit={handleSubmit} className='flex flex-col gap-3'>
						<TextInput
							type='text'
							name='address'
							placeholder='e.g., 123 Main St, Apt 4B'
							label='Street Address'
							value={addressData.address}
							onChange={handleInputChange}
							className={errors.address ? 'border-yellow-500 ring-yellow-500' : ''}
							required
						/>
						{errors.address && <p className='text-white text-sm mt-1'>Street address is required.</p>}

						<TextInput
							type='text'
							name='city'
							placeholder='e.g., Phalaborwa'
							label='City'
							value={addressData.city}
							onChange={handleInputChange}
							className={errors.city ? 'border-yellow-500 ring-yellow-500' : ''}
							required
						/>
						{errors.city && <p className='text-white text-sm mt-1'>City is required.</p>}

						<TextInput
							type='text'
							name='state'
							placeholder='e.g., Limpopo'
							label='State'
							value={addressData.state}
							onChange={handleInputChange}
							className={errors.state ? 'border-yellow-500 ring-yellow-500' : ''}
							required
						/>
						{errors.state && <p className='text-white text-sm mt-1'>State is required.</p>}

						<div className='flex gap-2'>
							<TextInput
								type='text'
								name='zipCode'
								placeholder='e.g., 1390'
								label='Zip Code'
								value={addressData.zipCode}
								onChange={handleInputChange}
								className={`flex-grow ${errors.zipCode ? 'border-yellow-500 ring-yellow-500' : ''}`}
								required
							/>
							<TextInput
								type='text'
								name='country'
								placeholder='e.g., South Africa'
								label='Country'
								value={addressData.country}
								onChange={handleInputChange}
								className={`flex-grow ${errors.country ? 'border-yellow-500 ring-yellow-500' : ''}`}
								required
							/>
						</div>
						{(errors.zipCode || errors.country) && (
							<p className='text-white text-sm mt-1'>
								{errors.zipCode && 'Zip code is required.'}
								{errors.zipCode && errors.country && ' '}
								{errors.country && 'Country is required.'}
							</p>
						)}

						<Button
							type='submit'
							loading={isPending}
							disabled={isPending}
							className='h-10 px-4 py-2 inline-flex items-center justify-center gap-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-200 mt-2'>
							<FaSave /> Save Address
						</Button>
					</form>
				</div>
			) : (
				<button
					onClick={() => setShowAddressInput(true)}
					className='inline-flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200'>
					<TbAccessPoint /> {user.user_metadata?.address ? 'Edit Address' : 'Add Address'}
				</button>
			)}
		</article>
	);
};

export default UserAddressForm;
