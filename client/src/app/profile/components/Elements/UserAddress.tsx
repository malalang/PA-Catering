'use client';

import React, { useState, useEffect } from 'react';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { FaMapMarkerAlt, FaSave } from 'react-icons/fa';
import { TbAccessPoint } from 'react-icons/tb';
import { updateUserDocument } from '@/firebase/users/updateUser';
import Loading from '@/components/ui/Loading';
import Alert from '@/components/ui/Alert';
import { useUser } from '@/context/UserContext';

const UserAddress: React.FC = () => {
	const { user, loading } = useUser();
	const [showAddressInput, setShowAddressInput] = useState(false);

	const [addressData, setAddressData] = useState({
		address: '',
		city: 'Phalaborwa',
		state: 'Limpopo',
		zipCode: '1392',
		country: 'South Africa',
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
				address: user.address || '',
				city: user.city || 'Phalaborwa',
				state: user.state || 'Limpopo',
				zipCode: user.zipCode || '1392',
				country: user.country || 'South Africa',
			});
		}
	}, [user]);

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

	const handleSave = async () => {
		if (!validateFields() || !user?.uid) {
			console.error('Validation failed or user not logged in.');
			return;
		}

		try {
			await updateUserDocument(user.uid, addressData);
			setShowAddressInput(false);
		} catch (error) {
			console.error('Failed to save address:', error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAddressData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: false }));
	};

	if (loading) return <Loading />;
	if (!user) return null;

	const fullAddress = `${user.address}, ${user.city}, ${user.state}, ${user.zipCode}, ${user.country}`;

	return (
		<article>
			<h3 className='flex items-center gap-2 text-xl font-bold mb-3'>
				<FaMapMarkerAlt /> Shipping Address
			</h3>

			{user.address && !showAddressInput ? <p className='text-white'>{fullAddress}</p> : null}

			{showAddressInput ? (
				<div className='mt-4 flex flex-col gap-3'>
					<TextInput
						type='text'
						name='address'
						placeholder='e.g., 123 Main St, Apt 4B'
						label='Street Address'
						value={addressData.address}
						onChange={handleInputChange}
						className={errors.address ? 'border-red-500 ring-red-500' : ''}
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
						className={errors.city ? 'border-red-500 ring-red-500' : ''}
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
						className={errors.state ? 'border-red-500 ring-red-500' : ''}
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
							className={`flex-grow ${errors.zipCode ? 'border-red-500 ring-red-500' : ''}`}
							required
						/>
						<TextInput
							type='text'
							name='country'
							placeholder='e.g., South Africa'
							label='Country'
							value={addressData.country}
							onChange={handleInputChange}
							className={`flex-grow ${errors.country ? 'border-red-500 ring-red-500' : ''}`}
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
						onClick={handleSave}
						className='h-10 px-4 py-2 inline-flex items-center justify-center gap-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-200 mt-2'>
						<FaSave /> Save Address
					</Button>
				</div>
			) : (
				<button
					onClick={() => setShowAddressInput(true)}
					className='inline-flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200'>
					<TbAccessPoint /> {user.address ? 'Edit Address' : 'Add Address'}
				</button>
			)}
		</article>
	);
};

export default UserAddress;
